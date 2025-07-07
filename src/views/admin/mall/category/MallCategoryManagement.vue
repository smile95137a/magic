<template>
  <div class="admin-list">
    <h2 class="admin-list__title">商品分類</h2>
    <button class="admin-list__add-btn" @click="goToAdd">新增分類</button>

    <table class="admin-list__table">
      <thead>
        <tr>
          <th>名稱</th>
          <th>描述</th>
          <th>排序</th>
          <th>啟用</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in categories" :key="cat.categoryId">
          <td>{{ cat.categoryName }}</td>
          <td>{{ cat.description }}</td>
          <td>{{ cat.sortOrder }}</td>
          <td>{{ cat.isActive ? '是' : '否' }}</td>
          <td>
            <button class="admin-list__table button--edit" @click="edit(cat.categoryId)">
              編輯
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/services/FrontAPI';
import type { ProductCategory } from '@/vite-env';

const categories = ref<ProductCategory[]>([]);
const router = useRouter();

const fetch = async () => {
  const res = await api.post('/admin/product-category/list');
  categories.value = res.data;
};

const goToAdd = () => router.push('/admin/mall/categories/add');
const edit = (id: number) => router.push(`/admin/mall/categories/edit/${id}`);

onMounted(fetch);
</script>
