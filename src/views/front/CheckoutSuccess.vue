<template>
  <div class="checkout-success">
    <SectionBackground variant="divination" />
    <div class="checkout-success__container">
      <MCard customClass="p-48">
        <h2 class="checkout-success__title">訂購成功！</h2>
        <p class="checkout-success__subtitle">感謝您的消費！以下為您的訂單明細</p>

        <div class="checkout-success__content">
          <!-- 商品資訊 -->
          <div class="checkout-success__section">
            <h3>商品資訊</h3>
            <div
              class="checkout-success__product"
              v-for="item in products"
              :key="item.id"
            >
              <div class="checkout-success__image" />
              <div class="checkout-success__product-info">
                <p>{{ item.name }}</p>
                <p class="checkout-success__price">${{ item.price }}</p>
              </div>
            </div>
          </div>

          <!-- 寄送資訊 -->
          <div class="checkout-success__section">
            <h3>寄送資訊</h3>
            <p>宅配：台北市中正區重慶南路一段1號1樓</p>
            <p>發票：個人二聯式發票</p>
            <p class="checkout-success__price">${{ shippingFee }}</p>
          </div>

          <!-- 優惠 -->
          <div class="checkout-success__section">
            <h3>優惠</h3>
            <p>滿$499折$50</p>
            <p class="checkout-success__price">-${{ discount }}</p>
          </div>

          <!-- 付款 -->
          <div class="checkout-success__section">
            <h3>付款</h3>
            <p>信用卡一次付清</p>
          </div>

          <!-- 總金額 -->
          <div class="checkout-success__total">
            <span>總金額：</span>
            <strong>${{ totalAmount }}</strong>
          </div>
        </div>
      </MCard>

      <!-- 按鈕 -->
      <div class="checkout-success__actions">
        <button class="btn btn-outline" @click="goHome">回首頁</button>
        <button class="btn btn-primary" @click="continueShopping">繼續購買</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import MCard from '@/components/common/MCard.vue';
import SectionBackground from '@/components/common/SectionBackground.vue';
const router = useRouter();

const goHome = () => {
  router.push('/');
};

const continueShopping = () => {
  router.push('/store');
};

const products = [
  {
    id: 1,
    name: '黃水晶&綠水晶【自信健康】- 水晶香氛擴香燈',
    price: 2288,
  },
  {
    id: 2,
    name: '白水晶蠟燭【淨化心靈】- 天然手工香氛蠟燭',
    price: 1380,
  },
];

const shippingFee = 150;
const discount = 50;
const totalAmount = products.reduce((sum, p) => sum + p.price, 0) + shippingFee - discount;
</script>

<style scoped lang="scss">
.checkout-success {
  width: 100%;
  position: relative;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  &__title {
    font-size: 1.75rem;
    color: #a93e26;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  &__subtitle {
    text-align: center;
    margin-bottom: 2rem;
    color: #a93e26;
  }

  &__content {
    font-size: 1rem;
    line-height: 1.8;
    color: #333;
  }

  &__section {
    margin-bottom: 1.5rem;
  }

  &__product {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  &__image {
    width: 60px;
    height: 60px;
    background: #ccc;
    border-radius: 8px;
    flex-shrink: 0;
  }

  &__product-info {
    flex: 1;
  }

  &__price {
    float: right;
    font-weight: bold;
  }

  &__total {
    border-top: 1px solid #ccc;
    padding-top: 1rem;
    text-align: right;
    font-size: 1.25rem;
    font-weight: bold;
    margin-top: 1rem;
  }

  &__actions {
    margin-top: 2.5rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;

    .btn {
      padding: 0.75rem 2rem;
      font-size: 1.125rem;
      border-radius: 999px;
      min-width: 120px;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .btn-outline {
      background: white;
      border: 2px solid #a93e26;
      color: #a93e26;

      &:hover {
        background: #f5d8d2;
      }
    }

    .btn-primary {
      background: #a93e26;
      color: white;
      border: 2px solid #a93e26;

      &:hover {
        background: #902f1d;
      }
    }
  }

  @media (max-width: 600px) {
    &__container {
      padding: 2rem 1rem;
    }

    &__actions {
      flex-direction: column;
      align-items: center;

      .btn {
        width: 100%;
        max-width: 300px;
      }
    }

    &__product {
      flex-direction: column;
      align-items: flex-start;
    }

    &__image {
      margin-bottom: 0.5rem;
    }

    &__price {
      float: none;
      text-align: left;
    }

    &__total {
      text-align: center;
    }
  }
}

</style>
