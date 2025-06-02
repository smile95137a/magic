<template>
  <section class="service">
    <div class="service__wrapper">
      <!-- 求籤問事區塊 -->
      <div class="service__block">
        <h2 class="service__title">
          <img alt="裝飾" class="service__wave" />
          求籤問事
        </h2>
        <p class="service__desc">
          當您面臨人生抉擇、事業困境、情感糾葛或靈平靜時，古老的智慧可為您指明方向。
          線上求籤猶如與冥冥中的力量對話，透過千年傳承的靈驗籤詩，為您揭示吉凶徵兆。
          每支籤文皆蘊含深遠智慧，為您的課題提供靈解答案。無論何時何地，只要您懷著真誠的心，虔心求問，便能獲得上天的啟示，找到生命中的答案。
        </p>
        <img alt="求籤圖示" class="service__main-img" />
        <RouterLink
          to="/divination"
          class="service__button service__button--red"
          >前往求籤問事</RouterLink
        >
      </div>

      <!-- 請神供奉區塊 -->
      <div class="service__block">
        <h2 class="service__title">
          <img alt="裝飾" class="service__wave" />
          請神供奉
        </h2>
        <p class="service__desc">
          虛心供奉，神明庇佑。線上請神供奉系統讓您足不出戶即能表達敬意與祈願。
          選擇心儀神明如月老助姻緣、財神添財富、文昌增智慧、鐘馗除邪業、關公保平安；
          每日可免費供燈上香，表達誠心。搭配獨家祈福力量，另有金香、金果、金牌等強化供品可選，滿足不同祈願需求。
          無論您身在何處，只要一顆虔誠之心，便能與神明心靈相通，獲得無形護佑與祝福。
        </p>
        <div class="service__gods">
          <div v-for="god in gods" :key="god.name" class="service__god">
            <img :src="god.img" :alt="god.name" />
            <div class="service__god-name">{{ god.name }}</div>
          </div>
        </div>
        <RouterLink to="/worship" class="service__button service__button--gold"
          >前往請神供奉</RouterLink
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const gods = [
  { name: '月老', img: '@/assets/god_yuelao.png' },
  { name: '財神', img: '@/assets/god_caishen.png' },
  { name: '文昌', img: '@/assets/god_wenchang.png' },
  { name: '鐘馗', img: '@/assets/god_zhongkui.png' },
  { name: '關公', img: '@/assets/god_guangong.png' },
];
</script>

<style scoped lang="scss">
.service {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
    gap: 3rem;
  }

  &__block {
    flex: 0 0 48%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media (max-width: 768px) {
      flex: 0 0 100%;
    }
  }

  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__wave {
    width: 60px;
    height: auto;
  }

  &__desc {
    font-size: 15px;
    line-height: 1.8;
    padding: 0 1rem;
    margin-bottom: 1.5rem;
    max-width: 500px;
  }

  &__main-img {
    width: 200px;
    margin-bottom: 1.5rem;
  }

  &__gods {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1.2rem;
    margin-bottom: 1.5rem;
  }

  &__god {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 60px;
      height: auto;
    }

    &-name {
      margin-top: 0.25rem;
      font-size: 13px;
    }
  }

  &__button {
    padding: 0.6rem 1.5rem;
    border-radius: 30px;
    font-weight: bold;
    font-size: 15px;
    text-decoration: none;
    display: inline-block;
    transition: 0.3s;

    &--red {
      background-color: #ffccbc;
      color: #a9280f;

      &:hover {
        background-color: #ffd6c9;
      }
    }

    &--gold {
      background-color: #f9e29d;
      color: #a97700;

      &:hover {
        background-color: #ffeebd;
      }
    }
  }
}
</style>
