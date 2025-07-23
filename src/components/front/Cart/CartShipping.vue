<script setup lang="ts">
import { useFormContext } from 'vee-validate';
import { ref, onMounted } from 'vue';
import { getShippingMethodList } from '@/services/OrderService';

const shippingMethodOptions = ref<any[]>([]);

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

onMounted(() => {
  initOptions();
});

const { defineField, errors } = useFormContext();
const [shippingMethod] = defineField('shippingMethod');
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
  </div>
</template>
