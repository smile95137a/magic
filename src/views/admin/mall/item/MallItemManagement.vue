<template>
  <div class="admin-list">
    <h1 class="admin-list__title">商品列表</h1>

    <div class="admin-list__toolbar">
      <button class="admin-list__add-btn" @click="goToAdd">新增商品</button>
    </div>

    <table class="admin-list__table">
      <thead>
        <tr>
          <th>主圖</th>
          <th>商品名稱</th>
          <th>副標題</th>
          <th>售價</th>
          <th>原價</th>
          <th>狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>
            <img
              v-if="item.mainImageUrl"
              :src="getImageUrl(item.mainImageUrl)"
              alt="商品主圖"
              class="admin-list__image"
            />
            <span v-else>—</span>
          </td>
          <td>{{ item.name || '-' }}</td>
          <td>{{ item.subtitle || '-' }}</td>
          <td>{{ item.specialPrice ?? '-' }}</td>
          <td>{{ item.originalPrice ?? '-' }}</td>
          <td>{{ item.status ? '啟用' : '停用' }}</td>
          <td>
            <button @click="goToEdit(item.id)">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getProductList } from '@/services/admin/adminProductServices';
import { withLoading } from '@/utils/loadingUtils';
import { getImageUrl } from '@/utils/ImageUtils';

const router = useRouter();
const products = ref<any[]>([]);

const load = async () => {
  const res = await withLoading(() => getProductList({}));
  if (res.success && Array.isArray(res.data)) {
    products.value = res.data;
  }
};

const goToAdd = () => router.push('/admin/mall/items/add');
const goToEdit = (id: number) => router.push(`/admin/mall/items/edit/${id}`);

onMounted(load);
</script>
<style scoped lang="scss">
.admin-list {
  &__image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 6px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
