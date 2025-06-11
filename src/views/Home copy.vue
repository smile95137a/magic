<template>
  <SectionBackground variant="red">
    <section class="divination">
      <p class="divination__instruction">
        虔誠向帝君奉香求籤，並擲筊請示帝君是否為此籤，若為聖筊則可觀看籤詩內容，若為笑筊或陰筊則需重新求籤。
      </p>

      <!-- 中央大圖 -->
      <div class="divination__main-img" v-if="currentResult">
        <img :src="getCupImage(currentResult)" alt="bwa" />
      </div>

      <!-- 擲筊按鈕 -->
      <StartButton
        styleType="yellow"
        :label="isThrowing ? '擲筊中...' : '開始擲筊'"
        :disabled="isThrowing || results.length >= maxTries"
        @click="throwBwa"
      />

      <!-- 結果展示 -->
      <div class="divination__results" v-if="results.length > 0">
        <div
          v-for="(result, index) in results"
          :key="index"
          class="divination__result-block"
        >
          <p class="divination__result-label">第{{ index + 1 }}次擲杯</p>
          <img
            :src="getCupImage(result)"
            :alt="result"
            class="divination__result-img"
          />
          <p class="divination__result-text">{{ result }}</p>
        </div>

        <!-- 重置按鈕 -->
        <div class="divination__reset">
          <StartButton
            styleType="red"
            label="重新求籤"
            @click="resetDivination"
          />
        </div>
      </div>
    </section>
  </SectionBackground>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import bwaYin from '@/assets/image/bwa-yin.png';
import bwaXiao from '@/assets/image/bwa-xiao.png';
import bwaSheng from '@/assets/image/bwa-sheng.png';
import StartButton from '@/components/StartButton.vue';
import SectionBackground from '@/components/common/SectionBackground.vue';

const results = ref<string[]>([]);
const currentResult = ref('');
const isThrowing = ref(false);
const maxTries = 3;

const throwBwa = () => {
  if (isThrowing.value || results.value.length >= maxTries) return;

  isThrowing.value = true;

  setTimeout(() => {
    const result = getRandomResult();
    currentResult.value = result;
    results.value.push(result);
    isThrowing.value = false;

    if (results.value.length === maxTries) {
      const allSheng = results.value.every((r) => r === '聖筊');
      if (allSheng) {
        console.log('🎉 恭喜，三次都是聖筊！');
      }
    }
  }, 300);
};

const resetDivination = () => {
  results.value = [];
  currentResult.value = '';
};

const getRandomResult = (): string => {
  const random = Math.floor(Math.random() * 100) + 1;
  if (random <= 5) return '陰筊';
  if (random <= 10) return '笑筊';
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
.divination {
  text-align: center;
  padding: 40px 20px;
  color: #fff;

  &__instruction {
    font-size: 16px;
    margin-bottom: 24px;
    line-height: 1.8;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }

  &__main-img img {
    width: 120px;
    height: auto;
    margin-bottom: 24px;
  }

  &__results {
    display: flex;
    justify-content: center;
    gap: 32px;
    flex-wrap: wrap;
    margin-top: 24px;
  }

  &__result-block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__result-label {
    font-size: 14px;
    margin-bottom: 8px;
  }

  &__result-img {
    width: 40px;
    height: auto;
    margin-bottom: 4px;
  }

  &__result-text {
    font-size: 16px;
    font-weight: bold;
  }

  &__reset {
    margin-top: 32px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
