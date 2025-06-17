<template>
  <router-view></router-view>

  <div class="layout__body">
    <div class="layout__main">
      <!-- 提交按鈕 -->
      <button @click="onSubmit">顯示系統通知</button>
    </div>
  </div>

  <!-- Loading 與 Dialog -->
  <LoadingMask v-if="loadingStore.isLoading" />
  <PoeDivinationDialog v-if="dialogStore.isPoeDivinationDialogOpen" />
</template>

<script setup lang="ts">
import PoeDivinationDialog from '@/components/common/PoeDivinationDialog.vue';
import LoadingMask from '@/components/common/LoadingMask.vue';
import { useDialogStore, useLoadingStore } from './stores';

const loadingStore = useLoadingStore();
const dialogStore = useDialogStore();

const onSubmit = async () => {
  const result = await dialogStore.openPoeDivinationDialog({
    title: '系統通知',
    message: '更新成功',
  });

  console.log('擲筊結果：', result); // ✅ 印出結果（陣列形式）
};
</script>

<style scoped>
.layout__body {
  display: flex;
}
.layout__main {
  flex: 1;
}
</style>
