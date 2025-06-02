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
            <th>公司名稱</th>
            <th>產品名稱</th>
            <th>企業識別碼</th>
            <th>扣繳業務名稱</th>
            <th>檔案批號</th>
            <th>檔案類型</th>
            <th>檔案名稱</th>
            <th>檔案提供日期</th>
            <th>交易日期</th>
            <th>備註</th>
            <th>檔案大小(KB)</th>
            <th>檔案狀態</th>
            <th>異動後狀態</th>
            <th>異動人員</th>
            <th>異動時間</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in currentPageItems" :key="item.id">
            <td>
              <input type="checkbox" :value="item.id" v-model="selectedIds" />
            </td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.businessId }}</td>
            <td>{{ item.withholdingBusinessName }}</td>
            <td>{{ item.fileBatchNumber }}</td>
            <td>{{ item.fileType }}</td>
            <td>{{ item.fileName }}</td>
            <td>
              <DateFormatter
                :date="item.fileProvideDate"
                :format="'YYYY/MM/DD'"
              />
            </td>
            <td>
              <DateFormatter
                :date="item.transactionDate"
                :format="'YYYY/MM/DD'"
              />
            </td>
            <td>{{ item.remarks }}</td>
            <td>{{ item.fileSize }}</td>
            <td>{{ item.fileStatus }}</td>
            <td>{{ item.modifiedStatus }}</td>
            <td>{{ item.modifiedBy }}</td>
            <td>
              <DateFormatter
                :date="item.modifiedTime"
                :format="'YYYY/MM/DD HH:mm:ss'"
              />
            </td>
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

const toggleSelectAll = () => {};

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
