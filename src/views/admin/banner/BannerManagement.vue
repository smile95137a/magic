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
          <td>{{ banner.description || '（無描述）' }}</td>
          <td>
            <img
              :src="`${banner.imageBase64}`"
              :alt="banner.description || 'Banner'"
              style="height: 40px"
            />
          </td>
          <td>
            <button @click="goToEdit(banner.id)">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchAdminBannerByType } from '@/services/admin/adminBannerServices';
import type { BannerAdminVO } from '@/vite-env';
import { withLoading } from '@/utils/loadingUtils';

const router = useRouter();
const banners = ref<BannerAdminVO[]>([]);

const load = async () => {
  try {
    const res = await withLoading(() => fetchAdminBannerByType('A'));
    if (res.success && Array.isArray(res.data)) {
      banners.value = res.data;
    }
  } catch (error) {
    console.error('load banners error:', error);
  }
};

const goToAdd = () => router.push('/admin/banners/add');
const goToEdit = (id: number) => router.push(`/admin/banners/edit/${id}`);

onMounted(() => {
  load();
});
</script>
