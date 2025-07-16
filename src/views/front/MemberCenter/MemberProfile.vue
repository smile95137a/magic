<template>
  <div class="member-profile">
    <!-- 會員資料修改 -->
    <h2 class="member-profile__title">會員資料修改</h2>
    <form class="member-profile__form" @submit.prevent="submitProfile">
      <div class="member-profile__grid">
        <div class="member-profile__field">
          <label>暱稱 *</label>
          <input v-model="nickName" v-bind="nickNameProps" />
          <span class="error-text">{{ profileErrors.nickName }}</span>
        </div>
        <div class="member-profile__field">
          <label>LINE ID *</label>
          <input v-model="lineId" v-bind="lineIdProps" />
          <span class="error-text">{{ profileErrors.lineId }}</span>
        </div>
        <div class="member-profile__field">
          <label>收件姓名 *</label>
          <input v-model="addressName" v-bind="addressNameProps" />
          <span class="error-text">{{ profileErrors.addressName }}</span>
        </div>
        <div class="member-profile__field">
          <label>收件手機 *</label>
          <input v-model="phone" v-bind="phoneProps" />
          <span class="error-text">{{ profileErrors.phone }}</span>
        </div>
        <div class="member-profile__field">
          <label>收件地址</label>
          <div class="member-profile__address">
            <select
              v-model="city"
              v-bind="cityProps"
              :class="{
                'member-profile__form-input--error': profileErrors.city,
              }"
            >
              <option
                v-for="option in cityOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
            <select
              class="member-profile__form-input"
              v-model="area"
              v-bind="areaProps"
              :class="{
                'member-profile__form-input--error': profileErrors.area,
              }"
            >
              <option
                v-for="option in areaOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
          <span class="error-text">{{
            profileErrors.city || profileErrors.area
          }}</span>
        </div>
        <div class="member-profile__field">
          <label>詳細地址</label>
          <input v-model="address" v-bind="addressProps" />
          <span class="error-text">{{ profileErrors.address }}</span>
        </div>
      </div>
      <div class="member-profile__actions">
        <button type="submit" class="member-profile__btn">確認修改</button>
      </div>
    </form>

    <hr class="member-profile__divider" />

    <!-- 發票資料 -->
    <h2 class="member-profile__title">發票資料修改</h2>
    <form class="member-profile__form" @submit.prevent="submitInvoice">
      <div class="member-profile__grid">
        <div class="member-profile__field">
          <label>發票類型 *</label>
          <select v-model="invoiceType" v-bind="invoiceTypeProps">
            <option value="">請選擇發票類型</option>
            <option value="donation">捐贈發票</option>
            <option value="mobile">手機載具</option>
            <option value="personal">個人電子發票</option>
            <option value="company">統一編號</option>
          </select>

          <span class="error-text">{{ invoiceErrors.invoiceType }}</span>
        </div>
        <!-- 捐贈發票：愛心碼 -->
        <div class="member-profile__field" v-if="invoiceType === 'donation'">
          <label>愛心碼 *</label>
          <input v-model="donationCode" v-bind="donationCodeProps" />
          <span class="error-text">{{ invoiceErrors.donationCode }}</span>
        </div>

        <!-- 手機載具號碼 -->
        <div class="member-profile__field" v-if="invoiceType === 'mobile'">
          <label>手機載具號碼 *</label>
          <input v-model="mobileCarrier" v-bind="mobileCarrierProps" />
          <span class="error-text">{{ invoiceErrors.mobileCarrier }}</span>
        </div>

        <!-- 統一編號 -->
        <div class="member-profile__field" v-if="invoiceType === 'company'">
          <label>統一編號 *</label>
          <input v-model="taxId" v-bind="taxIdProps" />
          <span class="error-text">{{ invoiceErrors.taxId }}</span>
        </div>

        <div class="member-profile__field">
          <label>接收發票信箱 *</label>
          <input v-model="invoiceEmail" v-bind="invoiceEmailProps" />
          <span class="error-text">{{ invoiceErrors.invoiceEmail }}</span>
        </div>
      </div>
      <div class="member-profile__actions">
        <button type="submit" class="member-profile__btn">確認修改</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { getProfile, modifyUser } from '@/services/UserService';
import {
  getAllCityNames,
  getAreaListByCityName,
  getZipCodeByCityAndAreaName,
} from '@/services/taiwanCitiesService';
import { useDialogStore } from '@/stores/dialogStore';
import { withLoading } from '@/utils/loadingUtils';
import { getErrorMessage } from '@/utils/ErrorUtils';
const dialogStore = useDialogStore();
const cityOptions = ref<any[]>([]);
const areaOptions = ref<any[]>([]);

const profileSchema = yup.object({
  nickName: yup.string().required('暱稱為必填'),
  lineId: yup.string().required('LINE ID 為必填'),
  addressName: yup.string().required('收件姓名為必填'),
  phone: yup.string().required('收件手機為必填'),
  city: yup.string().required('縣市為必填'),
  area: yup.string().required('行政區為必填'),
  address: yup.string(),
});

const invoiceSchema = yup.object({
  invoiceType: yup.string().required('請選擇發票類型'),
  invoiceEmail: yup.string().required('Email 為必填').email('格式不正確'),
  donationCode: yup.string().when('invoiceType', {
    is: 'donation',
    then: (schema) => schema.required('請輸入愛心碼'),
    otherwise: (schema) => schema.optional(),
  }),
  mobileCarrier: yup.string().when('invoiceType', {
    is: 'mobile',
    then: (schema) => schema.required('請輸入手機載具號碼'),
    otherwise: (schema) => schema.optional(),
  }),
  taxId: yup.string().when('invoiceType', {
    is: 'company',
    then: (schema) => schema.required('請輸入統一編號'),
    otherwise: (schema) => schema.optional(),
  }),
});

