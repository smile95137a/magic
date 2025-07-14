<template>
  <div class="invoke-success">
    <!-- 左上 LOGO 與標題 -->
    <header class="invoke-success__header">
      <Title color="white" text="擲杯請神" />
    </header>

    <!-- 主區塊 三欄 -->
    <div class="invoke-success__content">
      <!-- 左欄：祈求者 -->
      <div class="invoke-success__column invoke-success__column--left">
        <p class="invoke-success__text">信男 王小明</p>
        <p class="invoke-success__text">求{{ godName }}賜福</p>
      </div>

      <!-- 中欄：神明圖像 -->
      <div class="invoke-success__column invoke-success__column--center">
        <div class="invoke-success__circle">
          <img :src="godImage" :alt="godName" class="invoke-success__god" />
          <div class="invoke-success__god-name">{{ godName }}</div>
        </div>
      </div>

      <!-- 右欄：結果 -->
      <div class="invoke-success__column invoke-success__column--right">
        <p class="invoke-success__result-count">得聖筊 <span>3</span> 次</p>
        <p class="invoke-success__result-text">請神成功！</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from '@/components/common/Title.vue';

defineProps<{
  godImage: string; // 神明圖片 URL
  godName: string; // 神明名稱（例如：月老）
}>();
</script>

<style scoped lang="scss">
.invoke-success {
  &__header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__content {
    margin-top: 3rem;
    background: linear-gradient(to bottom, #b7381f, #cf4d2f);
    border-radius: 1.25rem;
    padding: 3rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 260px;

    &--left {
      flex: 0 0 33%;
      align-items: flex-start;
    }

    &--center {
      flex: 0 0 34%;
      align-items: center;
      position: relative;
    }

    &--right {
      flex: 0 0 33%;
      align-items: flex-end;
    }
  }

  &__text {
    font-size: 20px;
    line-height: 1.6;
  }

  &__circle {
    background-color: #f55b3a;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  &__god {
    width: 120px;
    margin-bottom: 0.5rem;
  }

  &__god-name {
    font-size: 18px;
    font-weight: bold;
  }

  &__result-count {
    font-size: 20px;
    span {
      font-size: 32px;
      font-weight: bold;
      margin: 0 0.25rem;
    }
  }

  &__result-text {
    font-size: 28px;
    font-weight: bold;
    margin-top: 0.25rem;
  }
}
</style>
