<template>
  <section class="home-blessing">
    <SectionBackground variant="divination" />
    <div class="home-blessing__container">
      <div class="home-blessing__top">
        <!-- 左側主 Banner 區 -->
        <div class="home-blessing__banner">
          <div class="home-blessing__banner-placeholder">主 Banner 區塊</div>
        </div>

        <!-- 右側日曆卡與小圖 -->
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
            <div class="home-blessing__sub-banner-placeholder">次圖 Banner</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 下方見證區 -->
  </section>
</template>

<script setup lang="ts">
import CalendarCard from '@/components/front/CalendarCard.vue';
import SectionBackground from '@/components/common/SectionBackground.vue';
</script>

<style scoped lang="scss">
.home-blessing {
  width: 100%;
  position: relative;
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }
  &__top {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      padding: 1.5rem 1rem;
    }
  }

  &__banner {
    flex: 2;

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
  }

  &__calendar {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__sub-banner {
    &-placeholder {
      width: 100%;
      height: 80px;
      background-color: #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #444;
      font-size: 1rem;
      border-radius: 8px;
    }
  }
}
</style>