// --- 會員表單 useForm
const {
  defineField: defineProfileField,
  handleSubmit: handleProfileSubmit,
  errors: profileErrors,
  setFieldValue: setProfileFieldValue,
} = useForm({
  validationSchema: profileSchema,
  initialValues: {
    nickName: '',
    lineId: '',
    addressName: '',
    phone: '',
    city: '',
    area: '',
    address: '',
  },
});

const [nickName, nickNameProps] = defineProfileField('nickName');
const [lineId, lineIdProps] = defineProfileField('lineId');
const [addressName, addressNameProps] = defineProfileField('addressName');
const [phone, phoneProps] = defineProfileField('phone');
const [city, cityProps] = defineProfileField('city');
const [area, areaProps] = defineProfileField('area');
const [address, addressProps] = defineProfileField('address');

// --- 發票表單 useForm
const {
  defineField: defineInvoiceField,
  handleSubmit: handleInvoiceSubmit,
  errors: invoiceErrors,
  setFieldValue: setInvoiceFieldValue,
} = useForm({
  validationSchema: invoiceSchema,
  initialValues: {
    invoiceType: '',
    invoiceEmail: '',
    donationCode: '',
    mobileCarrier: '',
    taxId: '',
  },
});

const [invoiceType, invoiceTypeProps] = defineInvoiceField('invoiceType');
const [invoiceEmail, invoiceEmailProps] = defineInvoiceField('invoiceEmail');
const [donationCode, donationCodeProps] = defineInvoiceField('donationCode');
const [mobileCarrier, mobileCarrierProps] = defineInvoiceField('mobileCarrier');
const [taxId, taxIdProps] = defineInvoiceField('taxId');

// --- 城市切換更新行政區
watch(city, (newCity) => {
  setProfileFieldValue('area', '');
  areaOptions.value = newCity
    ? [
        { value: '', label: '行政區' },
        ...getAreaListByCityName(newCity).map((a) => ({
          value: a.areaName,
          label: a.areaName,
        })),
      ]
    : [{ value: '', label: '行政區' }];
});

// --- 行政區切換（若需處理 ZipCode）
watch(area, (newArea) => {
  if (newArea) {
    const zipCode = getZipCodeByCityAndAreaName(city.value, newArea);
    if (zipCode) {
      // 可加入顯示用 zipCode.value = ...
    }
  }
});

// --- 初始載入會員資料
const initProfile = async () => {
  const res = await getProfile();
  if (res.success && res.data) {
    await setProfileFieldValue('nickName', res.data.nickName || '');
    await setProfileFieldValue('lineId', res.data.lineId || '');
    await setProfileFieldValue('addressName', res.data.addressName || '');
    await setProfileFieldValue('phone', res.data.phone || '');
    await setProfileFieldValue('city', res.data.city || '');
    await nextTick();
    await setProfileFieldValue('area', res.data.area || '');
    await setProfileFieldValue('address', res.data.address || '');

    await setInvoiceFieldValue('invoiceType', res.data.invoiceType || '');
    await setInvoiceFieldValue('invoiceEmail', res.data.invoiceEmail || '');
    await setInvoiceFieldValue('donationCode', res.data.donationCode || '');
    await setInvoiceFieldValue('mobileCarrier', res.data.mobileCarrier || '');
    await setInvoiceFieldValue('taxId', res.data.taxId || '');
  }
};

onMounted(() => {
  cityOptions.value = [
    { value: '', label: '縣市' },
    ...getAllCityNames().map((city) => ({ value: city, label: city })),
  ];
  areaOptions.value = [{ value: '', label: '行政區' }];
  initProfile();
});

// --- 表單送出方法
const submitProfile = handleProfileSubmit(async (values) => {
  const payload = {
    ...values,
  };

  try {
    const { success } = await withLoading(() => modifyUser(payload));
    if (success) {
      await dialogStore.openInfoDialog({
        title: '系統通知',
        message: '會員資料已成功修改！',
      });
    } else {
      await dialogStore.openInfoDialog({
        title: '錯誤',
        message: '會員資料修改失敗，請稍後再試。',
      });
    }
  } catch (error: any) {
    await dialogStore.openInfoDialog({
      title: '系統錯誤',
      message: getErrorMessage(error),
    });
  }
});

const submitInvoice = handleInvoiceSubmit((values) => {
  console.log('發票資料送出:', values);
});
</script>

<style scoped lang="scss">
.member-profile {
  &__title {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 2rem 0 1rem;
  }

  &__form {
    margin-bottom: 2rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  &__field {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      font-weight: 500;
    }

    input,
    select {
      padding: 0.5rem;
      font-size: 0.95rem;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
  }

  &__address {
    display: flex;
    gap: 0.5rem;

    select {
      flex: 1;
    }
  }

  &__btn {
    padding: 0.6rem 1.5rem;
    background-color: #a53b25;
    color: #fff;
    border: none;
    border-radius: 999px;
    font-size: 0.95rem;
    cursor: pointer;

    &:hover {
      background-color: #902e1c;
    }
  }

  &__actions {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-start;
  }

  &__divider {
    margin: 3rem 0;
    border: none;
    height: 1px;
    background-color: #ccc;
  }
}
</style>
發票類型 有這些 捐贈發票（需填寫愛心碼） 手機載具（需填寫手機載具號碼）
個人電子發票（無需額外欄位） 統一編號（需填寫統一編號）
