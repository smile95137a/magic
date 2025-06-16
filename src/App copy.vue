<template>
  <div class="light-list">
    <div v-for="(img, name) in lightImages" :key="name" class="light-item">
      <img :src="img.image" :alt="img.name" class="light-item__image" />
      <p class="light-item__label">{{ img.name }}</p>
    </div>
  </div>
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
