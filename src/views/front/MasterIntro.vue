<template>
  <section class="master">
    <SectionBackground variant="divination" />
    <div class="master__container">
      <Title color="dark" text="大師親算" />

      <div class="master__card">
        <div class="master__header">
          <div class="master__header-left">
            <h3 class="master__name">張盛舒</h3>
            <p class="master__subtitle">科技紫微大師</p>
          </div>
          <button class="master__btn" @click="store.nextStep()">
            大師親算 <i class="fas fa-chevron-right"></i>
          </button>
        </div>

        <div class="master__content">
          <div class="master__left">
            <div class="master__desc">
              <p><strong>主星：</strong>太陰</p>
              <p>
                <strong>簡介：</strong
                >強調科技驗證個體宿命，提供個人正確的命運規劃，幫助個人改變自己的命運，進而達成幸福成功。
              </p>
              <p>
                <strong>學經歷：</strong
                >台大數學系畢業，經營資訊公司多年，專精命理研究，在資訊界20年，研究命理40年；由科技與命理整合，開創命理新視野，結合心理學、管理學、命理學，創立科技紫微網。
              </p>
              <p>
                <strong>擅長項目：</strong
                >婚姻情感、姻緣問題、事業發展、流年生涯、學業進修、創業轉職問題、親子問題等，榮獲東森新聞專訪。
              </p>
              <p><strong>經歷：</strong>研究與實務並具40年以上。</p>
            </div>
          </div>

          <div class="master__right">
            <img class="master__image" :src="master" alt="大師照片" />
          </div>
        </div>

        <!-- 擅長項目 -->
        <div class="master__topics">
          <div
            v-for="(item, index) in topics"
            :key="index"
            class="master__topic"
          >
            <div class="master__topic-header">
              <div class="master__topic-title">{{ item.title }}</div>
            </div>
            <div class="master__topic-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionBackground from '@/components/common/SectionBackground.vue';
import Title from '@/components/common/Title.vue';
import master from '@/assets/image/master.png';
import { useMasterOrderStore } from '@/stores/masterOrderStore';
import { onMounted } from 'vue';

const store = useMasterOrderStore();

const topics = [
  { title: '姻緣愛情', desc: '桃花感應、愛情煩惱、合婚、第三者等' },
  { title: '婚姻問題', desc: '婚姻、外遇、離婚等' },
  { title: '事業問題', desc: '求職、轉職、創業、合夥等' },
  { title: '流年生涯', desc: '流年運勢、生涯規劃等' },
  { title: '家庭問題', desc: '婆媳關係、媳媳關係、家庭問題等' },
  { title: '學業進修', desc: '學業、進修、留學' },
  { title: '親子問題', desc: '親子溝通、事業傳承、子女教育' },
];
</script>

<style scoped lang="scss">
.master {
  width: 100%;
  position: relative;
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  &__card {
    background: #fff;
    border-radius: 20px;
    padding: 2rem;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  &__header-left {
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-size: 1.8rem;
    color: #a53b25;
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  &__subtitle {
    color: #b85b5b;
    font-size: 1.05rem;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: #3d1f0f;
    color: #f7c56b;
    border: none;
    border-radius: 999px;
    padding: 0.4rem 1.25rem;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;

    i {
      font-size: 0.95rem;
    }

    &:hover {
      background-color: #2c150a;
    }
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    background: #fdf0ee;
    padding: 2rem;
    border-radius: 12px;
    gap: 2rem;
    margin-bottom: 2.5rem;
    position: relative;
  }

  &__left {
    flex: 1 1 60%;
  }

  &__right {
    flex: 1 1 30%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  &__image {
    width: 296px;
    height: 444px;
    border-radius: 12px;
    object-fit: cover;
    margin-top: -80px;
  }

  &__desc {
    font-size: 0.95rem;
    color: #333;

    p {
      margin-bottom: 0.8rem;
      line-height: 1.6;
    }

    strong {
      color: #a53b25;
    }
  }

  &__topics {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__topic-header {
    position: relative;
    margin-bottom: 0.75rem;

    &::after {
      content: '';
      display: block;
      height: 1px;
      background-color: #a2352c;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }

  &__topic-title {
    background-color: #a2352c;
    color: white;
    font-weight: bold;
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
    display: inline-block;
    position: relative;
    z-index: 1;
    max-width: 392px;
  }

  &__topic-desc {
    text-align: left;
    padding: 1rem;
    font-size: 0.95rem;
    color: #000;
    line-height: 1.6;
    background-color: #fff;
    border-radius: 6px;
  }
}
</style>
