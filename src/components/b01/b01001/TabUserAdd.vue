<template>
  <div class="m-t-12">
    <MCard>
      <div class="flex m-b-16">
        <p class="form__text form__text--title">使用者資料</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                @change="toggleSelectAll"
                :checked="selectAll"
              />
            </th>
            <th>項目</th>
            <th>使用者名稱</th>
            <th>E-MAIL</th>
            <th>聯絡電話</th>
            <th>業務名稱</th>
            <th>異動人員</th>
            <th>異動時間</th>
            <th>資料狀態</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in currentPageItems" :key="item.id">
            <td>
              <input type="checkbox" :value="item.id" v-model="selectedIds" />
            </td>
            <td>{{ item.index }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.businessName }}</td>
            <td>{{ item.modifiedBy }}</td>
            <td>
              <DateFormatter
                :date="item.modifiedTime"
                :format="'YYYY/MM/DD HH:mm:ss'"
              />
            </td>
            <td>{{ item.status }}</td>
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
          :totalItems="list.length"
          @update:pageLimitSize="pageLimitSize = $event"
        />
      </div>
    </MCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import MCard from '@/components/common/MCard.vue';
import Pagination from '@/components/common/Pagination.vue';
import { usePagination } from '@/hook/usePagination';
import { useLoadingStore } from '@/stores';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import DateFormatter from '@/components/common/DateFormatter.vue';

const loadingStore = useLoadingStore();
const selectedIds = ref<string[]>([]);
const selectAll = ref(false);
const toggleSelectAll = () => {
  const currentIds = currentPageItems.value.map((item: any) => item.id);
  if (selectAll.value) {
    selectedIds.value = selectedIds.value.filter(
      (id) => !currentIds.includes(id)
    );
  } else {
    selectedIds.value = [...new Set([...selectedIds.value, ...currentIds])];
  }
  checkSelectAll();
};

const checkSelectAll = () => {
  const currentIds = currentPageItems.value.map((item: any) => item.id);
  selectAll.value =
    currentIds.length > 0 &&
    currentIds.every((id) => selectedIds.value.includes(id));
};

const list = ref([]);
// 產生模擬數據
const generateMockData = () => {
  const data = [];
  for (let i = 1; i <= 100; i++) {
    data.push({
      id: i.toString(),
      index: i,
      username: `使用者 ${i}`,
      email: `user${i}@example.com`,
      phone: `09${Math.floor(100000000 + Math.random() * 89999999)}`,
      businessName: `業務 ${(i % 5) + 1}`,
      modifiedBy: `管理員 ${(i % 3) + 1}`,
      modifiedTime: `2024-03-${((i % 28) + 1)
        .toString()
        .padStart(2, '0')} 14:00:00`,
      status: i % 2 === 0 ? '啟用' : '停用',
    });
  }
  return data;
};

const pageLimitSize = ref(10);
const {
  totalPages,
  currentPageItems,
  renderPaginationNums,
  currentPage,
  nextPage,
  previousPage,
  goToPage,
} = usePagination<any>(list, pageLimitSize);
onMounted(() => {
  setTimeout(() => {
    list.value = generateMockData();
  }, 1000);
});

watch(selectedIds, () => {
  checkSelectAll();
});
watch(currentPageItems, () => {
  checkSelectAll();
});
</script>
