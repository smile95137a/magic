<template>
  <Header />
  <SectionBackground variant="divination">
    <div class="divination">
      <div class="divination__container">
        <!-- 左側：文字區塊 -->
        <div class="divination__text">
          <h2 class="divination__title">求籤問事</h2>
          <p class="divination__paragraph">
            在人生迷惘之際，古老的籤詩智慧總能為您指引方向，讓您在任何時刻都能獲得神明的指點。當心中有所煩憂或迷惘時，不妨靜下心來，將您心中的煩惱、疑問閉眼誠心，向神明求一支籤詩來指引方向。
          </p>
          <p class="divination__paragraph">
            籤詩不僅是神明與您溝通的橋梁，也是神明對信徒的諭示。細心體會籤詩裡的文字與提示，您將能找到未來的機會與方向，更能明確掌握現在的位置。
          </p>
          <p class="divination__paragraph">
            請誠誠地在心中默念您的姓名、出生年月日、住址後，誠心祈求指點迷津，將您心中想請教的事情詳述說明後，再點選「<strong>開始求籤</strong>」按鈕進行線上求籤。
          </p>

          <div class="divination__button-box">
            <StartButton
              styleType="red"
              label="開始求籤"
              @click="goDivination"
            />
          </div>
        </div>

        <!-- 右側：紅底插圖 -->
        <div class="divination__image-box">
          <img
            alt="紅包插圖"
            :src="divinationIntro"
            class="divination__image"
          />
        </div>
      </div>
    </div>
  </SectionBackground>
  <Footer />
</template>

<script setup lang="ts">
import SectionBackground from '@/components/common/SectionBackground.vue';
import divinationIntro from '@/assets/image/divinationIntro.png';
import StartButton from '@/components/StartButton.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const goDivination = () => {
  router.push('/divinationConfirm');
};
</script>

<style lang="scss" scoped>
.divination {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
  }

  &__text {
    flex: 1 1 55%;
    text-align: left;
  }

  &__title {
    font-size: 1.8rem;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 1.5rem;
    font-family: 'Noto Serif TC', serif;
  }

  &__paragraph {
    font-size: 1rem;
    line-height: 2;
    margin-bottom: 1.25rem;
    color: #4a2a18;
    font-family: 'Noto Sans TC', sans-serif;

    strong {
      font-weight: bold;
      color: #4a2a18;
    }
  }

  &__button {
    position: relative;
    background-color: #e56a3c;
    color: #fff;
    font-weight: bold;
    font-size: 1.1rem;
    border: none;
    border-radius: 20px;
    padding: 0.75rem 2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-family: 'Noto Sans TC', sans-serif;
    margin-top: 1.5rem;
  }
  &__button-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
  }

  &__cloud {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  &__underline {
    height: 3px;
    width: 100%;
    background: linear-gradient(to right, #00c4ff, #0076c6);
    margin-top: 8px;
  }

  &__image-box {
    flex: 1 1 40%;
    max-width: 500px;
    border-radius: 16px;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(41.51deg, #e0664d 24.05%, #a53b25 60.53%);
  }

  &__image {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
}
</style>
