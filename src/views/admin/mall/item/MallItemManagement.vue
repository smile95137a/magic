<template>
  <div class="admin-list">
    <h1 class="admin-list__title">商品分類管理</h1>
    <button class="admin-list__add-btn" @click="goToAdd">新增分類</button>

    <table class="admin-list__table">
      <thead>
        <tr>
          <th>分類名稱</th>
          <th>描述</th>
          <th>排序</th>
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
            <DateFormatter
              :date="cat.createTime"
              :format="'YYYY/MM/DD HH:mm:ss'"
            />
          </td>
          <td>
            <button @click="goToEdit(cat.id)">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DateFormatter from '@/components/common/DateFormatter.vue';
import { getProductList } from '@/services/admin/adminProductServices';
import { withLoading } from '@/utils/loadingUtils';

const products = ref<any[]>([]);
const router = useRouter();

const load = async () => {
  try {
    const res = await withLoading(() =>
      getProductList({
        page: 1,
        size: 1000,
      })
    );
    if (res.success && Array.isArray(res.data?.list)) {
      products.value = res.data.list;
    }
  } catch (error) {
    console.error('getProductList error:', error);
  }
};

const goToAdd = () => router.push('/admin/mall/products/add');
const goToEdit = (id: number) => router.push(`/admin/mall/products/edit/${id}`);

onMounted(() => {
  load();
});
</script>
