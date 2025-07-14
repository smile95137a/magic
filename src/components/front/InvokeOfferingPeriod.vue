<template>
  <header class="invoke-success__header">
    <Title color="red" text="供奉神明" />
  </header>
  <section class="offering-period">
    <p class="offering-period__description">
      只添一點香油錢，就能將神明請至你的會員首頁及供奉大廳坐鎮<br />
      為你守護好運，還能抽好運籤讓請神明開示唷！
    </p>

    <div class="offering-period__cards">
      <div
        class="offering-period__card"
        v-for="option in options"
        :key="option.days"
      >
        <img
          class="offering-period__corner offering-period__corner--tl"
          alt="corner top"
          :src="menuDecoTop"
        />
        <img
          class="offering-period__corner offering-period__corner--br"
          alt="corner bottom"
          :src="menuDecoBottom"
        />

        <div class="offering-period__info">
          <span class="offering-period__label">供奉</span>
          <span class="offering-period__days">{{ option.days }}</span>
          <span class="offering-period__unit">日</span>
        </div>

        <div class="offering-period__price">NT${{ option.price }}</div>

        <button class="offering-period__button" @click="onExtendClick(option)">
          我要供奉 <i class="fa-solid fa-chevron-right arrow"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Title from '@/components/common/Title.vue';
import menuDecoBottom from '@/assets/image/menu-deco-bottom.png';
import menuDecoTop from '@/assets/image/menu-deco-top.png';
import { extendGodPeriod } from '@/services/GodService';
import { useOfferStore } from '@/stores/offerStore';
import { withLoading } from '@/utils/loadingUtils';
import { useRouter } from 'vue-router';

const offerStore = useOfferStore();
const router = useRouter();

const options = [
  { days: 7, price: 30 },
  { days: 30, price: 60 },
];

const onExtendClick = async (option: { days: number; price: number }) => {
  const god = offerStore.selectedGod;
  console.log(god);

  const payload = {
    godCode: god.imageCode,
    day: option.days,
  };

  try {
    const res = await withLoading(() => extendGodPeriod(payload));
    if (res.success) {
      offerStore.setGodInvoked(true);
      offerStore.goToStep(1);
    } else {
      alert(res.message || '供奉失敗，請稍後再試');
    }
  } catch (error) {
    alert('供奉過程發生錯誤，請稍後再試');
  }
};
</script>

<style scoped lang="scss">
.offering-period {
  background-color: #fff;
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  color: #111;
  &__info {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 0.25rem;
    margin-bottom: 1rem;
  }

  &__label {
    font-size: 18px;
    line-height: 1;
    color: #111;
  }

  &__days {
    font-size: 48px;
    font-weight: bold;
    line-height: 1;
    color: #111;
  }

  &__unit {
    font-size: 18px;
    line-height: 1;
    color: #111;
  }
  &__description {
    font-size: 18px;
    line-height: 1.7;
    margin-bottom: 2rem;
    color: #311e1a;
  }

  &__cards {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
  }

  &__card {
    position: relative;
    border: 1px solid #c9a79d;
    border-radius: 12px;
    width: calc(50% - 1rem); // 修改為兩欄佈局
    padding: 2rem 1.5rem;
    text-align: center;
    background: #fff;

    @media (max-width: 768px) {
      width: 100%; // 手機全寬
    }
  }

  &__corner {
    position: absolute;
    width: 32px;
    height: 32px;
    &--tl {
      top: 1rem;
      right: 1rem;
    }
    &--br {
      bottom: 1rem;
      left: 1rem;
    }
  }

  &__info {
    font-size: 20px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    gap: 0.25rem;
    color: #111;
  }

  &__days {
    font-size: 48px;
    font-weight: bold;
  }

  &__price {
    font-size: 16px;
    color: #e4007f;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  &__button {
    background-color: #8b3a1e;
    color: #ffc20e;
    font-weight: bold;
    padding: 0.5rem 1.5rem;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    font-size: 16px;

    .arrow {
      margin-left: 0.5rem;
    }

    &:hover {
      background-color: #a84627;
    }
  }
}
</style>
