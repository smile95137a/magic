<template>
  <div class="product-detail">
    <SectionBackground variant="divination" />

    <div class="product-detail__container">
      <MCard customClass="p-48">
        <!-- ===== Main ===== -->
        <div class="product-detail__main">
          <!-- 圖片區 -->
          <div class="product-detail__left" v-if="product">
            <div
              class="product-detail__image"
              :style="{ backgroundImage: `url(${currentImage})` }"
            />

            <div class="product-detail__thumbnails">
              <div
                v-for="(img, idx) in images"
                :key="idx"
                :class="['thumbnail', { active: currentImage === img }]"
                :style="{ backgroundImage: `url(${img})` }"
                @click="currentImage = img"
              />
            </div>
          </div>

          <!-- 資訊區 -->
          <div class="product-detail__info" v-if="product">
            <h2 class="product-detail__title">{{ product.name.trim() }}</h2>
            <p class="product-detail__subtitle">{{ product.subtitle }}</p>

            <ul class="product-detail__description">
              <li>{{ product.description }}</li>
              <li v-if="product.remark">{{ product.remark }}</li>
            </ul>

            <p class="product-detail__price">
              NT${{ product.specialPrice ?? product.originalPrice }}
              <span class="original">NT${{ product.originalPrice }}</span>
            </p>

            <!-- 若有多規格可改用後端資料 -->
            <select v-model="selectedOption" class="product-detail__select">
              <option value="">請選擇商品選項</option>
              <option :value="product.name">預設規格</option>
            </select>

            <button class="btn btn-primary" @click="addToCart">
              加入購物車
            </button>
            <button class="btn btn-outline" @click="goToCart">
              前往購物車
            </button>
          </div>
        </div>

        <!-- ===== Tabs ===== -->
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

        <div class="product-detail__tab-content">
          <!-- 商品描述 (支援後端 HTML) -->
          <div v-if="tab === 'description'">
            <div v-if="product?.detailHtml" v-html="product.detailHtml" />
            <div v-else>
              <p>{{ product?.description }}</p>
            </div>
          </div>

          <!-- 配送付款說明 -->
          <div v-else>
            <p>📦 配送方式：</p>
            <ul>
              <li>宅配：NT$150（單筆滿 $3000 免運）</li>
              <li>出貨時間：下單後 2–3 個工作天</li>
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
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';
import { getProductDetail } from '@/services/productServices';
import type { ProductDetailVO } from '@/vite-env';
import MCard from '@/components/common/MCard.vue';
import SectionBackground from '@/components/common/SectionBackground.vue';
const route = useRoute();
const router = useRouter();
const cart = useCartStore();

const product = ref<ProductDetailVO | null>(null);
const selectedOption = ref('');
const tab = ref<'description' | 'shipping'>('description');

const images = computed(() =>
  product.value
    ? [product.value.mainImageUrl, ...product.value.galleryImageUrls].filter(
        Boolean
      )
    : []
);
const currentImage = ref('');

onMounted(async () => {
  const id = Number(route.params.id);
  if (!id) return;

  try {
    const { success, data } = await getProductDetail(id);
    if (success) {
      product.value = data;
      currentImage.value = data.mainImageUrl;
    }
  } catch (err) {
    console.error('載入商品詳情失敗', err);
  }
});

const addToCart = () => {
  if (!selectedOption.value) return alert('請選擇商品選項');
  if (!product.value) return;

  cart.addItem({
    id: product.value.id,
    name: product.value.name.trim(),
    price: product.value.specialPrice ?? product.value.originalPrice,
    quantity: 1,
    option: selectedOption.value,
  });
  alert('已加入購物車！');
};

const goToCart = () => router.push('/cart');
</script>

<style scoped lang="scss">
.product-detail {
  width: 100%;
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

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: inline-block;
  text-align: center;
  min-width: 160px;

  & + & {
    margin-left: 1rem; // 兩個按鈕之間的間距
  }

  &-primary {
    background-color: #a93e26;
    color: #fff;
    border: none;

    &:hover {
      background-color: #902f1d;
    }
  }

  &-outline {
    background-color: transparent;
    color: #a93e26;
    border: 2px solid #a93e26;

    &:hover {
      background-color: #f8eae6;
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
