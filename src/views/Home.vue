<template>
  <section class="blessing-detail">
    <!-- 上方選單 -->
    <div class="blessing-detail__tabs">
      <button class="blessing-detail__tab blessing-detail__tab--active">
        祈福燈產品
      </button>
      <button class="blessing-detail__tab">我的祈福燈</button>
    </div>

    <!-- 祈福燈產品清單 -->
    <div class="blessing-detail__product-list">
      <div
        v-for="(item, index) in products"
        :key="index"
        class="blessing-detail__product"
      >
        <img :src="item.image" :alt="item.name" />
        <div class="blessing-detail__product-name">{{ item.name }}</div>
      </div>
    </div>

    <!-- 詳情主卡片 -->
    <div class="blessing-detail__main">
      <div class="blessing-detail__main-image"></div>
      <div class="blessing-detail__main-content">
        <h2 class="blessing-detail__main-title">太歲燈</h2>
        <p class="blessing-detail__main-subtitle">安奉太歲，順利驅災</p>
        <p class="blessing-detail__main-count">
          目前有 <span>22753</span> 盞 太歲燈
        </p>
        <p class="blessing-detail__main-remark">肖：蛇、虎、猴，請沖犯必點</p>

        <!-- 表單 -->
        <div class="blessing-detail__form">
          <div class="blessing-detail__form-row">
            <label>點燈費用：</label>
            <div><input type="radio" checked /> 1年期 NT$188 元</div>
          </div>
          <div class="blessing-detail__form-row">
            <label>您要選購的數量：</label>
            <select>
              <option>1 盞</option>
              <option>2 盞</option>
            </select>
          </div>
          <div class="blessing-detail__form-row">
            <label>貼心提醒：</label>
            <p class="blessing-detail__tip">
              除了祈福主燈外，也可為下列親友一起點燈祈福（如有加點將在結帳頁面上新增
              10 盞！）
            </p>
          </div>
          <button class="blessing-detail__submit">確認送出</button>
        </div>
      </div>
    </div>

    <!-- 說明區塊 -->
    <div class="blessing-detail__info">
      <div class="blessing-detail__info-block">
        <h3>太歲燈介紹</h3>
        <p>
          太歲燈主安神、無懼流年關卡，太歲當頭，需點燈祈福化解。點太歲燈，消災解厄，求得平順安康福報。
        </p>
      </div>
      <div class="blessing-detail__info-block">
        <h3>誰需要點太歲燈？</h3>
        <p>
          命命中屬沖、害、刑、破、運程不佳（2025
          已是蛇年，生剋關係蛇、虎、猴、雞之人）適點太歲燈！
        </p>
      </div>
      <div class="blessing-detail__info-block">
        <h3>為什麼要點太歲燈？</h3>
        <p>有安神化煞之功效！可保平安健康、跳脫凶忙、護體福運，無病免厄災！</p>
      </div>
      <div class="blessing-detail__info-block">
        <h3>2025 生肖點燈推薦</h3>
        <p>
          命命屬蛇、屬虎、屬猴、屬雞之人，太歲當頭犯「太歲煞」有染沖犯厄，適合點燈化解，以保平順安康；運可增強正能量，消災解厄，補運護體！
        </p>
      </div>
      <div class="blessing-detail__info-block">
        <h3>貼的祈福燈會供奉在哪裡？</h3>
        <p>
          本服務點燈上架後，您在祝福燈了名後，在點燈期間內它會一直掛在您的會員頁面（並可收到祝福回應），燈尾元素在〈祈福牆中顯示〉，請盡情祈求與傳遞祝福。等訂單成立會員將會收到祝福通知，即可為您點亮專屬一盞祈福燈。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const products = Array.from({ length: 16 }).map((_, i) => ({
  name: [
    '太歲燈',
    '文昌燈',
    '平安燈',
    '玉皇燈',
    '光明燈',
    '斗母燈',
    '事業燈',
    '招財燈',
    '姻緣燈',
    '桃花燈',
    '健康燈',
    '除障燈',
    '虎爺燈',
    '祖先燈',
    '順緣燈',
    '圓轉燈',
  ][i],
  image: new URL(`@/assets/bless-icon-${i + 1}.png`, import.meta.url).href,
}));
</script>

<style scoped lang="scss">
.blessing-detail {
  background: #c2aeaa;
  padding: 2rem 1rem;

  &__tabs {
    display: flex;
    justify-content: center;
    background-color: #f9ddb6;
    border-radius: 999px;
    width: fit-content;
    margin: 0 auto 2rem;
    overflow: hidden;
  }

  &__tab {
    background: transparent;
    padding: 0.5rem 1.5rem;
    font-weight: bold;
    font-size: 14px;
    border: none;
    color: #6b3c18;
    cursor: pointer;

    &--active {
      background-color: #fff;
      color: #aa3a1f;
      border-radius: 999px;
    }
  }

  &__product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  &__product {
    width: 66px;
    text-align: center;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid #fff;
      object-fit: cover;
    }

    &-name {
      font-size: 12px;
      color: #333;
      margin-top: 0.25rem;
    }
  }

  &__main {
    max-width: 920px;
    margin: 0 auto 3rem;
    background: #fff;
    border-radius: 16px;
    padding: 2rem;
    display: flex;
    gap: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }

  &__main-image img {
    width: 120px;
    height: auto;
    border-radius: 16px;
  }

  &__main-content {
    flex: 1;
  }

  &__main-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 0.25rem;
    color: #aa3a1f;
  }

  &__main-subtitle {
    font-size: 15px;
    color: #444;
    margin-bottom: 0.75rem;
  }

  &__main-count {
    font-size: 14px;
    margin-bottom: 0.5rem;

    span {
      color: #aa0033;
      font-weight: bold;
    }
  }

  &__main-remark {
    font-size: 13px;
    color: #991111;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      font-size: 14px;

      label {
        width: 140px;
        font-weight: bold;
        color: #222;
      }

      select,
      input[type='radio'] {
        margin-right: 0.5rem;
      }
    }
  }

  &__tip {
    font-size: 13px;
    line-height: 1.6;
    color: #773322;
  }

  &__submit {
    background: #532c10;
    color: #fff2a8;
    border: none;
    padding: 0.6rem 1.5rem;
    font-weight: bold;
    font-size: 14px;
    border-radius: 999px;
    cursor: pointer;
    margin-top: 1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    &::after {
      content: '➤';
      font-size: 14px;
    }

    &:hover {
      background-color: #6e3b16;
    }
  }

  &__info {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  &__info-block {
    background: #fff;
    border-radius: 10px;
    padding: 1rem 1.5rem;

    h3 {
      font-size: 16px;
      color: #aa3a1f;
      font-weight: bold;
      margin-bottom: 0.5rem;
      position: relative;

      &::before {
        content: '';
        width: 6px;
        height: 20px;
        background: #aa3a1f;
        display: inline-block;
        margin-right: 0.5rem;
      }
    }

    p {
      font-size: 14px;
      line-height: 1.8;
      color: #333;
    }
  }
}
</style>
