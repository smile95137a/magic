<template>
  <Header />
  <SectionBackground variant="divination">
    <div class="divination-confirm">
      <div class="divination-confirm__card">
        <div class="divination-confirm__content">
          <!-- 左側：文字與按鈕 -->
          <div class="divination-confirm__left">
            <p class="divination-confirm__text">
              虔誠向帝君奉香求籤，並擲筊請示帝君是否為此籤，若為聖筊則可觀看籤詩內容，若為笑筊或陰筊則需重新求籤。
            </p>

            <div class="divination-confirm__button-wrapper">
              <StartButton
                styleType="yellow"
                label="開始求籤"
                @click="startDivination"
              />
            </div>
          </div>

          <!-- 右側：筊杯圖 -->
          <div class="divination-confirm__right">
            <div class="divination-confirm__cups">
              <img :src="cup" alt="cup" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionBackground>
</template>

<script setup lang="ts">
import cup from '@/assets/image/cup.png';
import SectionBackground from '@/components/common/SectionBackground.vue';
import divinationIntro from '@/assets/image/divinationIntro.png';
import StartButton from '@/components/StartButton.vue';
import Header from '@/components/Header.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const startDivination = () => {
  router.push('/divinationResult');
};
</script>

<style lang="scss" scoped>
.divination-confirm {
  padding: 4rem 2rem;

  display: flex;
  justify-content: center;

  &__card {
    background: linear-gradient(41.51deg, #e0664d 24.05%, #a53b25 60.53%);

    border-radius: 20px;
    max-width: 1000px;
    width: 100%;
    padding: 3rem 2rem;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  &__left {
    flex: 1 1 60%;
  }

  &__right {
    flex: 1 1 35%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__text {
    color: white;
    font-size: 1.1rem;
    line-height: 2;
    margin-bottom: 2.5rem;
    font-family: 'Noto Serif TC', serif;
  }

  &__button-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  &__cups {
    img {
      width: 182px;
      height: 205px;
      object-fit: cover;
    }
  }
}
</style>
