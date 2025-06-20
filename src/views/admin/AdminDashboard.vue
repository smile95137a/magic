<template>
  <div class="admin-dashboard">
    <h1 class="admin-dashboard__title">後台儀表板</h1>
    <p class="admin-dashboard__desc">歡迎使用後台管理系統。</p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.admin-dashboard {
  padding: 24px;
  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  &__desc {
    font-size: 16px;
    color: #666;
  }
}
</style>
