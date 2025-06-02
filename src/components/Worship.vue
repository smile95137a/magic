<template>
  <section class="worship">
    <h2 class="worship__title">請神方法</h2>

    <ul class="worship__tabs">
      <li
        class="worship__tab"
        :class="{ 'worship__tab--active': activeTab === 'about' }"
        @click="activeTab = 'about'"
      >
        關於請神服務
      </li>
      <li
        class="worship__tab"
        :class="{ 'worship__tab--active': activeTab === 'how' }"
        @click="activeTab = 'how'"
      >
        神明供奉說明
      </li>
      <li
        class="worship__tab"
        :class="{ 'worship__tab--active': activeTab === 'upgrade' }"
        @click="activeTab = 'upgrade'"
      >
        神明升級方法
      </li>
    </ul>

    <div class="worship__content">
      <!-- Tab 1: 關於請神服務 -->
      <div v-if="activeTab === 'about'" class="worship__cards">
        <div class="worship__card" v-for="item in steps" :key="item.id">
          <img :src="item.badge" alt="步驟徽章" class="worship__badge" />
          <p class="worship__text" v-html="item.text"></p>
        </div>
      </div>

      <!-- Tab 2: 神明供奉說明 -->
      <div v-else-if="activeTab === 'how'" class="worship__text-block">
        <p>
          神明供奉說明：透過擲筊獲得聖筊數量，並添加香油錢後，即可將神明供奉於會員頁面，每日可供燈祈福，表達誠心，並獲得神明祝福力。
        </p>
      </div>

      <!-- Tab 3: 神明升級方法 -->
      <div v-else-if="activeTab === 'upgrade'" class="worship__text-block">
        <p>
          神明升級方法：持續供奉、完成任務、參與活動可獲得功德點，當點數達標可升級神明等級，開啟更多祝福能力與祈願功能。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('about');

const steps = [
  {
    id: 1,
    badge: new URL('@/assets/badge-1.png', import.meta.url).href,
    text: '每天登入會員後，即可向金好神擲筊算運勢一次。<br>每天每尊神明限擲一次筊。',
  },
  {
    id: 2,
    badge: new URL('@/assets/badge-2.png', import.meta.url).href,
    text: '只要擲到 3 個（含）以上聖筊，即可添加香油錢供奉神明。<br>NT$20 延長 7 天，NT$60 延長 30 天。',
  },
  {
    id: 3,
    badge: new URL('@/assets/badge-3.png', import.meta.url).href,
    text: '每尊神明 24 小時內只能請一次。<br>成功請神後，需等 24 小時才能再次擲筊。',
  },
];
</script>

<style scoped lang="scss">
.worship {
  &__title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  &__wave {
    width: 60px;
    height: auto;
  }

  &__tabs {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
    padding: 0;
    list-style: none;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__tab {
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;
    padding-bottom: 4px;

    &--active {
      border-bottom: 2px solid #fff;
      color: #fff;
    }
  }

  &__content {
    display: flex;
    justify-content: center;
  }

  &__cards {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__card {
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 10px;
    padding: 2rem 1rem;
    max-width: 320px;
    text-align: center;
    position: relative;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  &__badge {
    width: 60px;
    height: auto;
    margin: 0 auto 1rem;
  }

  &__text {
    font-size: 14px;
    line-height: 1.8;
  }

  &__text-block {
    max-width: 700px;
    padding: 2rem 1rem;
    text-align: center;
    font-size: 15px;
    line-height: 1.8;
  }
}
</style>
