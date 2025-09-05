幫我加入

<template>
  <div class="product-detail">
    <SectionBackground variant="divination" />

    <div class="product-detail__container">
      <MCard customClass="p-48">
        <!-- ===== Main ===== -->
        <div class="product-detail__main">
          <!-- 圖片區 -->
          <div class="product-detail__left" v-if="product">
            <div class="product-detail__image">
              <img :src="getImageUrl(currentImage)" alt="商品主圖" />
            </div>

            <div class="product-detail__thumbnails">
              <div
                v-for="(img, idx) in images"
                :key="idx"
                :class="['thumbnail', { active: currentImage === img }]"
                :style="{ backgroundImage: `url(${getImageUrl(img)})` }"
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
              NT$
              <NumberFormatter
                :number="product.specialPrice ?? product.originalPrice ?? 0"
              />
              <span class="original">
                NT$
                <NumberFormatter :number="product.originalPrice ?? 0" />
              </span>
            </p>
            <div class="product-detail__actions">
              <button class="btn btn-primary" @click="addToCart">
                加入購物車
              </button>
              <button class="btn btn-outline" @click="goToCart">
                前往購物車
              </button>

              <a
                class="line-cta"
                href="https://lin.ee/yPLS9Np"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="加入官方LINE獲得最新資訊！"
              >
                <span class="line-cta__icon" aria-hidden="true">
                  <i class="fa-brands fa-line"></i>
                </span>
                <span class="line-cta__text">加入官方LINE獲得最新資訊！</span>
              </a>
            </div>
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
          <div v-if="tab === 'description'">
            <div v-if="product?.detailHtml" v-html="product.detailHtml" />
            <div v-else>
              <p>{{ product?.description }}</p>
            </div>
          </div>

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
import { getImageUrl } from '@/utils/ImageUtils';
import type { ProductDetailVO } from '@/vite-env';
import MCard from '@/components/common/MCard.vue';
import SectionBackground from '@/components/common/SectionBackground.vue';
import NumberFormatter from '@/components/common/NumberFormatter.vue';
import { useDialogStore } from '@/stores/dialogStore';
const route = useRoute();
const router = useRouter();
const cart = useCartStore();
const dialogStore = useDialogStore();

const product = ref<ProductDetailVO | null>(null);
const tab = ref<'description' | 'shipping'>('description');

const images = computed(() =>
  product.value
    ? [...(product.value.galleryImageUrls ?? [])].filter(Boolean)
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
  if (!product.value) return;

  cart.addItem({
    id: product.value.id,
    name: product.value.name.trim(),
    price: product.value.specialPrice ?? product.value.originalPrice,
    quantity: 1,
    imageUrl: product.value.mainImageUrl,
  });

  dialogStore.openInfoDialog({
    title: '系統通知',
    message: '已加入購物車！',
  });
};

const goToCart = () => router.push('/cart');
</script>

<style scoped lang="scss">
/* =============================
   Variables
============================= */
$product-detail-red: #a93e26;
$product-detail-red-hover: #902f1d;
$product-detail-light-gray: #f5f5f5;
$product-detail-muted: #888;
$line-green: #06c755;
$line-green-hover: #05b84f;

/* =============================
   Product Detail
============================= */
.product-detail {
  width: 100%;
  position: relative;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
    box-sizing: border-box;
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
    width: 100%;
    height: 400px;
    max-height: 100%;
    border-radius: 1rem;
    overflow: hidden;
    background: $product-detail-light-gray;
    aspect-ratio: 1 / 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &__thumbnails {
    margin-top: 1rem;
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: flex-start;

    .thumbnail {
      width: clamp(48px, 12vw, 64px);
      height: clamp(48px, 12vw, 64px);
      border-radius: 8px;
      cursor: pointer;
      border: 2px solid transparent;
      background-color: #eee;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;

      &.active {
        border-color: $product-detail-red;
      }
    }
  }

  &__info {
    flex: 1;
    min-width: 300px;
    padding-inline: 0.5rem;
  }

  &__title {
    font-size: clamp(1.25rem, 2vw, 1.5rem);
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
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    color: $product-detail-red;
    margin: 1rem 0;
    text-align: left;

    .original {
      text-decoration: line-through;
      font-size: clamp(0.85rem, 1.5vw, 1rem);
      color: $product-detail-muted;
      margin-left: 1rem;
    }
  }

  &__tabs {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    border-bottom: 2px solid #ccc;
    flex-wrap: wrap;
    gap: 0.5rem;

    .tab {
      padding: 0.75rem 2rem;
      border: none;
      background: none;
      font-size: 1rem;
      cursor: pointer;
      color: $product-detail-red;
      font-weight: bold;
      border-bottom: 3px solid transparent;
      transition: border 0.2s;

      &.active {
        border-bottom: 3px solid $product-detail-red;
      }
    }
  }

  &__tab-content {
    padding-top: 1.5rem;
    font-size: 0.95rem;
    line-height: 1.6;
    white-space: pre-wrap;

    ul {
      padding-left: 1.25rem;
      list-style: disc;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }

  /* Actions 區：兩顆並列 + LINE CTA 換下一列 */
  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.75rem;
    width: 100%;

    .btn,
    .line-cta {
      flex: 1;
      min-width: 200px;
      text-align: center;
      box-sizing: border-box;
    }

    .line-cta {
      flex-basis: 100%;
    }
  }
}

