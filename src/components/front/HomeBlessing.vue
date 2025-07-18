<template>
  <section class="home-blessing">
    <SectionBackground variant="divination" />
    <div class="home-blessing__container">
      <div class="home-blessing__top">
        <!-- 主 Banner 區 -->
        <div class="home-blessing__banner">
          <template v-if="bannerAList.length">
            <Swiper
              :modules="[Navigation]"
              :slides-per-view="1"
              :loop="true"
              class="home-blessing__swiper"
            >
              <SwiperSlide v-for="(banner, index) in bannerAList" :key="index">
                <img
                  v-if="banner.imgBase64"
                  :src="banner.imgBase64"
                  class="home-blessing__banner-image"
                  :alt="`主 Banner ${index + 1}`"
                />
              </SwiperSlide>
            </Swiper>
          </template>
          <template v-else>
            <div class="home-blessing__banner-placeholder">主 Banner 區塊</div>
          </template>
        </div>

        <!-- 右側 日曆卡 + 次圖 Swiper -->
        <div class="home-blessing__calendar">
          <CalendarCard
            :calendarData="{
              month: '四月',
              day: '12',
              weekday: '星期六',
              lunarYear: '2025 乙巳年',
              lunarDate: '三月十五',
              zodiac: '蛇',
              info: [
                {
                  type: '沖',
                  text: '屬蛇(乙巳，1歲)、屬蛇(乙巳，61歲)',
                  color: 'green',
                },
                { type: '宜', text: '塞穴、掃舍', color: 'purple' },
                { type: '忌', text: '受死', color: 'gray' },
              ],
            }"
          />
          <div class="home-blessing__sub-banner">
            <template v-if="bannerBList.length">
              <Swiper
                :modules="[Navigation, Autoplay]"
                :slides-per-view="1"
                :loop="true"
                class="home-blessing__sub-swiper"
              >
                <SwiperSlide
                  v-for="(banner, index) in bannerBList"
                  :key="index"
                >
                  <img
                    v-if="banner.imgBase64"
                    :src="banner.imgBase64"
                    alt="次圖 Banner"
                    class="home-blessing__sub-banner-image"
                  />
                </SwiperSlide>
              </Swiper>
            </template>
            <template v-else>
              <div class="home-blessing__sub-banner-placeholder">
                次圖 Banner
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/autoplay';
import { Swiper, SwiperSlide } from 'swiper/vue';

import CalendarCard from '@/components/front/CalendarCard.vue';
import SectionBackground from '@/components/common/SectionBackground.vue';
import type { BannerVO } from '@/vite-env';
import { getAvailableBannerByType } from '@/services/BannerServices';

const bannerAList = ref<BannerVO[]>([]);
const bannerBList = ref<BannerVO[]>([]);

const calendarData = {
  month: '四月',
  day: '12',
  weekday: '星期六',
  lunarYear: '2025 乙巳年',
  lunarDate: '三月十五',
  zodiac: '蛇',
  info: [
    {
      type: '沖',
      text: '屬蛇(乙巳，1歲)、屬蛇(乙巳，61歲)',
      color: 'green',
    },
    { type: '宜', text: '塞穴、掃舍', color: 'purple' },
    { type: '忌', text: '受死', color: 'gray' },
  ],
};

onMounted(async () => {
  try {
    const resA = await getAvailableBannerByType('A');
    if (resA.success) {
      bannerAList.value = resA.data.filter((b: BannerVO) => b.imgBase64);
    }

    const resB = await getAvailableBannerByType('B');
    if (resB.success) {
      bannerBList.value = resB.data.filter((b: BannerVO) => b.imgBase64);
    }
  } catch (error) {
    console.error('載入 banner 錯誤:', error);
  }
});
</script>

<style scoped lang="scss">
.home-blessing {
  width: 100%;
  position: relative;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;

    @media (max-width: 768px) {
      padding: 2rem 1rem;
    }
  }

  &__top {
    display: flex;
    gap: 2rem;
    align-items: stretch;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1.5rem;
    }
  }

  &__banner {
    flex: 2;
    position: relative;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
    overflow: hidden;

    @media (max-width: 768px) {
      aspect-ratio: 16 / 10;
    }

    &-placeholder {
      width: 100%;
      height: 100%;
      background-color: #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #444;
      font-size: 1.2rem;
      border-radius: 8px;
    }

    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 8px;
    }
  }

  &__swiper {
    width: 100%;
    height: 100%;

    :deep(.swiper),
    :deep(.swiper-wrapper),
    :deep(.swiper-slide) {
      width: 100%;
      height: 100%;
    }

    :deep(.swiper-slide) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__calendar {
    flex: 1;
    max-width: 400px; // ✅ 控制次圖最大寬度
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;

    @media (max-width: 768px) {
      max-width: 100%;
    }
  }

  &__sub-banner {
    width: 100%;

    &-placeholder,
    &-image {
      width: 100%;
      height: 80px;
      border-radius: 8px;
    }

    &-placeholder {
      background-color: #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #444;
      font-size: 1rem;
    }

    &-image {
      object-fit: cover;
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  &__sub-swiper {
    width: 100%;
    max-width: 100%;
    height: 120px;
    overflow: hidden;

    :deep(.swiper),
    :deep(.swiper-wrapper),
    :deep(.swiper-slide) {
      width: 100%;
      height: 100%;
    }

    :deep(.swiper-slide) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: #eee;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
