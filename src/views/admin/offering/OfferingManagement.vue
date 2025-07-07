<template>
  <div class="admin-list">
    <h1 class="admin-list__title">供品管理</h1>
    <button class="admin-list__add-btn" @click="goToAdd">新增供品</button>

    <table class="admin-list__table">
      <thead>
        <tr>
          <th>圖片</th>
          <th>名稱</th>
          <th>類型</th>
          <th>說明</th>
          <th>價格</th>
          <th>啟用</th>
          <th>排序</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in offerings" :key="item.offeringId">
          <td><img :src="item.imageUrl" alt="offering" style="height: 40px" /></td>
          <td>{{ item.offeringName }}</td>
          <td>{{ item.offeringType }}</td>
          <td>{{ item.offeringDesc }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.isActive ? '是' : '否' }}</td>
          <td>{{ item.sort }}</td>
          <td>
            <button @click="goToEdit(item.offeringId)">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { fetchOfferingList } from '@/services/admin/adminOfferingServices';
import type { OfferingVO } from '@/vite-env';

const offerings = ref<OfferingVO[]>([]);
const router = useRouter();

const load = async () => {
  offerings.value = await fetchOfferingList();
};

const goToAdd = () => router.push('/admin/offerings/add');
const goToEdit = (id?: string) => router.push(`/admin/offerings/edit/${id}`);

onMounted(load);
</script>
