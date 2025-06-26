<!-- MallItemManagement.vue -->
<template>
  <div class="mall-item">
    <h1>商城商品管理</h1>
    <button @click="goToAdd">新增商品</button>

    <table>
      <thead>
        <tr>
          <th>商品名稱</th>
          <th>價格</th>
          <th>分類</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ getCategoryName(item.categoryId) }}</td>
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
  fetchMallItemList,
  deleteMallItem,
} from '@/services/admin/mallItemApi';
import { fetchMallCategoryList } from '@/services/admin/mallCategoryApi';

const router = useRouter();
const items = ref<any[]>([]);
const categories = ref<any[]>([]);

const load = async () => {
  const itemRes = await fetchMallItemList();
  items.value = itemRes.data;

  const catRes = await fetchMallCategoryList();
  categories.value = catRes.data;
};

const getCategoryName = (categoryId: number) => {
  return categories.value.find((c) => c.id === categoryId)?.name || '無';
};

const goToAdd = () => router.push('/admin/mall/items/add');
const goToEdit = (id: number) => router.push(`/admin/mall/items/edit/${id}`);
const remove = async (id: number) => {
  await deleteMallItem(id);
  await load();
  alert('已刪除商品');
};

onMounted(() => load());
</script>

<!-- 共用樣式 (選擇加入單獨 scss 檔) -->
<style scoped lang="scss">
.mall-category,
.mall-item {
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px;

    th,
    td {
      padding: 8px 12px;
      border: 1px solid #ddd;
      text-align: left;
    }

    th {
      background: #f3f4f6;
    }
  }

  button {
    margin-right: 8px;
  }
}
</style>
