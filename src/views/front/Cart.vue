<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useCartStore } from '@/stores/cartStore';
import MCard from '@/components/common/MCard.vue';
import SectionBackground from '@/components/common/SectionBackground.vue';
import NumberFormatter from '@/components/common/NumberFormatter.vue';
import { ref, onMounted } from 'vue';
import {
  getShippingMethodList,
  getInvoiceTypeList,
  getPayMethodList,
  createOrder,
} from '@/services/OrderService';
import { useDialogStore } from '@/stores/dialogStore';
import { getErrorMessage } from '@/utils/ErrorUtils';
import { withLoading } from '@/utils/loadingUtils';
import { getImageUrl } from '@/utils/ImageUtils';
import { useAuthFrontStore } from '@/stores/authFrontStore';
const router = useRouter();

const cart = useCartStore();
const authStore = useAuthFrontStore();
const dialogStore = useDialogStore();
const cartItems = cart.cartItems;

const shippingMethodOptions = ref<any[]>([]);
const invoiceTypeOptions = ref<{ label: string; value: string }[]>([]);
const payMethodOptions = ref<{ label: string; value: string }[]>([]);

const initOptions = async () => {
  try {
    const [shippingRes, invoiceRes, payRes] = await Promise.all([
      getShippingMethodList(),
      getInvoiceTypeList(),
      getPayMethodList(),
    ]);

    if (shippingRes.success) {
      shippingMethodOptions.value = shippingRes.data.map((s: any) => ({
        id: s.id,
        label: s.name,
        value: s.code,
        fee: s.fee,
      }));
    }

    if (invoiceRes.success) {
      invoiceTypeOptions.value = invoiceRes.data.map((i: any) => ({
        label: i.label, // 顯示名稱
        value: i.code, // 送出用 code
      }));
    }

    if (payRes.success) {
      payMethodOptions.value = payRes.data.map((p: any) => ({
        label: p.label, // 顯示名稱
        value: p.code, // 送出用 code
      }));
    }
  } catch (error) {
    console.error('初始化選項失敗', error);
  }
};

onMounted(() => {
  if (!authStore.isLogin) {
    router.replace({ name: 'Login' });
    return;
  }

  if (cartItems.length === 0) {
    router.replace({ name: 'StoreProductList' });
    return;
  }

  initOptions();
});

// ---- 驗證 schema ----
const schema = yup.object({
  recipient: yup.object({
    name: yup.string().required('姓名為必填'),
    email: yup.string().email('Email 格式錯誤').required('Email 為必填'),
    phone: yup.string().required('電話為必填'),
    city: yup.string().required('縣市為必填'),
    area: yup.string().required('行政區為必填'),
    address: yup.string().required('地址為必填'),
  }),
  shippingMethod: yup.string().required('請選擇寄送方式'),
  invoiceType: yup.string().required('請選擇發票格式'),
  payment: yup.string().required('請選擇付款方式'),

  invoiceTarget: yup
    .string()
    .when('invoiceType', (invoiceType: any, schema) => {
      return invoiceType === 'company'
        ? schema.required('請填寫統一編號')
        : schema.optional().nullable();
    }),

  carrierId: yup.string().when('invoiceType', (invoiceType: any, schema) => {
    return ['mobile', 'citizen'].includes(invoiceType ?? '')
      ? schema.required('請輸入載具內容')
      : schema.optional().nullable();
  }),

  npoban: yup.string().when('invoiceType', (invoiceType: any, schema) => {
    return invoiceType === 'donate'
      ? schema.required('請填寫愛心碼')
      : schema.optional().nullable();
  }),
});

// ---- useForm 統一表單 ----
const { handleSubmit, defineField, errors, values, setFieldValue, setValues } =
  useForm({
    validationSchema: schema,
    initialValues: {
      recipient: {
        name: '林小華',
        email: 'receiver@example.com',
        phone: '0987654321',
        city: '新北市',
        area: '板橋區',
        address: '文化路二段88號',
      },
      shippingMethod: '',
      invoiceType: '',
      invoiceTarget: '',
      carrierType: '9',
      carrierId: '',
      npoban: '',
      payment: '',
    },
  });

// ---- 拆解欄位綁定（v-model） ----
const [recipientName] = defineField('recipient.name');
const [recipientEmail] = defineField('recipient.email');
const [recipientPhone] = defineField('recipient.phone');
const [recipientCity] = defineField('recipient.city');
const [recipientArea] = defineField('recipient.area');
const [recipientAddress] = defineField('recipient.address');

const [shippingMethod] = defineField('shippingMethod');
const [invoiceType] = defineField('invoiceType');
const [payment] = defineField('payment');
const [invoiceTarget] = defineField('invoiceTarget');
const [carrierId] = defineField('carrierId');
const [npoban] = defineField('npoban');

