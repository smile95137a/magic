<template>
  <div class="banner-management">
    <h1 class="banner-management__title">Banner 管理</h1>
    <router-link class="banner-management__add" to="/admin/banners/add">➕ 新增 Banner</router-link>
    <ul class="banner-management__list">
      <li
        v-for="(banner, index) in banners"
        :key="index"
        class="banner-management__item"
      >
        <img :src="banner.imageUrl" class="banner-management__image" />
        <div class="banner-management__info">
          <p class="banner-management__title">{{ banner.title }}</p>
          <router-link :to="`/admin/banners/edit/${index}`" class="banner-management__edit">
            編輯
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const banners = ref([
  { title: '範例 Banner 1', imageUrl: 'https://via.placeholder.com/300x100' },
  { title: '範例 Banner 2', imageUrl: 'https://via.placeholder.com/300x100' },
]);
</script>

<style scoped lang="scss">
.banner-management {
  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  &__add {
    display: inline-block;
    margin-bottom: 20px;
    color: #3b82f6;
    text-decoration: none;
  }

  &__list {
    list-style: none;
    padding: 0;
  }

  &__item {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    align-items: center;
  }

  &__image {
    width: 120px;
    height: auto;
    border: 1px solid #ccc;
  }

  &__info {
    flex: 1;
  }

  &__edit {
    color: #10b981;
    text-decoration: none;
  }
}
</style>