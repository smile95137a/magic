<template>
  <div class="admin-list">
    <h2 class="admin-list__title">老師清單</h2>
    <button class="admin-list__add-btn" @click="goToAdd">新增老師</button>

    <table class="admin-list__table">
      <thead>
        <tr>
          <th>名稱</th>
          <th>職稱</th>
          <th>啟用</th>
          <th>排序</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in masters" :key="item.masterId">
          <td>{{ item.masterName }}</td>
          <td>{{ item.jobTitle }}</td>
          <td>{{ item.isActive ? '是' : '否' }}</td>
          <td>{{ item.sort }}</td>
          <td>
            <button @click="editMaster(item.masterId)">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { fetchAllMasters } from '@/services/admin/adminMasterServices';
import type { MasterAdminVO } from '@/vite-env';

const router = useRouter();
const masters = ref<MasterAdminVO[]>([]);

const loadMasters = async () => {
  masters.value = await fetchAllMasters();
};

const goToAdd = () => {
  router.push('/admin/masters/add');
};

const editMaster = (id: string) => {
  router.push(`/admin/masters/edit/${id}`);
};

onMounted(() => {
  loadMasters();
});
</script>