/* =============================
   Buttons
============================= */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;

  &-primary {
    background-color: $product-detail-red;
    color: #fff;
    border: none;

    &:hover {
      background-color: $product-detail-red-hover;
    }
  }

  &-outline {
    background-color: transparent;
    color: $product-detail-red;
    border: 2px solid $product-detail-red;

    &:hover {
      background-color: #f8eae6;
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

/* =============================
   LINE CTA
============================= */
.line-cta {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  background: $line-green;
  color: #fff;
  text-decoration: none;
  border: none;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;

  &:hover {
    background: $line-green-hover;
    box-shadow: 0 4px 10px rgba(6, 199, 85, 0.25);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(6, 199, 85, 0.2);
  }

  &__icon {
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__text {
    /* 預設保持單行，窄螢幕再覆蓋為可換行 */
    white-space: nowrap;
    letter-spacing: 0.02em;
    font-size: 1rem;
  }
}

/* =============================
   Responsive Design
============================= */
@media (max-width: 1024px) {
  .product-detail {
    &__container {
      padding: 3rem 1.5rem;
    }

    &__main {
      gap: 1.5rem;
    }

    &__image {
      height: 340px;
    }

    &__tabs .tab {
      padding: 0.5rem 1.25rem;
      font-size: 0.95rem;
    }

    &__tab-content {
      font-size: 0.9rem;
    }
  }

  .btn {
    min-width: 160px;
    font-size: 0.95rem;
    padding: 0.6rem 1.25rem;
  }
}

@media (max-width: 768px) {
  .product-detail {
    /* 若仍出現水平滾動，可打開下面一行作為保險 */
    &__container {
      padding: 2rem 1rem;
      /* overflow-x: hidden; */
    }

    &__main {
      flex-direction: column;
    }

    &__left {
      width: 100%;
    }

    &__image {
      height: 260px;
    }

    &__thumbnails {
      justify-content: center;
    }

    &__title,
    &__subtitle,
    &__price {
      text-align: center;
    }

    &__price .original {
      margin-left: 0.5rem;
    }

    &__info {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__tab-content {
      padding: 1rem 0;
    }

    &__actions {
      flex-direction: column;
      align-items: stretch;
      width: 100%;

      .btn,
      .line-cta {
        width: 100% !important;
        max-width: 100%;
        min-width: 0; /* 允許 flex item 縮小，避免被內容撐爆 */
        box-sizing: border-box;
        overflow: hidden; /* 多出的內容隱藏，保命用 */
        text-overflow: ellipsis; /* 有空白/英文時可顯示省略號 */
      }
    }
  }

  .btn,
  .line-cta {
    margin: 0.5rem 0 0;
    width: 100% !important;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  /* 針對 LINE 文字在窄螢幕改可換行（中文長句最關鍵） */
  .line-cta__text {
    white-space: normal;
    word-break: break-word;
  }
}

@media (max-width: 480px) {
  .product-detail {
    &__image {
      height: 220px;
    }

    &__thumbnails .thumbnail {
      width: 52px;
      height: 52px;
    }

    &__tabs .tab {
      font-size: 0.85rem;
      padding: 0.5rem 1rem;
    }
  }

  .btn {
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
  }

  .line-cta__text {
    font-size: 0.9rem;
  }
}
</style>
