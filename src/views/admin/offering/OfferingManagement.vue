<template>
  <div class="admin-list">
    <h1 class="admin-list__title">供品管理</h1>
    <button class="admin-list__add-btn" @click="goToAdd">新增供品</button>

    <table class="admin-list__table">
      <thead>
        <tr>
          <th>名稱</th>
          <th>圖片</th>
          <th>點數</th>
          <th>金額</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in offerings" :key="item.id">
          <td>{{ item.name }}</td>
          <td>
            <img
              v-if="item.imageBase64"
              :src="item.imageBase64"
              :alt="item.name"
              style="height: 40px"
            />
            <span v-else>（無圖片）</span>
          </td>
          <td>{{ item.points }}</td>
          <td>{{ item.price }}</td>
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
import { fetchOfferingList } from '@/services/admin/adminOfferingServices';
import type { OfferingVO } from '@/vite-env';
import { withLoading } from '@/utils/loadingUtils';

const router = useRouter();
const offerings = ref<OfferingVO[]>([]);

const load = async () => {
  try {
    const res = await withLoading(fetchOfferingList);
    if (res.success && Array.isArray(res.data)) {
      offerings.value = res.data;
    }
  } catch (error) {
    console.error('load offerings error:', error);
  }
};

const goToAdd = () => router.push('/admin/offerings/add');
const goToEdit = (id: string) => router.push(`/admin/offerings/edit/${id}`);

onMounted(() => {
  load();
});
</script>
