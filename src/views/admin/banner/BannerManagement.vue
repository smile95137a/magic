<template>
  <div class="admin-list">
    <h1 class="admin-list__title">Banner 管理</h1>
    <button class="admin-list__add-btn" @click="goToAdd">新增 Banner</button>

    <table class="admin-list__table">
      <thead>
        <tr>
          <th>標題</th>
          <th>圖片</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="banner in banners" :key="banner.id">
          <td>{{ banner.title }}</td>
          <td>
            <img :src="banner.imageUrl" alt="banner" style="height: 40px" />
          </td>
          <td>
            <button @click="goToEdit(banner.id)">編輯</button>
            <button @click="remove(banner.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchBannerList, deleteBanner } from '@/services/admin/bannerApi';

const router = useRouter();
const banners = ref<any[]>([]);

const load = async () => {
  const res = await fetchBannerList();
  banners.value = res.data;
};

const goToAdd = () => router.push('/admin/banners/add');
const goToEdit = (id: number) => router.push(`/admin/banners/edit/${id}`);

const remove = async (id: number) => {
  await deleteBanner(id);
  await load();
  alert(`已刪除 ID: ${id}`);
};

onMounted(() => {
  load();
});
</script>
