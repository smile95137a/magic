<template>
  <div class="admin-list">
    <h1 class="admin-list__title">商品分類管理</h1>
    <button class="admin-list__add-btn" @click="goToAdd">新增分類</button>

    <table class="admin-list__table">
      <thead>
        <tr>
          <th>分類名稱</th>
          <th>描述</th>
          <th>啟用</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in categories" :key="cat.id">
          <td>{{ cat.name }}</td>
          <td>{{ cat.description }}</td>
          <td>{{ cat.status ? '啟用' : '停用' }}</td>
          <td>
            <button @click="goToEdit(cat.id)">編輯</button>
            <button @click="toggleStatus(cat)">
              {{ cat.status ? '停用' : '啟用' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import DateFormatter from '@/components/common/DateFormatter.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  fetchCategoryList,
  modifyCategory,
} from '@/services/admin/adminCategoryServices';
import { withLoading } from '@/utils/loadingUtils';

const categories = ref<any[]>([]);
const router = useRouter();

const load = async () => {
  try {
    const res = await withLoading(() => fetchCategoryList());
    if (res.success && Array.isArray(res.data)) {
      categories.value = res.data;
    }
  } catch (error) {
    console.error('fetchCategoryList error:', error);
  }
};

const goToAdd = () => router.push('/admin/mall/categories/add');
const goToEdit = (id: number) =>
  router.push(`/admin/mall/categories/edit/${id}`);

const toggleStatus = async (cat: any) => {
  const newStatus = !cat.status;

  try {
    const res = await withLoading(() =>
      modifyCategory({
        id: cat.id,
        name: cat.name,
        description: cat.description,
        sort: cat.sort,
        status: newStatus,
      })
    );

    if (res.success) {
      cat.status = newStatus; // 更新畫面資料
    }
  } catch (error) {
    console.error('toggleStatus error:', error);
  }
};
onMounted(() => {
  load();
});
</script>
