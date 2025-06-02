<template>
  <Header />
  <section class="god">
    <div class="god__list">
      <div v-for="(god, index) in gods" :key="index" class="god__card">
        <div class="god__content">
          <h2 class="god__title">{{ god.name }}</h2>
          <p class="god__description" v-html="god.description"></p>
          <img :src="god.image" :alt="god.name" class="god__image" />
        </div>
        <div class="god__action">
          <button class="god__action-btn">
            <span class="god__action-btn-text">請神保庇</span>
          </button>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import godYuelao from '@/assets/image/god_yuelao.png';
import godCaishen from '@/assets/image/god_yuelao.png';
import godWenchang from '@/assets/image/god_yuelao.png';
import godZhongkui from '@/assets/image/god_yuelao.png';
import godGuangong from '@/assets/image/god_yuelao.png';

const gods = [
  {
    name: '月老',
    image: godYuelao,
    description: '“緣份到了他人,緣定莫失情緣”<br>（補上說明內容）',
  },
  {
    name: '財神',
    image: godCaishen,
    description: '“招財進寶,生意興隆”<br>（補上說明內容）',
  },
  {
    name: '文昌',
    image: godWenchang,
    description: '“掌管考試文運的聖神”<br>（補上說明內容）',
  },
  {
    name: '鐘馗',
    image: godZhongkui,
    description: '“鎮煞辟邪,掃蕩妖魔”<br>（補上說明內容）',
  },
  {
    name: '關公',
    image: godGuangong,
    description: '“忠義精神,守財辟邪”<br>（補上說明內容）',
  },
];
</script>

<style lang="scss" scoped>
.god {
  background-color: #c2aeaa;
  padding: 2rem 1rem;

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
    max-width: 1000px;
    margin: 0 auto;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    @media (max-width: 768px) {
      align-items: center;
      text-align: center;
    }
  }

  &__content {
    flex: 1;
  }

  &__title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  &__description {
    font-size: 14px;
    line-height: 1.6;
    color: #222;
    margin-bottom: 1rem;
  }

  &__image {
    width: 120px;
    flex-shrink: 0;

    @media (max-width: 768px) {
      width: 100px;
    }
  }

  &__action {
    display: flex;
    justify-content: flex-end;
    width: 100%;

    @media (max-width: 768px) {
      justify-content: center;
    }
  }

  &__action-btn {
    display: flex;
    align-items: center;
    border: none;
    background-color: transparent;
    padding: 0.5rem 1rem;
    position: relative;
    cursor: pointer;
    appearance: none;
    flex-direction: column;

    &::before,
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: #a22d18;
    }

    &::before {
      margin-bottom: 0.3rem;
    }

    &::after {
      margin-top: 0.3rem;
    }

    &-text {
      color: #a22d18;
      font-size: 16px;
      font-weight: bold;
      white-space: nowrap;
    }

    &-icon {
      width: 36px;
      height: auto;
      margin-left: 0.5rem;

      @media (max-width: 768px) {
        width: 30px;
      }
    }
  }
}
</style>
