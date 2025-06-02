<template>
  <div class="m-t-12">
    <MCard>
      <div class="flex m-b-16">
        <p class="form__text form__text--title">客戶資料審核</p>
      </div>
      <div class="flex justify-end gap-x-12">
        <!-- <button class="mbtn" @click="navigateToAdd">核准</button>
        <button class="mbtn" @click="deleteSelected">退件</button> -->
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
            <th>客戶別</th>
            <th>公司名稱</th>
            <th>異動時間</th>
            <th>異動人員</th>
            <th>資料狀態</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in currentPageItems" :key="item.id">
            <td>
              <input type="checkbox" :value="item.id" v-model="selectedIds" />
            </td>
            <td>{{ item.noticeType }}</td>
            <!-- 客戶別 -->
            <td>{{ item.bizName }}</td>
            <!-- 公司名稱 -->
            <td>
              <DateFormatter
                :date="item.modifyTime"
                :format="'YYYY/MM/DD HH:mm:ss'"
              />
            </td>
            <!-- 異動時間 -->
            <td>{{ item.modifyName }}</td>
            <!-- 異動人員 -->
            <td>{{ item.status }}</td>
            <!-- 資料狀態 -->
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
import MCard from '@/components/common/MCard.vue';
import Pagination from '@/components/common/Pagination.vue';
import { ref, onMounted } from 'vue';
import { usePagination } from '@/hook/usePagination';
import { useLoadingStore } from '@/stores';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import DateFormatter from '@/components/common/DateFormatter.vue';

const loadingStore = useLoadingStore();
const selectedIds = ref<string[]>([]);
const selectAll = ref(false);

const toggleSelectAll = () => {
  selectAll.value = !selectAll.value;
};

const list = ref([]);
// 產生模擬數據
const generateMockData = () => {
  const data = [];
  for (let i = 1; i <= 100; i++) {
    data.push({
      noticeId: i.toString(),
      noticeType: i % 2 === 0 ? 'VIP' : '一般',
      bizName: `公司 ${i}`,
      modifyName: `員工 ${i}`,
      modifyTime: `2024-02-14 ${10 + (i % 12)}:00:00`,
      status: i % 2 === 0 ? '正常' : '停用',
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
</script>
