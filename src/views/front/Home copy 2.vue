<template>
  <SectionBackground variant="divination">
    <div class="invoke">
      <SectionBackground variant="red">
        <section class="invoke__container">
          <div class="invoke__left">
            <p class="invoke__desc">請按「擲筊」，擲到 3 個聖筊即請神成功！</p>

            <!-- 結果 + 按鈕 同一橫列 -->
            <div class="invoke__row-group" v-if="currentResult">
              <div class="invoke__result">
                <p class="invoke__result-status">{{ currentResult }}！</p>
                <img
                  :src="getCupImage(currentResult)"
                  alt="bwa"
                  class="invoke__result-img"
                />
              </div>

              <StartButton
                class="invoke__button invoke__button--inline"
                styleType="yellow"
                :label="isThrowing ? '擲筊中...' : '擲筊'"
                :disabled="isThrowing"
                @click="throwBwa"
              />
            </div>

            <!-- 第一次還沒擲的按鈕 -->
            <StartButton
              v-else
              class="invoke__button"
              styleType="yellow"
              :label="isThrowing ? '擲筊中...' : '擲筊'"
              :disabled="isThrowing"
              @click="throwBwa"
            />

            <!-- 統計資訊 -->
          </div>

          <!-- 月老插圖 -->
          <div class="invoke__right">
            <img
              :src="godBg"
              alt="背景插圖"
              class="invoke__right-img invoke__right-img--bg"
            />
            <img
              :src="godYuelao"
              alt="月老插圖"
              class="invoke__right-img invoke__right-img--god"
            />
          </div>
        </section>
      </SectionBackground>
      <div class="invoke__stats">
        <div class="invoke__stat-card">
          <p class="invoke__stat-title">擲筊次數：</p>
          <p class="invoke__stat-value">{{ totalTries }}</p>
        </div>
        <div class="invoke__stat-card">
          <p class="invoke__stat-title">擲中聖筊次數：</p>
          <div class="invoke__stat-icon">
            <img :src="shengIcon" alt="聖筊 icon" />
          </div>
          <p class="invoke__stat-value invoke__stat-value--red">
            {{ shengCount }}
          </p>
        </div>
      </div>
    </div>
  </SectionBackground>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import bwaYin from '@/assets/image/bwa-yin.png';
import bwaXiao from '@/assets/image/bwa-xiao.png';
import bwaSheng from '@/assets/image/bwa-sheng.png';
import shengIcon from '@/assets/image/bwa-sheng.png';
import godYuelao from '@/assets/image/god_yuelao.png';
import godBg from '@/assets/image/god-bg-r.png';
import SectionBackground from '@/components/common/SectionBackground.vue';
import StartButton from '@/components/front/StartButton.vue';

const currentResult = ref('');
const totalTries = ref(0);
const shengCount = ref(0);
const isThrowing = ref(false);

const throwBwa = () => {
  if (isThrowing.value) return;

  isThrowing.value = true;
  setTimeout(() => {
    const result = getRandomResult();
    currentResult.value = result;
    totalTries.value++;
    if (result === '聖筊') shengCount.value++;
    isThrowing.value = false;
  }, 300);
};

const getRandomResult = (): string => {
  const r = Math.floor(Math.random() * 100) + 1;
  if (r <= 5) return '陰筊';
  if (r <= 10) return '笑筊';
  return '聖筊';
};

const getCupImage = (result: string) => {
  if (result === '陰筊') return bwaYin;
  if (result === '笑筊') return bwaXiao;
  if (result === '聖筊') return bwaSheng;
  return '';
};
</script>

<style scoped lang="scss">
.invoke {
  width: 100%;
  &__container {
    width: 100%;
    height: 330px;
  }

  &__left {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__right {
    position: absolute;
    top: 50%;
    right: -126px;
    transform: translateY(-50%);

    width: 506px;
    height: 506px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__right-img {
    position: absolute;

    &--bg {
      inset: 0;
      z-index: 0;
    }

    &--god {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
  }

  &__title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 12px;
  }

  &__desc {
    font-size: 16px;
    margin-bottom: 32px;
    text-align: left;
    color: #fff;
  }

  &__row-group {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 32px;
    margin-bottom: 32px;
    flex-wrap: wrap;
  }

  &__result {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__result-status {
    font-family: Noto Sans TC;
    font-size: 40px;
    font-weight: bold;
    color: #ffd5c0;
    white-space: nowrap;
  }

  &__result-img {
    width: 100%;
    max-width: 182px;
    height: 205px;
  }

  &__button {
    margin-top: 24px;

    &--inline {
      margin-top: 0;
    }
  }

  &__stats {
    display: flex;
    gap: 24px;
    margin-top: 32px;
  }

  &__stat-card {
    background: #fff;
    color: #a53b25;
    padding: 20px 24px;
    border-radius: 16px;
    width: 180px;
    text-align: center;
  }

  &__stat-title {
    font-size: 15px;
    margin-bottom: 8px;
  }

  &__stat-value {
    font-size: 24px;
    font-weight: bold;

    &--red {
      color: #a53b25;
    }
  }

  &__stat-icon img {
    width: 28px;
    height: 28px;
    margin-bottom: 4px;
  }

  &__mascot {
    width: 160px;
    height: auto;
  }
}
</style>
