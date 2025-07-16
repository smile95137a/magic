<template>
  <div class="lantern-setting">
    <MCard>
      <form class="lantern-setting__form" @submit.prevent="onSubmit">
        <h2 class="lantern-setting__title">推薦點燈設定</h2>

        <div class="lantern-setting__section">
          <label class="lantern-setting__label">推薦燈品（可複選）</label>
          <select
            multiple
            v-model="form.promotionLanterns"
            class="lantern-setting__select"
          >
            <option
              v-for="option in availableLanterns"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="lantern-setting__section">
          <label class="lantern-setting__label">購買數字疊加</label>
          <input
            type="number"
            v-model.number="form.count"
            class="lantern-setting__input"
            min="0"
          />
        </div>

        <div class="lantern-setting__actions">
          <button type="submit" class="lantern-setting__btn">儲存設定</button>
        </div>
      </form>
    </MCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { withLoading } from '@/utils/loadingUtils';
import {
  fetchPromotionLanternList,
  fetchPurchaseLanternCount,
  updatePromotionLanternList,
  updatePurchaseLanternCount,
} from '@/services/admin/systemConfigService';

const availableLanterns = ref<{ label: string; value: string }[]>([
  { label: '平安燈', value: 'peace' },
  { label: '光明燈', value: 'light' },
  { label: '財神燈', value: 'wealth' },
  { label: '文昌燈', value: 'wisdom' },
  { label: '姻緣燈', value: 'love' },
]);

const form = ref({
  promotionLanterns: [] as string[],
  count: 0,
});

const loadConfig = async () => {
  try {
    const [promotionRes, countRes] = await Promise.all([
      fetchPromotionLanternList(),
      fetchPurchaseLanternCount(),
    ]);
    if (promotionRes.success) {
      form.value.promotionLanterns = promotionRes.data;
    }
    if (countRes.success) {
      form.value.count = countRes.data;
    }
  } catch (err) {}
};

const onSubmit = withLoading(async () => {
  try {
    const [res1, res2] = await Promise.all([
      updatePromotionLanternList(form.value.promotionLanterns),
      updatePurchaseLanternCount({ count: form.value.count }),
    ]);
    if (res1.success && res2.success) {
    } else {
    }
  } catch (err) {}
});

onMounted(loadConfig);
</script>

<style scoped lang="scss">
.lantern-setting {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  &__section {
    display: flex;
    flex-direction: column;
  }

  &__label {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  &__select {
    height: 120px;
    padding: 0.5rem;
    font-size: 16px;
  }

  &__input {
    padding: 0.5rem;
    font-size: 16px;
    width: 200px;
  }

  &__actions {
    margin-top: 1rem;
  }

  &__btn {
    padding: 0.75rem 1.5rem;
    font-size: 16px;
    background-color: #eb6c4d;
    color: white;
    border: none;
    border-radius: 4px;
  }
}
</style>
