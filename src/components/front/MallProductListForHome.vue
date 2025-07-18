<template>
  <div class="mall-product-list">
    <SectionBackground variant="light" />
    <div class="mall-product-list__container">
      <Title text="開運商店" color="red" />

      <div class="mall-product-list__grid">
        <div
          class="product-card"
          v-for="(product, index) in paginatedProducts"
          :key="index"
        >
          <img :src="getImageUrl(product.image)" class="product-card__image" />
          <div class="product-card__info">
            <div class="product-card__title">
              {{ product.title }}
            </div>
            <div class="product-card__price">
              <span class="product-card__price--current">
                NT${{ product.price }}
              </span>
              <span class="product-card__price--original">
                NT${{ product.originalPrice }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="mall-product-list__pagination" v-if="totalPages > 1">
        <button
          class="pagination__btn"
          :disabled="currentPage === 1"
          @click="goToPage(1)"
        >
          &lt;&lt;
        </button>
        <button
          class="pagination__btn"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          &lt;
        </button>

        <button
          class="pagination__dot"
          v-for="page in totalPages"
          :key="page"
          :class="{ 'is-active': page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>

        <button
          class="pagination__btn"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          &gt;
        </button>
        <button
          class="pagination__btn"
          :disabled="currentPage === totalPages"
          @click="goToPage(totalPages)"
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import SectionBackground from '@/components/common/SectionBackground.vue';
import Title from '@/components/common/Title.vue';
import {
  getCategoryAvailableList,
  getProductListByCategory,
} from '@/services/productServices';
import { getImageUrl } from '@/utils/ImageUtils';
interface Product {
  title: string;
  image: string;
  price: number;
  originalPrice: number;
}

const products = ref<Product[]>([]);
const currentPage = ref(1);
const pageSize = 8;

const totalPages = computed(() => Math.ceil(products.value.length / pageSize));

const paginatedProducts = computed(() =>
  products.value.slice(
    (currentPage.value - 1) * pageSize,
    currentPage.value * pageSize
  )
);

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const fetchAllProducts = async () => {
  try {
    const { success, data: categoryList } = await getCategoryAvailableList();
    if (!success) return;

    const result: Product[] = [];

    for (const category of categoryList) {
      const { success: ps, data: productList } = await getProductListByCategory(
        {
          categoryId: category.id,
        }
      );

      if (ps) {
        result.push(
          ...productList.map((p) => ({
            title: p.name.trim(),
            image: p.mainImageUrl || '',
            price: p.specialPrice,
            originalPrice: p.originalPrice,
          }))
        );
      }
    }

    products.value = result;
  } catch (error) {
    console.error('載入商品失敗:', error);
  }
};

onMounted(() => {
  fetchAllProducts();
});
</script>

<style lang="scss" scoped>
.mall-product-list {
  width: 100%;
  position: relative;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    background: #fff;
    padding: 2rem;
    border-radius: 1rem;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  &__pagination {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
}

.product-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &__image {
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
  }

  &__info {
    margin-top: 1rem;
  }

  &__title {
    font-size: 1rem;
    color: #333;
    font-weight: bold;
    margin-bottom: 0.5rem;
    height: 2.5em;
    line-height: 1.25em;
    overflow: hidden;
  }

  &__price {
    font-size: 0.9rem;

    &--current {
      color: #d92332;
      font-weight: bold;
      margin-right: 0.5rem;
    }

    &--original {
      text-decoration: line-through;
      color: #999;
    }
  }
}

.pagination__btn {
  background: none;
  border: none;
  font-size: 1rem;
  padding: 0.5rem;
  cursor: pointer;
  color: #333;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
}

.pagination__dot {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  background: #eee;
  cursor: pointer;
  font-weight: bold;

  &.is-active {
    background: #d92332;
    color: white;
  }
}
</style>
