<script setup lang="ts">
import { useFormContext } from 'vee-validate';
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import { getShippingMethodList } from '@/services/OrderService';
import { openStoreMap } from '@/utils/logisticsUtils';
import { useRoute } from 'vue-router';

const route = useRoute();

const shippingMethodOptions = ref<any[]>([]);
const selectedStore = ref<any>(null);
const { defineField, errors, setValues, values, setFieldValue } =
  useFormContext();
const [shippingMethod] = defineField('shippingMethod');
const [storeId] = defineField('storeId');
const [storeName] = defineField('storeName');
const [storeAddress] = defineField('storeAddress');

// 初始化寄送方式選單
const initOptions = async () => {
  try {
    const [shippingRes] = await Promise.all([getShippingMethodList()]);
    if (shippingRes.success) {
      shippingMethodOptions.value = shippingRes.data.map((s: any) => ({
        id: s.id,
        label: s.name,
        value: s.code,
        fee: s.fee,
      }));
    }
  } catch (error) {
    console.error('初始化選項失敗', error);
  }
};

onMounted(async () => {
  initOptions();

  localStorage.removeItem('selectedStore');

  const savedForm = localStorage.getItem('cartFormTemp');
  if (savedForm) {
    try {
      const parsed = JSON.parse(savedForm);
      setTimeout(async () => {
        setFieldValue('recipient.city', parsed.recipient.city);

        await nextTick();

        setValues(parsed);

        selectedStore.value = {
          id: parsed.storeId,
          name: parsed.storeName,
          address: parsed.storeAddress,
        };
      }, 200);
    } catch (e) {
      console.error('表單資料解析錯誤', e);
    }
  }

  const { storename, storeid, storeaddress } = route.query;
  if (storename && storeid) {
    const store = {
      name: decodeURIComponent(storename as string),
      id: decodeURIComponent(storeid as string),
      address: decodeURIComponent((storeaddress ?? '') as string),
    };
    selectedStore.value = store;
    localStorage.setItem('selectedStore', JSON.stringify(store));

    storeId.value = store.id;
    storeName.value = store.name;
    storeAddress.value = store.address;
  }
});

// 根據寄送方式是否為 7-11 / 全家，顯示「選擇門市」
const isStorePickup = computed(() =>
  ['7_ELEVEN', 'FAMILY', 'OK_MART', 'HI_LIFE'].includes(shippingMethod.value)
);
const handleOpenMap = () => {
  // 儲存目前的表單暫存
  localStorage.setItem('cartFormTemp', JSON.stringify(values));

  // 👉 清除上一次的門市資料，避免重複或干擾
  localStorage.removeItem('selectedStore');

  const callbackUrl = `${window.location.origin}/cart`;

  let opmode = '3'; // 預設為 7-11
  switch (shippingMethod.value) {
    case 'FAMILY':
      opmode = '1';
      break;
    case 'HI_LIFE':
      opmode = '2';
      break;
    case 'OK_MART':
      opmode = '4';
      break;
    case '7_ELEVEN':
    default:
      opmode = '3';
  }

  openStoreMap(opmode, callbackUrl);
};
</script>

<template>
  <h3>寄送資訊</h3>
  <div class="checkout__block">
    <div class="checkout__radio-group">
      <label
        class="checkout__radio-option"
        v-for="option in shippingMethodOptions"
        :key="option.value"
      >
        <input
          type="radio"
          class="checkout__form-radio"
          :value="option.value"
          v-model="shippingMethod"
        />
        {{ option.label }}
        <span v-if="option.fee">（運費 ${{ option.fee }}）</span>
      </label>
    </div>
    <p v-if="errors.shippingMethod" class="checkout__form-error">
      {{ errors.shippingMethod }}
    </p>

    <!-- 門市選擇按鈕 -->
    <div v-if="isStorePickup" class="checkout__store-selector">
      <button class="btn btn-secondary" type="button" @click="handleOpenMap">
        選擇門市
      </button>

      <!-- 顯示已選門市資訊 -->
      <p v-if="selectedStore">
        已選門市：{{ selectedStore.name }} （店號：{{ selectedStore.id }}）
        <br />
        地址：{{ selectedStore.address }}
      </p>
    </div>
  </div>
</template>
