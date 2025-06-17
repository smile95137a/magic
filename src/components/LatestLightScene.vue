<template>
  <section class="light-scene">
    <SectionBackground variant="red" />
    <div class="light-scene__container">
      <Title color="white" text="最新燈場" />

      <div class="light-scene__list">
        <div class="light-scene__card" v-for="item in lightList" :key="item.id">
          <img
            :src="imageMap[item.imageKey]"
            alt="light image"
            class="light-scene__image"
          />

          <div class="light-scene__info">
            <div class="light-scene__type">{{ item.type }}</div>
            <p class="light-scene__desc">{{ item.description }}</p>
            <div class="light-scene__date">於{{ item.date }}點燈</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Title from '@/components/common/Title.vue';
import lightImages from '@/data/lightImages';
import SectionBackground from '@/components/common/SectionBackground.vue';
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
    name: '求子燈',
    type: '信女 張',
    description: '保佑張~早生貴子，家庭幸福……',
    date: '2025-04-27',
    imageKey: 'lightQiuzi',
  },
];
</script>

<style scoped lang="scss">
.light-scene {
  width: 100%;
  position: relative;
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    justify-content: center;
  }

  &__card {
    display: flex;
    flex-direction: row;
    align-items: center; // 🔸左右欄垂直置中
    width: 100%;
    max-width: 390px;
    min-height: 196px;
    border: 1px solid #eeafa2;
    border-radius: 30px;
    padding: 1rem;
    color: #fff;
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
    color: #ffbf45;
    margin-bottom: 0.3rem;
  }

  &__desc {
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }

  &__date {
    color: #ffb0a0;
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
