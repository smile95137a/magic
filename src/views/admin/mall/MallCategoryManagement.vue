<template>
  <div class="mall-category">
    <h1>商城分類管理</h1>
    <button @click="goToAdd">新增分類</button>

    <table>
      <thead>
        <tr>
          <th>分類名稱</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in categories" :key="item.id">
          <td>{{ item.name }}</td>
          <td>
            <button @click="goToEdit(item.id)">編輯</button>
            <button @click="remove(item.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  fetchMallCategoryList,
  deleteMallCategory,
} from '@/services/admin/mallCategoryApi';

const router = useRouter();
const categories = ref<any[]>([]);

const load = async () => {
  const res = await fetchMallCategoryList();
  categories.value = res.data;
};

const goToAdd = () => router.push('/admin/mall/categories/add');
const goToEdit = (id: number) =>
  router.push(`/admin/mall/categories/edit/${id}`);
const remove = async (id: number) => {
  await deleteMallCategory(id);
  await load();
  alert('已刪除分類');
};

onMounted(() => load());
</script>