// ---- 價格計算 ----
const productTotal = computed(() =>
  cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

const shippingFee = computed(() => {
  const selected: any = shippingMethodOptions.value.find(
    (opt) => opt.value === shippingMethod.value
  );
  return selected ? selected.fee ?? 0 : 0;
});

const total = computed(() => productTotal.value + shippingFee.value);

const submitOrder = handleSubmit(async (formData) => {
  const selectedShipping = shippingMethodOptions.value.find(
    (opt) => opt.value === formData.shippingMethod
  );
  const payload = {
    items: cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
    shippingMethodId: selectedShipping.id,
    payMethod: formData.payment,
    invoiceType: formData.invoiceType,
    invoiceTarget: formData.invoiceTarget || '',
    carrierType:
      {
        mobile: '1',
        citizen: '2',
        member: '3',
        donate: '9',
        personal: '9',
        company: '9',
      }[formData.invoiceType] ?? '9',
    carrierId: formData.carrierId || '',
    npoban: formData.npoban || '',
    remark: '',

    ...{
      homeDeliveryRecipient: {
        name: formData.recipient.name,
        phone: formData.recipient.phone,
        address: `${formData.recipient.city}${formData.recipient.area}${formData.recipient.address}`,
      },
    },

    ...(['FAMILY', 'HI_LIFE', '7_ELEVEN', 'OK_MART', 'FAMILY_COLD'].includes(
      formData.shippingMethod
    ) && {
      storePickupRecipient: {
        storeId: '',
        storeName: '',
        storeAddress: '',
        recipientName: formData.recipient.name,
        phone: formData.recipient.phone,
      },
    }),
  };

  try {
    const response = await withLoading(() => createOrder(payload));

    if (response.success) {
      const orderId = response.data.orderId;
      cart.clearCart();
      router.push({ name: 'CheckoutSuccess', params: { id: orderId } });
    } else {
      await dialogStore.openInfoDialog({
        title: '錯誤',
        message: response.message || '密碼重置失敗，請稍後再試。',
      });
    }
  } catch (error) {
    await dialogStore.openInfoDialog({
      title: '錯誤',
      message: getErrorMessage(error),
    });
  }
});

watch(
  () => values.invoiceType,
  (newType) => {
    switch (newType) {
      case 'company':
        setFieldValue('carrierId', '');
        setFieldValue('npoban', '');
        break;
      case 'mobile':
      case 'citizen':
        setFieldValue('invoiceTarget', '');
        setFieldValue('npoban', '');
        break;
      case 'donate':
        setFieldValue('invoiceTarget', '');
        setFieldValue('carrierId', '');
        break;
      default:
        setFieldValue('invoiceTarget', '');
        setFieldValue('carrierId', '');
        setFieldValue('npoban', '');
    }
  }
);

const handleDecrease = (index: number) => {
  const item = cartItems[index];
  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart.removeItem(index);
  }
};
</script>
<template>
  <form @submit.prevent="submitOrder">
    <div class="checkout">
      <SectionBackground variant="divination" />
      <div class="checkout__container">
        <MCard customClass="p-48">
          <h3>商品資訊</h3>
          <div
            v-for="(item, index) in cartItems"
            :key="index"
            class="checkout__item"
          >
            <div class="checkout__item-img">
              <img :src="getImageUrl(item.imageUrl)" :alt="item.name" />
            </div>

            <div class="checkout__item-info">
              <p>{{ item.name }}</p>
              <div class="checkout__item-control">
                <button @click="handleDecrease(index)">
                  <i class="fas fa-minus"></i>
                </button>
                <span>{{ item.quantity }}</span>
                <button @click="item.quantity += 1">
                  <i class="fas fa-plus"></i>
                </button>
                <p class="price">
                  NT$
                  <NumberFormatter :number="~~item.price * ~~item.quantity" />
                </p>
              </div>
            </div>
          </div>

          <h3>收件人資訊</h3>
          <div class="checkout__block">
            <div class="checkout__form-grid">
              <div class="checkout__form-group">
                <label>姓名</label>
                <input v-model="recipientName" />
                <p v-if="errors['recipient.name']">
                  {{ errors['recipient.name'] }}
                </p>
              </div>
              <div class="checkout__form-group">
                <label>Email</label>
                <input v-model="recipientEmail" />
                <p v-if="errors['recipient.email']">
                  {{ errors['recipient.email'] }}
                </p>
              </div>
              <div class="checkout__form-group">
                <label>電話</label>
                <input v-model="recipientPhone" />
                <p v-if="errors['recipient.phone']">
                  {{ errors['recipient.phone'] }}
                </p>
              </div>
              <div class="checkout__form-group">
                <label>縣市</label>
                <select v-model="recipientCity">
                  <option value="台北市">台北市</option>
                  <option value="新北市">新北市</option>
                </select>
                <p v-if="errors['recipient.city']">
                  {{ errors['recipient.city'] }}
                </p>
              </div>
              <div class="checkout__form-group">
                <label>行政區</label>
                <select v-model="recipientArea">
                  <option value="中正區">中正區</option>
                  <option value="大安區">大安區</option>
                  <option value="板橋區">板橋區</option>
                </select>
                <p v-if="errors['recipient.area']">
                  {{ errors['recipient.area'] }}
                </p>
              </div>
              <div class="checkout__form-group checkout__form-group--full">
                <label>詳細地址</label>
                <input v-model="recipientAddress" />
                <p v-if="errors['recipient.address']">
                  {{ errors['recipient.address'] }}
                </p>
              </div>
            </div>
          </div>

          <h3>寄送資訊</h3>
          <div class="checkout__block">
            <div v-for="option in shippingMethodOptions" :key="option.value">
              <label>
                <input
                  type="radio"
                  :value="option.value"
                  v-model="shippingMethod"
                />
                {{ option.label }}
              </label>
            </div>
            <p v-if="errors.shippingMethod">{{ errors.shippingMethod }}</p>
          </div>

          <h3>發票</h3>
          <select v-model="invoiceType">
            <option value=""></option>
            <option
              v-for="option in invoiceTypeOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
          <p v-if="errors.invoiceType">{{ errors.invoiceType }}</p>
          <!-- 統一編號 -->
          <div v-if="invoiceType === 'company'" class="checkout__form-group">
            <label>統一編號</label>
            <input v-model="invoiceTarget" />
            <p v-if="errors.invoiceTarget">{{ errors.invoiceTarget }}</p>
          </div>

          <!-- 手機條碼 / 自然人憑證 -->
          <div v-if="invoiceType === 'mobile'" class="checkout__form-group">
            <label>載具內容</label>
            <input v-model="carrierId" />
            <p v-if="errors.carrierId">{{ errors.carrierId }}</p>
          </div>

          <!-- 愛心碼 -->
          <div v-if="invoiceType === 'donation'" class="checkout__form-group">
            <label>愛心碼</label>
            <input v-model="npoban" />
            <p v-if="errors.npoban">{{ errors.npoban }}</p>
          </div>
          <h3>優惠及結帳</h3>
          <div class="checkout__block">
            <div v-for="option in payMethodOptions" :key="option.value">
              <label>
                <input type="radio" :value="option.value" v-model="payment" />
                {{ option.label }}
              </label>
            </div>
            <p v-if="errors.payment">{{ errors.payment }}</p>
          </div>

          <div class="checkout__total">
            <p>商品：NT$ <NumberFormatter :number="productTotal ?? 0" /></p>
            <p>
              運費：NT$

              <NumberFormatter :number="shippingFee ?? 0" />
            </p>
            <p class="total">
              總金額：<strong
                >NT$

                <NumberFormatter :number="total ?? 0" />
              </strong>
            </p>
          </div>

          <div class="checkout__buttons">
            <button class="btn btn-outline" @click="$router.back()">
              回上頁
            </button>
            <button class="btn btn-primary" type="submit">結帳</button>
          </div>
        </MCard>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
