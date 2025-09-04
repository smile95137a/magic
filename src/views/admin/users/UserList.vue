<template>
  <div class="admin-list">
    <h1 class="admin-list__title">會員管理</h1>

    <!-- 搜尋框 -->
    <div class="admin-list__toolbar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜尋帳號 / Email / 電話 / 暱稱"
        class="admin-list__search-input"
      />
    </div>

    <div class="admin-list__table-wrap">
      <template v-if="filteredList.length > 0">
        <table class="admin-list__table">
          <thead>
            <tr>
              <th>帳號</th>
              <th>Email</th>
              <th>電話</th>
              <th>暱稱</th>
              <th>狀態</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in currentPageItems" :key="item.id">
              <td>{{ item.username }}</td>
              <td>{{ item.email || '（無 Email）' }}</td>
              <td>{{ item.phone || '（無電話）' }}</td>
              <td>{{ item.nickname || '（無暱稱）' }}</td>
              <td>{{ item.status || '未設定' }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-center m-t-12">
          <Pagination
            :totalPages="totalPages"
            :renderPaginationNums="renderPaginationNums"
            :currentPage="currentPage"
            :nextPage="nextPage"
            :previousPage="previousPage"
            :goToPage="goToPage"
            :pageLimitSize="pageLimitSize"
            :totalItems="filteredList.length"
            @update:pageLimitSize="pageLimitSize = $event"
          />
        </div>
      </template>

      <NoData v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Pagination from '@/components/common/Pagination.vue';
import NoData from '@/components/common/NoData.vue';
import { usePagination } from '@/hook/usePagination';
import { executeApi } from '@/utils/executeApiUtils';
import { fetchAllUsers } from '@/services/admin/adminUserServices';

const router = useRouter();
const list = ref<any[]>([]);
const searchQuery = ref('');
const pageLimitSize = ref(10);

// 過濾後的會員清單
const filteredList = computed(() => {
  if (!searchQuery.value.trim()) return list.value;
  const q = searchQuery.value.toLowerCase();
  return list.value.filter(
    (item) =>
      item.username?.toLowerCase().includes(q) ||
      item.email?.toLowerCase().includes(q) ||
      item.phone?.toLowerCase().includes(q) ||
      item.nickname?.toLowerCase().includes(q)
  );
});

const {
  totalPages,
  currentPageItems,
  renderPaginationNums,
  currentPage,
  nextPage,
  previousPage,
  goToPage,
} = usePagination<any>(filteredList, pageLimitSize);

const load = async () => {
  await executeApi({
    fn: () => fetchAllUsers(),
    onSuccess: (data) => {
      list.value = data ?? [];
    },
    onFail: () => {
      list.value = [];
    },
  });
};

onMounted(load);
</script>

<style scoped lang="scss">
.admin-list {
  padding: 16px;

  &__title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  &__toolbar {
    margin-bottom: 16px;
  }

  &__search-input {
    width: 100%;
    max-width: 300px;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  &__table-wrap {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid #e5e5e5;
      padding: 8px 12px;
      text-align: left;
    }

    th {
      background: #f9f9f9;
    }
  }
}
</style>
