<template>
  <section class="worship">
    <SectionBackground variant="red" />
    <div class="worship__container">
      <Title :text="`請神方法`" color="light" />
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
          <div
            class="worship__card"
            v-for="(item, index) in steps"
            :key="item.id"
          >
            <div class="worship__card-badge">
              <img :src="badge" alt="步驟徽章" class="worship__badge" />
              <div class="worship__card-badge-text">{{ index + 1 }}</div>
            </div>
            <div class="worship__card-left">
              <img
                :src="menuDecoBottom"
                alt="步驟徽章"
                class="worship__badge"
              />
            </div>
            <div class="worship__card-right">
              <img :src="menuDecoTop" alt="步驟徽章" class="worship__badge" />
            </div>
            <div class="worship__card-content">
              <p class="worship__text" v-html="item.text"></p>
            </div>
          </div>
        </div>

        <!-- Tab 2: 神明供奉說明 -->
        <div v-else-if="activeTab === 'how'" class="worship__cards">
          <div
            class="worship__card"
            v-for="(item, index) in steps2"
            :key="item.id"
          >
            <div class="worship__card-badge">
              <img :src="badge" alt="步驟徽章" class="worship__badge" />
              <div class="worship__card-badge-text">{{ index + 1 }}</div>
            </div>
            <div class="worship__card-left">
              <img
                :src="menuDecoBottom"
                alt="步驟徽章"
                class="worship__badge"
              />
            </div>
            <div class="worship__card-right">
              <img :src="menuDecoTop" alt="步驟徽章" class="worship__badge" />
            </div>
            <div class="worship__card-content">
              <p class="worship__text" v-html="item.text"></p>
            </div>
          </div>
        </div>

        <!-- Tab 3: 神明升級方法 -->
        <div v-else-if="activeTab === 'upgrade'" class="worship__cards">
          <div
            class="worship__card"
            v-for="(item, index) in steps3"
            :key="item.id"
          >
            <div class="worship__card-badge">
              <img :src="badge" alt="步驟徽章" class="worship__badge" />
              <div class="worship__card-badge-text">{{ index + 1 }}</div>
            </div>
            <div class="worship__card-left">
              <img
                :src="menuDecoBottom"
                alt="步驟徽章"
                class="worship__badge"
              />
            </div>
            <div class="worship__card-right">
              <img :src="menuDecoTop" alt="步驟徽章" class="worship__badge" />
            </div>
            <div class="worship__card-content">
              <p class="worship__text" v-html="item.text"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Title from '@/components/common/Title.vue';
import badge from '@/assets/image/badge.png';
import menuDecoBottom from '@/assets/image/menu-deco-bottom.png';
import menuDecoTop from '@/assets/image/menu-deco-top.png';
import SectionBackground from '@/components/common/SectionBackground.vue';

const activeTab = ref('about');

const steps = [
  {
    id: 1,
    text: '請先到「會員中心」填寫發票資訊，之後才能請神或購買供品。',
  },
  {
    id: 2,
    text: `請神／延長供奉：
<br>
可選擇 7 天（NT$200）或 30 天（NT$800），付款完成立即生效，神明會顯示於會員首頁與「供奉大廳」。
<br>
※ 若為「重新請神」（非延長），供桌會重置（原供品清空）。`,
  },
  {
    id: 3,
    text: `冷卻規則：
<br>
供奉期間不可重複請同一尊神；供奉結束後需等待 1 天冷卻完成，才能再次請同一尊神。`,
  },
];

const steps2 = [
  {
    id: 1,
    text: '成功請神後，神明會出現在「供奉大廳」，可在此與神明互動並管理供桌。',
  },
  {
    id: 2,
    text: `供花獻果（更換供品）：
<br>
點擊【點擊供奉】選擇供品放入供桌。部分供品為免費、部分需付費；免費供品立即生效，付費供品需完成付款後生效。
<br>
供桌預設至少 2 格，可依索引置換。`,
  },
  {
    id: 3,
    text: `延長供奉：
<br>
點擊【延長供奉】，選擇 7 天或 30 天，付款完成後立即「順延」目前到期日。`,
  },
];

const steps3 = [
  {
    id: 1,
    text: `升級與金神明：
<br>
供花獻果可累積積分；每累積 10 點升 1 級。達到 Lv5 會進入「金神明」狀態，護祐 24 小時；時間到後恢復原身並將等級重置為 Lv1。`,
  },
  {
    id: 2,
    text: `如何獲得積分：
<br>
每個供品都有對應的積分與價格，實際點數以供品設定為準（例如：鮮花 2、水果 5、元寶 10）。`,
  },
  {
    id: 3,
    text: `進度提示：
<br>
系統會顯示距離金神明還差多少積分（以 40 點為基準），以及目前等級與累計積分。`,
  },
];
</script>

<style scoped lang="scss">
.worship {
  width: 100%;
  position: relative;
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }
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
    margin-bottom: 6rem;
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
    color: #fff;
    &--active {
      border-bottom: 2px solid #fff;
    }
  }

  &__content {
    display: flex;
    justify-content: center;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 6rem;
    justify-content: center;

    @media (min-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }

  &__card {
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 30px;
    padding: 2rem 1rem 4rem 1rem;
    max-width: 390px;
    min-height: 236px;
    position: relative;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(6px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: #fff;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  &__card-badge {
    position: absolute;
    top: -44px;
    left: 50%;
    width: 88px;
    height: 88px;
    transform: translateX(-50%);
    z-index: 2;

    .worship__card-badge-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
      font-weight: bold;
      color: #efa576;
    }
  }

  &__card-left {
    position: absolute;
    left: 1rem;
    bottom: 1rem;

    img {
      width: 40px;
      height: 40px;
    }
  }

  &__card-right {
    position: absolute;
    right: 1rem;
    top: 1rem;

    img {
      width: 40px;
      height: 40px;
    }
  }

  &__card-content {
    margin-top: 3rem;
    padding: 0 1rem;
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