.checkout {
  width: 100%;
  position: relative;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  &__block {
    background: #fde3de;
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 2rem;
  }

  &__item {
    display: flex;
    align-items: center;
    background: #fde3de;
    border-radius: 16px;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }

  &__item-img {
    width: 100px;
    height: 100px;
    background: #ccc;
    border-radius: 12px;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover; // ✅ 保持比例填滿容器
      border-radius: 12px;
      display: block;
    }
  }

  &__item-info {
    margin-left: 1rem;
    flex: 1;

    p {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
  }

  &__item-control {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    button {
      border: none;
      background: none;
      font-size: 1.5rem;
      color: #a93e26;
      cursor: pointer;
    }

    span {
      font-size: 1.1rem;
      min-width: 1.5rem;
      text-align: center;
    }

    .price {
      margin-left: auto;
      font-weight: bold;
      font-size: 1.25rem;
      color: #f14a0e;
    }
  }

  &__form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.25rem 2rem;
    margin-top: 1rem;
  }

  &__form-group {
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    input,
    select {
      width: 100%;
      padding: 0.5rem;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 1rem;
    }
  }

  &__form-group--full {
    grid-column: 1 / -1;
  }

  &__total {
    text-align: right;
    font-size: 1rem;
    line-height: 1.8;

    p {
      margin: 0.2rem 0;
    }

    .total {
      font-size: 1.4rem;
      font-weight: bold;
      color: #d22;
      margin-top: 0.75rem;
    }
  }

  &__buttons {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;

    .btn {
      padding: 0.75rem 2.5rem;
      font-size: 1rem;
      border-radius: 999px;
      cursor: pointer;
      transition: 0.2s ease;
    }

    .btn-outline {
      border: 1.5px solid #a93e26;
      background: #fff;
      color: #a93e26;

      &:hover {
        background: #fbe9e7;
      }
    }

    .btn-primary {
      background: #f14a0e;
      color: #fff;
      border: none;

      &:hover {
        background: #d33a00;
      }
    }
  }

  @media (max-width: 600px) {
    &__form-grid {
      grid-template-columns: 1fr !important;
    }

    &__form-group--full {
      grid-column: 1 / 2 !important;
    }

    &__buttons {
      flex-direction: column;
      align-items: center;

      .btn {
        width: 100%;
        max-width: 300px;
      }
    }

    &__item {
      flex-direction: column;
      align-items: flex-start;
    }

    &__item-img {
      margin-bottom: 1rem;
    }
  }
}
</style>
