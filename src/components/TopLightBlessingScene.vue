<template>
  <section class="top-light-blessing">
    <Title color="dark" text="人氣燈王" />

    <div class="top-light-blessing__list">
      <div
        v-for="(item, index) in lightList"
        :key="item.id"
        class="top-light-blessing__card"
      >
        <div class="top-light-blessing__badge-wrapper">
          <img :src="badge" alt="步驟徽章" />
          <div class="top-light-blessing__badge-wrapper-text">
            {{ index + 1 }}
          </div>
        </div>

        <img
          :src="imageMap[item.imageKey]"
          :alt="item.name"
          class="top-light-blessing__image"
        />
        <div class="top-light-blessing__content">
          <div class="top-light-blessing__type">{{ item.type }}</div>
          <p class="top-light-blessing__desc">{{ item.description }}</p>
          <div class="top-light-blessing__date">於{{ item.date }}點燈</div>
        </div>
        <button class="top-light-blessing__btn">
          請祝福我 <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Title from '@/components/common/Title.vue';
import lightImages from '@/data/lightImages';
import badge from '@/assets/image/badge.png';
const imageMap = Object.fromEntries(
  lightImages.map((item) => [item.key, item.image])
);
const lightList = [
  {
    id: 1,
    name: '招財燈',
    type: '信女 張',
    description: '保佑張~收入越來越好，財運亨通，嘿……',
    date: '2025-04-27',
    imageKey: 'lightZhaocai',
  },
  {
    id: 2,
    name: '平安燈',
    type: '信女 張',
    description: '保佑張~平安健康，闔家順遂……',
    date: '2025-04-27',
    imageKey: 'lightPingan',
  },
  {
    id: 3,
    name: '事業燈',
    type: '信女 張',
    description: '保佑張~事業順利，步步高升……',
    date: '2025-04-27',
    imageKey: 'lightShiye',
  },
];
</script>

<style scoped lang="scss">
.top-light-blessing {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    justify-content: center;
  }

  &__card {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    max-width: 390px;
    min-height: 196px;
    border: 1px solid #3c2313;
    background-color: #fbe3df;
    border-radius: 30px;
    padding: 1rem;
    gap: 1.2rem;
    transition: transform 0.3s ease;
    margin: 0 auto;

    &:hover {
      transform: translateY(-4px);
    }
  }

  &__image {
    width: 113px;
    height: 142px;
    object-fit: contain;
    flex-shrink: 0;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    min-width: 0;
    word-wrap: break-word;
    font-size: 16px;
  }

  &__name {
    font-weight: bold;
    margin-bottom: 0.3rem;
  }

  &__type {
    color: #a53b25;
    margin-bottom: 0.3rem;
  }

  &__desc {
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }

  &__date {
  }

  &__btn {
    width: 100%;
    max-width: 180px;
    height: 44px;
    position: absolute;
    bottom: -22px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #5b2d1b;
    color: #ffcc3e;
    font-weight: bold;
    font-size: 14px;
    padding: 0.4rem 1.2rem;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #3e1f13;
    }
  }

  &__badge-wrapper {
    position: absolute;
    top: -12px;
    left: -12px;
    width: 50px;
    height: 50px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &-text {
      position: absolute;
      font-size: 18px;
      font-weight: bold;
      color: #efa576;
      text-shadow: 0 0 2px #000;
      pointer-events: none;
    }
  }

  @media (max-width: 768px) {
    &__card {
      flex-direction: row-reverse;
      align-items: center;
      text-align: left;
    }

    &__info {
      align-items: flex-start;
    }

    &__image {
      width: 90px;
      height: auto;
      margin-bottom: 0;
      margin-left: 1rem;
    }
  }
}
</style>
