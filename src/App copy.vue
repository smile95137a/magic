<template>
  <div class="light-list">
    <div v-for="(img, name) in lightImages" :key="name" class="light-item">
      <img :src="img.image" :alt="img.name" class="light-item__image" />
      <p class="light-item__label">{{ img.name }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDialogStore } from '@/stores/dialogStore';

const dialogStore = useDialogStore();

const showDialog = async () => {
  const confirmed = await dialogStore.openConfirmDialog({
    title: '刪除確認',
    message: '確定要刪除這筆資料嗎？',
    confirmText: '是的，刪除',
    cancelText: '先不要',
  });
  await dialogStore.openInfoDialog({
    title: '提示',
    message: '這是一個測試用的訊息！',
    customClass: 'my-custom-class',
  });
  console.log('使用者點了確定');
};
</script>

<template>
  <button @click="showDialog">開啟提示 Dialog</button>
</template>

<script setup>
import lightImages from '@/data/lightImages';
</script>

<style scoped>
.light-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.light-item {
  text-align: center;
  width: 100px;
}
.light-item__image {
  width: 100%;
  height: auto;
}
.light-item__label {
  margin-top: 8px;
  font-size: 14px;
}
</style>
