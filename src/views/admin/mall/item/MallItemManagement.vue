<template>
  <div class="admin-list">
    <h1 class="admin-list__title">商品清單</h1>

    <button class="admin-list__add-btn" @click="goToAdd">新增商品</button>

    <table class="admin-list__table">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>分類代碼</th>
          <th>價格</th>
          <th>數量</th>
          <th>排序</th>
          <th>上架</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.productId">
          <td>
            <img
              v-if="item.imageUrls?.length"
              :src="item.imageUrls[0]"
              class="admin-list__img"
            />
          </td>
          <td>{{ item.productName }}</td>
          <td>{{ item.categoryCode }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.sort }}</td>
          <td>{{ item.isPublished ? '是' : '否' }}</td>
          <td>
            <button @click="goToEdit(item.productId)">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { ProductAdminVO } from '@/vite-env';
import { api } from '@/services/FrontAPI';

const items = ref<ProductAdminVO[]>([]);
const router = useRouter();

const loadData = async () => {
  const res = await api.post('/admin/product/list');
  items.value = res.data;
};

const goToAdd = () => {
  router.push('/admin/mall/items/add');
};

const goToEdit = (id: number) => {
  router.push(`/admin/mall/items/edit/${id}`);
};

onMounted(loadData);
</script>
