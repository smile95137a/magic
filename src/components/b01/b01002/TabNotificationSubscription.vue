<template>
  <div class="m-t-12">
    <MCard>
      <div class="flex m-b-16">
        <p class="form__text form__text--title">通知訊息訂閱</p>
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
            <th>通知訊息代碼</th>
            <th>通知訊息名稱</th>
            <th>原狀態</th>
            <th>異動狀態</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in currentPageItems" :key="item.id">
            <td>
              <input type="checkbox" :value="item.id" v-model="selectedIds" />
            </td>
            <td>{{ item.messageCode }}</td>
            <td>{{ item.messageName }}</td>
            <td>{{ item.originalStatus }}</td>
            <td>{{ item.modifiedStatus }}</td>
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
      messageCode: `MSG-${1000 + i}`,
      messageName: `通知內容 ${i}`,
      originalStatus: '未訂閱',
      modifiedStatus: i % 2 === 0 ? '已訂閱' : '未訂閱',
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
