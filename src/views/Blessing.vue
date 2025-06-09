<template>
  <div class="blessing-page">
    <!-- Header 區塊 -->
    <div class="blessing-page__header">
      <h1 class="blessing-page__title">點燈祈福</h1>
      <p class="blessing-page__description">
        請點選下列表的任一盞燈，即可看到該盞燈的介紹，並進行選購。
      </p>
    </div>

    <!-- Tabs -->
    <div class="blessing-page__tabs">
      <div
        class="blessing-page__tab"
        :class="{ 'blessing-page__tab--active': activeTab === 'product' }"
        @click="activeTab = 'product'"
      >
        祈福燈產品
      </div>
      <div
        class="blessing-page__tab"
        :class="{ 'blessing-page__tab--active': activeTab === 'my' }"
        @click="activeTab = 'my'"
      >
        我的祈福燈
      </div>
    </div>

    <!-- 燈品列表 -->
    <div class="blessing-page__section">
      <h2 class="blessing-page__section-title">祈福燈產品</h2>
      <div class="blessing-page__grid">
        <div
          class="blessing-page__item"
          v-for="lamp in lamps"
          :key="lamp.id"
          @click="selectLamp(lamp)"
        >
          <img
            :src="lamp.image"
            :alt="lamp.name"
            class="blessing-page__item-image"
          />
        </div>
      </div>
    </div>
  </div>
  <MCard customClass="mcard--login">
    <div class="lamp-box">
      <div class="lamp-box__header">
        <img :src="lamp.image" alt="太歲燈" class="lamp-box__image" />
        <div class="lamp-box__info">
          <div class="lamp-box__title">
            {{ lamp.name }}
          </div>
          <p class="lamp-box__desc">{{ lamp.subtitle }}</p>
        </div>
        <div class="lamp-box__stat">
          <p>
            目前有 <span class="lamp-box__highlight">{{ lamp.count }}</span> 盞
            太歲燈
          </p>
          <p>肖：蛇、虎、猴、豬 沖煞必點</p>
        </div>
      </div>

      <!-- 粉色區塊 -->
      <div class="lamp-box__row">
        <!-- 點燈費用 -->
        <div class="lamp-box__column">
          <label class="lamp-box__label">點燈費用：</label>
          <label><input type="radio" checked /> 1年期NT$188元</label>
        </div>

        <!-- 選購燈數 -->
        <div class="lamp-box__column">
          <label class="lamp-box__label">您要選購的燈數：</label>
          <div class="lamp-box__select-wrapper">
            <select v-model="quantity" class="lamp-box__select">
              <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
            </select>
            <span>盞</span>
          </div>
        </div>

        <!-- 貼心提醒 -->
        <div class="lamp-box__column lamp-box__column--wide">
          <label class="lamp-box__label">貼心提醒：</label>
          <p class="lamp-box__reminder">
            除了幫自己點燈，也別忘了幫親友一起點燈祈福唷！<br />
            每次系統正規購買的數量上限為10盞燈，若想超過分次依序點，謝謝。
          </p>
        </div>

        <!-- 按鈕放在背景區塊最下方 -->
        <div class="lamp-box__actions">
          <button class="lamp-box__submit" @click="submit">確認送出</button>
        </div>
      </div>
    </div>
    <div class="lamp-info">
      <div
        class="lamp-info__block"
        v-for="section in sections"
        :key="section.title"
      >
        <div class="lamp-info__title">
          <div class="lamp-info__title-text">
            {{ section.title }}
          </div>
        </div>
        <div class="lamp-info__content">{{ section.content }}</div>
      </div>
    </div>
  </MCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MCard from '@/components/common/MCard.vue';
import lamp1 from '@/assets/image/lamp-1.jpg';

const activeTab = ref<'product' | 'my'>('product');

const lamps = [
  { id: 1, name: '太歲燈', image: lamp1 },
  { id: 2, name: '文昌燈', image: lamp1 },
  { id: 3, name: '平安燈', image: lamp1 },
  { id: 4, name: '生辰燈', image: lamp1 },
  { id: 5, name: '光明燈', image: lamp1 },
  { id: 6, name: '求子燈', image: lamp1 },
  { id: 7, name: '事業燈', image: lamp1 },
  { id: 8, name: '招財燈', image: lamp1 },
  { id: 9, name: '姻緣燈', image: lamp1 },
  { id: 10, name: '桃花燈', image: lamp1 },
  { id: 11, name: '追悼燈', image: lamp1 },
  { id: 12, name: '除穢燈', image: lamp1 },
  { id: 13, name: '健康燈', image: lamp1 },
  { id: 14, name: '添壽燈', image: lamp1 },
  { id: 15, name: '造命燈', image: lamp1 },
  { id: 16, name: '順產燈', image: lamp1 },
  { id: 17, name: '懺悔燈', image: lamp1 },
];

