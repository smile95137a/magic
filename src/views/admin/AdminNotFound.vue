<template>
  <div class="admin-not-found">
    <h1 class="admin-not-found__title">404 - 頁面不存在</h1>
    <p class="admin-not-found__desc">請確認網址是否正確，或返回首頁。</p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.admin-not-found {
  text-align: center;
  margin-top: 100px;
  &__title {
    font-size: 28px;
    color: #b00;
    margin-bottom: 12px;
  }
  &__desc {
    font-size: 16px;
    color: #666;
  }
}
</style>
