<template>
  <section class="lantern-form">
    <h2 class="section-title">點燈購買數量疊加設定</h2>
    <input
      type="number"
      min="0"
      class="lantern-form__input"
      v-model.number="count"
    />
    <button class="button" @click="save">儲存購買數量</button>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { withLoading } from '@/utils/loadingUtils';
import {
  updatePurchaseLanternCount,
  fetchPurchaseLanternCount,
} from '@/services/admin/systemConfigService';

const count = ref(0);

const save = async () => {
  await withLoading(() => updatePurchaseLanternCount({ count: count.value }));
};

onMounted(async () => {
  const res = await fetchPurchaseLanternCount();
  if (res.success) count.value = res.data;
});
</script>

<style scoped lang="scss">
.lantern-form {
  .section-title {
    font-size: 18px;
    margin-bottom: 1rem;
  }

  &__input {
    width: 200px;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }

  .button {
    display: inline-block;
  }
}
</style>