const selectLamp = (lamp: { id: number; name: string }) => {
  alert(`你選擇了：${lamp.name}`);
};

const quantity = ref(1);

const lamp = {
  image: '/images/lamps/taisui.png', // 替換為實際圖片路徑
  name: '太歲燈',
  subtitle: '安奉太歲 順利無災',
  count: '22753',
};

const submit = () => {
  alert(`您選擇了 ${quantity.value} 盞太歲燈`);
};

const sections = [
  {
    title: '太歲燈介紹',
    content:
      '「太歲出現災，無病恐破財；太歲當頭坐，無喜恐有禍。」點亮太歲燈，消災解難，求得平順安康福祿全！',
  },
  {
    title: '誰需要點太歲燈？',
    content:
      '本命年及生肖沖、害、刑、破、運程不佳者（2025乙巳蛇年，生肖屬蛇、虎、猴、豬之人）須點太歲燈！',
  },
  {
    title: '為什麼要點太歲燈？',
    content:
      '有安神化煞之功效！可保平安健康，能達凶化吉，趨離玉祥，無病也無災！',
  },
  {
    title: '2025 蛇年點燈推薦',
    content:
      '本命年及生肖屬蛇、虎、猴、豬之人，太歲當頭坐，「太歲燈」有助安神化煞，達凶化吉，以保平順安康；還可增強正能量，消災免禍，福氣綿延！',
  },
  {
    title: '點的祈福燈會供奉在哪裡？',
    content:
      '本服務為線上點燈，在您點燈之後，在點燈期間內容會一直掛在您的會員首頁，您也可以選擇公開，讓它展示在「祈福燈廣場中」，讓其他網友共同給你祝福。別忘了每天登入會員首頁點亮它，即可為您帶來好運，除去厄運。',
  },
];
</script>

<style scoped lang="scss">
.blessing-page {
  padding: 2rem;

  &__header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  &__title {
    font-size: 1.8rem;
    color: #a2352c;
    font-weight: bold;
  }

  &__description {
    font-size: 1rem;
    color: #555;
    margin-top: 0.5rem;
  }

  &__tabs {
    display: flex;
    justify-content: center;
    background: #f7c56b;
    border-radius: 999px;
    overflow: hidden;
    width: 100%;
  }

  &__tab {
    padding: 0.75rem 2rem;
    font-weight: bold;
    cursor: pointer;
    color: #a53b25;

    &--active {
      color: white;
    }
  }

  &__section {
    text-align: center;
  }

  &__section-title {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #222;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
    justify-items: center;
  }

  &__item {
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__item-image {
    width: 114px;
    height: 144px;
    background: white;
    object-fit: cover;
  }

  &__item-label {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #333;
  }
}

.lamp-info {
  margin-top: 2rem;

  &__block {
    margin-bottom: 1.5rem;
  }

  &__title {
    position: relative;
    &-text {
      background-color: #a2352c;
      color: white;
      font-weight: bold;
      padding: 0.5rem 1rem;
      font-size: 1.1rem;
      max-width: 392px;
    }
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: #a2352c;
    }
  }

  &__content {
    background-color: #fff;
    padding: 1rem;
    line-height: 1.6;
    font-size: 1rem;
  }
}

.lamp-box {
  background: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  font-family: sans-serif;

  &__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  &__image {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    object-fit: cover;
  }

  &__info {
    flex: 1;
    min-width: 200px;
  }

  &__title {
    font-size: 1.5rem;
    color: #a2352c;
    margin: 0;
  }

  &__desc {
    color: #d45343;
    font-weight: bold;
    margin-top: 0.25rem;
    text-decoration: underline;
    font-size: 0.95rem;
  }

  &__stat {
    text-align: right;
    font-size: 0.9rem;
    color: #333;
    min-width: 200px;
  }

  &__highlight {
    color: #d32f2f;
    font-weight: bold;
  }

  &__row {
    display: flex;
    gap: 1.5rem;
    background: #ffe5df;
    padding: 1rem;
    border-radius: 10px;
    flex-wrap: wrap;
  }

  &__column {
    flex: 1;
    min-width: 220px;
  }

  &__label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.25rem;
  }

  &__select-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__select {
    padding: 0.4rem 0.75rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    min-width: 80px;
  }

  &__reminder {
    padding: 0.75rem;
    font-size: 0.85rem;
    line-height: 1.5;
    margin: 0;
  }

  &__footer {
    text-align: center;
    margin-top: 1.25rem;
  }

  &__submit {
    padding: 0.75rem 2rem;
    background: #a2352c;
    color: #fff;
    border: none;
    border-radius: 999px;
    font-weight: bold;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background: #892d24;
    }
  }
  &__actions {
    width: 100%;
    text-align: center;
    margin-top: 1rem;
  }

  &__column--wide {
    flex: 2;
  }
}
</style>
