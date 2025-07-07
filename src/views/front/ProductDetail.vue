<template>
  <div class="product-detail">
        <SectionBackground variant="divination" />
    <div class="product-detail__container">
      <MCard customClass="p-48">
        <div class="product-detail__main">
          <!-- 左圖區 -->
          <div class="product-detail__left">
            <!-- 主圖模擬 -->
            <div class="product-detail__image">
              <div class="image-block" :style="{ backgroundColor: currentImage }" />
            </div>

            <!-- 小縮圖 -->
            <div class="product-detail__thumbnails">
              <div
                v-for="(color, index) in productImages"
                :key="index"
                :class="['thumbnail', { active: currentImage === color }]"
                :style="{ backgroundColor: color }"
                @click="currentImage = color"
              />
            </div>
          </div>

          <!-- 商品資訊 -->
          <div class="product-detail__info">
            <h2 class="product-detail__title">
              黃水晶x綠水晶【自信健康】<br />水晶香氛擴香燈
            </h2>
            <p class="product-detail__subtitle">加贈 快樂鼠尾草精油1瓶(10ml)</p>
            <ul class="product-detail__description">
              <li>綠水晶：增進事業財運、平衡身心健康</li>
              <li>黃水晶：幫助集中注意力、提升自信</li>
              <li>快樂鼠尾草精油：放鬆情緒、迎財招福</li>
            </ul>
            <p class="product-detail__price">
              NT$2,288 <span class="original">NT$2,979</span>
            </p>

            <select v-model="selectedOption" class="product-detail__select">
              <option value="">請選擇商品選項</option>
              <option value="黃綠水晶組">黃綠水晶組</option>
              <option value="粉紫水晶組">粉紫水晶組</option>
            </select>

            <button class="btn btn-primary" @click="addToCart">加入購物車</button>
            <button class="btn btn-outline" @click="goToCart">前往購物車</button>

          </div>
        </div>

        <!-- Tabs -->
        <div class="product-detail__tabs">
          <button
            class="tab"
            :class="{ active: tab === 'description' }"
            @click="tab = 'description'"
          >
            商品描述
          </button>
          <button
            class="tab"
            :class="{ active: tab === 'shipping' }"
            @click="tab = 'shipping'"
          >
            送貨及付款方式
          </button>
        </div>

        <!-- Tab Content -->
        <div class="product-detail__tab-content">
          <div v-if="tab === 'description'">
            <p>這款水晶香氛擴香燈結合天然水晶與精油香氛，提升空間療癒感與好運氣。</p>
            <ul>
              <li>適合玄關、臥室、書房等空間</li>
              <li>水晶可重複使用，環保實用</li>
              <li>贈送精油可滴入燈座使用</li>
            </ul>
          </div>
          <div v-else-if="tab === 'shipping'">
            <p>📦 配送方式：</p>
            <ul>
              <li>宅配：NT$150（單筆滿$3000免運）</li>
              <li>出貨時間：下單後 2~3 個工作天</li>
            </ul>
            <p>💳 付款方式：</p>
            <ul>
              <li>信用卡（一次付清）</li>
              <li>LINE Pay</li>
              <li>貨到付款</li>
            </ul>
          </div>
        </div>
      </MCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import MCard from '@/components/common/MCard.vue';
import SectionBackground from '@/components/common/SectionBackground.vue';
import { useRouter } from 'vue-router';
const router = useRouter();



const productImages = ['#d2a679', '#c9d4c5', '#f1c0c0', '#b3cde0'];
const currentImage = ref(productImages[0]);
const selectedOption = ref('');
const tab = ref<'description' | 'shipping'>('description');
const cart = useCartStore();

const product = {
  id: 1,
  name: '黃水晶x綠水晶【自信健康】 - 水晶香氛擴香燈',
  price: 2288,
};

const addToCart = () => {
  if (!selectedOption.value) {
    alert('請選擇商品選項');
    return;
  }

  cart.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
    option: selectedOption.value,
  });

  alert('已加入購物車！');
};
const goToCart = () => {
  router.push('/cart');
};
</script>
<style scoped lang="scss">
.product-detail {  width: 100%;
  position: relative;
  &__container {
     max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  &__main {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  &__left {
    width: 400px;
  }

  &__image {
    .image-block {
      width: 100%;
      height: 400px;
      border-radius: 1rem;
    }
  }

  &__thumbnails {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: flex-start;

    .thumbnail {
      width: 64px;
      height: 64px;
      border-radius: 8px;
      cursor: pointer;
      border: 2px solid transparent;

      &.active {
        border-color: #a93e26;
      }
    }
  }

  &__info {
    flex: 1;
    min-width: 300px;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  &__subtitle {
    color: #b84d32;
    margin: 0.5rem 0 1rem;
  }

  &__description {
    margin-bottom: 1rem;
    padding-left: 1.25rem;

    li {
      margin-bottom: 0.5rem;
      list-style: disc;
    }
  }

  &__price {
    font-size: 1.5rem;
    color: #a93e26;
    margin: 1rem 0;

    .original {
      text-decoration: line-through;
      font-size: 1rem;
      color: #888;
      margin-left: 1rem;
    }
  }

  &__select {
    margin: 1rem 0;
    padding: 0.5rem;
    border-radius: 6px;
    width: 100%;
    border: 1px solid #ccc;
  }

  &__tabs {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    border-bottom: 2px solid #ccc;

    .tab {
      padding: 0.75rem 2rem;
      border: none;
      background: none;
      font-size: 1rem;
      cursor: pointer;
      color: #a93e26;
      font-weight: bold;
      border-bottom: 3px solid transparent;
      transition: border 0.2s;

      &.active {
        border-bottom: 3px solid #a93e26;
      }
    }
  }

  &__tab-content {
    padding-top: 1.5rem;
    font-size: 0.95rem;
    line-height: 1.6;

    ul {
      padding-left: 1.25rem;
      list-style: disc;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
}

.btn-primary {
  background: #a93e26;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: background 0.2s;

  &:hover {
    background: #902f1d;
  }
}

/* ✅ RWD：手機版調整 */
@media (max-width: 768px) {
  .product-detail {
    &__main {
      flex-direction: column;
    }

    &__left {
      width: 100%;
    }

    &__image {
      .image-block {
        height: 300px;
      }
    }

    &__thumbnails {
      justify-content: center;
    }
  }
}
</style>
