<template>
  <div class="mall">
    <SectionBackground variant="divination" />
    <div class="mall__container">
      <MCard customClass="p-48">
        <MallProductList
          title="類別1"
          description="這是類別1的簡介文字，可以很長也可以很短，自由調整。"
          :products="category1Products"
        />

        <MallProductList
          title="類別2"
          description="這是類別2的說明區塊，可以放促銷資訊、品牌口號或其他內容。"
          :products="category2Products"
        />

        <MallProductList
          title="類別3"
          description="這是類別3的特色介紹，也可以完全不寫 description。"
          :products="category3Products"
        />
      </MCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import MCard from '@/components/common/MCard.vue';
import MallProductList from '@/components/front/MallProductList.vue';
import SectionBackground from '@/components/common/SectionBackground.vue';
import mp from '@/assets/image/mp.png';
import {
  getCategoryAvailableList,
  getProductDetail,
  getProductListByCategory,
} from '@/services/productServices';
import { ref, onMounted } from 'vue';
const sampleProduct = {
  id: 0,
  name: '黃水晶冰塊晶【自信健康】-水晶香氛擴香組',
  price: 1488,
  originalPrice: 2099,
  image: mp,
};

// 模擬資料（實際可從 API 傳入）
const category1Products = Array.from({ length: 12 }, (_, i) => ({
  ...sampleProduct,
  id: i + 1,
}));

const category2Products = Array.from({ length: 10 }, (_, i) => ({
  ...sampleProduct,
  id: 100 + i,
}));

const category3Products = Array.from({ length: 6 }, (_, i) => ({
  ...sampleProduct,
  id: 200 + i,
}));

const categories = ref<any[]>([]);

const fetchCategoriesWithProducts = async () => {
  try {
    getProductDetail(1);
    const categoryList = await getCategoryAvailableList();
    const results = await Promise.all(
      categoryList.map(async (category) => {
        const products = await getProductListByCategory({
          categoryId: category.id,
        });
        return { ...category, products };
      })
    );
    categories.value = results;
  } catch (err) {
    console.error('載入分類與商品失敗', err);
  }
};

onMounted(() => {
  fetchCategoriesWithProducts();
});
</script>

<style scoped lang="scss">
.mall {
  width: 100%;
  position: relative;
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }
}
</style>
