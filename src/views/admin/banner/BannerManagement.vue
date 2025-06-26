<template>
  <div class="banner-list">
    <h1 class="banner-list__title">Banner 管理</h1>
    <button class="banner-list__add-btn" @click="goToAdd">新增 Banner</button>

    <table class="banner-list__table">
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
<style scoped lang="scss">
.banner-list {
  padding: 24px;

  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #2c3e50;
  }

  &__add-btn {
    padding: 8px 16px;
    margin-bottom: 16px;
    font-size: 14px;
    background-color: #409eff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #66b1ff;
    }
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

    th {
      background-color: #f5f7fa;
      color: #34495e;
      text-align: left;
      padding: 12px;
      font-size: 14px;
    }

    td {
      padding: 12px;
      border-top: 1px solid #ebeef5;
      font-size: 14px;
      background-color: #fff;
    }

    tr:hover td {
      background-color: #f4faff;
    }

    img {
      border-radius: 4px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    button {
      margin-right: 8px;
      padding: 6px 10px;
      font-size: 13px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:first-of-type {
        background-color: #409eff;
        color: #fff;

        &:hover {
          background-color: #66b1ff;
        }
      }

      &:last-of-type {
        background-color: #f56c6c;
        color: #fff;

        &:hover {
          background-color: #dd6161;
        }
      }
    }
  }
}
</style>
