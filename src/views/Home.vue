<template>
  <section class="god-request-success">
    <!-- 擲筊成功 -->
    <div class="god-request-success__result">
      <div class="god-request-success__god-circle">
        <img alt="月老" />
      </div>
      <div class="god-request-success__info">
        <div class="god-request-success__wish">
          信男 王小明<br />
          求月下老人賜福
        </div>
        <div class="god-request-success__success">
          <span>得聖筊 <strong>3</strong> 次</span><br />
          <span class="god-request-success__success-text">請神成功！</span>
        </div>
      </div>
    </div>

    <!-- 供奉神明 -->
    <div class="god-request-success__offering">
      <h2 class="god-request-success__title">供奉神明</h2>
      <p class="god-request-success__desc">
        只添一點香油錢，就能將神明請至你的會員首頁及供奉大廳坐鎮<br />
        為你守護好運，還能抽好運籤請神明開示喔！
      </p>
      <div class="god-request-success__cards">
        <div class="god-request-success__card">
          <div class="god-request-success__days">供奉 <span>7</span> 日</div>
          <div class="god-request-success__price">NT$30</div>
          <button class="god-request-success__btn">我要供奉</button>
        </div>
        <div class="god-request-success__card">
          <div class="god-request-success__days">供奉 <span>30</span> 日</div>
          <div class="god-request-success__price">NT$60</div>
          <button class="god-request-success__btn">我要供奉</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 無互動邏輯，純畫面
</script>

<style scoped lang="scss">
.god-request-success {
  background: #f2e0dc;
  padding: 2rem;

  &__result {
    background: linear-gradient(135deg, #c63f24, #d24628);
    border-radius: 16px;
    padding: 2rem;
    display: flex;
    align-items: center;
    color: white;
    position: relative;
    margin-bottom: 3rem;
  }

  &__god-circle {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: #f46b40;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex-shrink: 0;
    margin-right: 2rem;

    img {
      width: 100px;
      height: auto;
    }
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__wish {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }

  &__success {
    font-size: 1.3rem;
    line-height: 1.8;

    strong {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  &__success-text {
    font-weight: bold;
    font-size: 1.6rem;
  }

  &__offering {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #a53b25;
    margin-bottom: 1rem;
  }

  &__desc {
    font-size: 0.95rem;
    color: #444;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  &__cards {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  &__card {
    width: 160px;
    background: #fffaf7;
    border: 1px solid #e5c1b3;
    border-radius: 12px;
    padding: 1.5rem 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
  }

  &__days {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;

    span {
      font-size: 1.8rem;
      font-weight: bold;
    }
  }

  &__price {
    font-size: 1rem;
    color: #d14427;
    margin-bottom: 1rem;
  }

  &__btn {
    background: #a53b25;
    color: white;
    border: none;
    border-radius: 999px;
    padding: 0.5rem 1.2rem;
    font-size: 0.95rem;
    cursor: pointer;

    &:hover {
      background: #902f1b;
    }
  }
}
</style>
