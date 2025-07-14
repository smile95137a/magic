<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import MCard from '@/components/common/MCard.vue';
import SectionBackground from '@/components/common/SectionBackground.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cart = useCartStore();
const cartItems = cart.cartItems;

const shippingMethod = ref('宅配');
const invoiceType = ref('二聯式');
const selectedCoupon = ref('50');
const payment = ref('card');
const sameAsBuyer = ref(false);

const buyer = ref({
  name: '王大明',
  email: 'demo@example.com',
  phone: '0912345678',
  city: '台北市',
  area: '中正區',
  address: '重慶南路一段1號',
});

const recipient = ref({
  name: '林小華',
  email: 'receiver@example.com',
  phone: '0987654321',
  city: '新北市',
  area: '板橋區',
  address: '文化路二段88號',
});

const buyerFields = [
  { label: '姓名', model: 'name' },
  { label: 'Email', model: 'email' },
  { label: '電話', model: 'phone' },
  {
    label: '縣市',
    model: 'city',
    type: 'select',
    options: ['台北市', '新北市'],
  },
  {
    label: '行政區',
    model: 'area',
    type: 'select',
    options: ['中正區', '大安區', '板橋區'],
  },
  { label: '詳細地址', model: 'address', fullWidth: true },
];

const recipientFields = [...buyerFields];

const copyBuyer = () => {
  if (sameAsBuyer.value) {
    recipient.value = { ...buyer.value };
  }
};

const productTotal = computed(() =>
  cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

const shippingFee = computed(() => {
  if (shippingMethod.value === '宅配') return 150;
  if (['7-11', '全家'].includes(shippingMethod.value)) return 60;
  return 0;
});

const discount = computed(() => (selectedCoupon.value === '50' ? 50 : 0));

const total = computed(
  () => productTotal.value + shippingFee.value - discount.value
);

const changeQty = (index: number, delta: number) => {
  const item = cartItems[index];
  if (item.quantity + delta >= 1) {
    item.quantity += delta;
  }
};

const submitOrder = () => {
  const payload = {
    items: cartItems,
    buyer: { ...buyer.value },
    recipient: { ...recipient.value },
    shippingMethod: shippingMethod.value,
    invoiceType: invoiceType.value,
    selectedCoupon: selectedCoupon.value,
    payment: payment.value,
    productTotal: productTotal.value,
    shippingFee: shippingFee.value,
    discount: discount.value,
    total: total.value,
  };

  console.log('🧾 訂單送出資料:', JSON.stringify(payload, null, 2));
  router.push({ name: 'CheckoutSuccess' });
};
</script>

<template>
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
          <div class="checkout__item-img" />
          <div class="checkout__item-info">
            <p>{{ item.name }}</p>
            <div class="checkout__item-control">
              <button @click="changeQty(index, -1)">−</button>
              <span>{{ item.quantity }}</span>
              <button @click="changeQty(index, 1)">＋</button>
              <p class="price">NT${{ item.price * item.quantity }}</p>
            </div>
          </div>
        </div>

        <h3>購買人資訊</h3>
        <div class="checkout__block">
          <div class="checkout__form-grid">
            <div
              class="checkout__form-group"
              v-for="field in buyerFields"
              :key="field.label"
              :class="{ 'checkout__form-group--full': field.fullWidth }"
            >
              <label>{{ field.label }}</label>
              <component
                :is="field.type === 'select' ? 'select' : 'input'"
                v-model="buyer[field.model]"
              >
                <option
                  v-for="option in field.options || []"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </component>
            </div>
          </div>
        </div>

        <h3>收件人資訊</h3>
        <div class="checkout__block">
          <label>
            <input type="checkbox" v-model="sameAsBuyer" @change="copyBuyer" />
            同購買人資料
          </label>
          <div class="checkout__form-grid">
            <div
              class="checkout__form-group"
              v-for="field in recipientFields"
              :key="field.label"
              :class="{ 'checkout__form-group--full': field.fullWidth }"
            >
              <label>{{ field.label }}</label>
              <component
                :is="field.type === 'select' ? 'select' : 'input'"
                v-model="recipient[field.model]"
              >
                <option
                  v-for="option in field.options || []"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </component>
            </div>
          </div>
        </div>

        <h3>寄送資訊</h3>
        <div class="checkout__block">
          <label
            ><input type="radio" value="宅配" v-model="shippingMethod" />
            宅配（$150）</label
          >
          <label
            ><input type="radio" value="7-11" v-model="shippingMethod" /> 7-11
            超商取貨（$60）</label
          >
          <label
            ><input type="radio" value="全家" v-model="shippingMethod" />
            全家超商取貨（$60）</label
          >
        </div>

        <h3>發票</h3>
        <select v-model="invoiceType">
          <option value="二聯式">發票開立（二聯式）</option>
          <option value="三聯式">發票開立（三聯式）</option>
        </select>

        <h3>優惠及結帳</h3>
        <div class="checkout__block">
          <label>
            使用優惠：
            <select v-model="selectedCoupon">
              <option value="50">滿499折50</option>
              <option value="0">不使用</option>
            </select>
          </label>

          <label
            ><input type="radio" value="card" v-model="payment" />
            信用卡一次付清</label
          >
          <label
            ><input type="radio" value="store" v-model="payment" />
            超商取貨付款</label
          >
        </div>

        <div class="checkout__total">
          <p>商品：NT${{ productTotal }}</p>
          <p>運費：NT${{ shippingFee }}</p>
          <p>折扣：-NT${{ discount }}</p>
          <p class="total">
            總金額：<strong>NT${{ total }}</strong>
          </p>
        </div>

        <div class="checkout__buttons">
          <button class="btn btn-outline" @click="$router.back()">
            回上頁
          </button>
          <button class="btn btn-primary" @click="submitOrder">結帳</button>
        </div>
      </MCard>
    </div>
  </div>
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
