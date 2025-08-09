<template>
  <div class="admin-list">
    <h1 class="admin-list__title">付款紀錄報表</h1>

    <form class="admin-list__form" @submit.prevent="onSubmit">
      <input
        type="date"
        v-model="startDate"
        class="admin-list__input"
        required
      />
      <input type="date" v-model="endDate" class="admin-list__input" required />
      <button type="submit" class="admin-list__button">查詢</button>
    </form>

    <div class="m-t-12" v-if="list.length">
      <strong>筆數：</strong>{{ list.length }}
    </div>

    <div class="admin-list__table-wrap m-t-8">
      <template v-if="currentPageItems.length > 0">
        <table class="admin-list__table">
          <thead>
            <tr>
              <th>建立時間</th>
              <th>來源</th>
              <th>外部訂單號</th>
              <th>平台訂單號</th>
              <th>發票號碼</th>
              <th>隨機碼</th>
              <th>狀態</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(r, i) in currentPageItems"
              :key="r.id || r.externalOrderNo || i"
            >
              <td>{{ formatTime(r.createTime) }}</td>
              <td>{{ typeLabel(r.type) }}</td>
              <td>{{ r.externalOrderNo || '-' }}</td>
              <td>{{ r.providerOrderNo || '-' }}</td>
              <td>{{ r.invoiceNumber || '-' }}</td>
              <td>{{ r.randomNumber || '-' }}</td>
              <td>{{ r.status || '-' }}</td>
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
      </template>

      <NoData v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import moment from 'moment';
import Pagination from '@/components/common/Pagination.vue';
import NoData from '@/components/common/NoData.vue';
import { usePagination } from '@/hook/usePagination';
import { fetchMoneyReport } from '@/services/admin/adminReportServices';

const startDate = ref('');
const endDate = ref('');
const list = ref<any[]>([]);
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

const formatTime = (val: string | null | undefined) =>
  val ? moment(val).format('YYYY/MM/DD HH:mm') : '-';

const typeLabel = (t: string | undefined) => {
  const map: Record<string, string> = {
    M: '老師預約',
    O: '供品',
    L: '點燈',
    R: '商城訂單',
  };
  return map[t || ''] || t || '-';
};

const onSubmit = async () => {
  const payload = {
    startTime: moment(startDate.value).format('YYYY/MM/DD'),
    endTime: moment(endDate.value).format('YYYY/MM/DD'),
  };
  const res = await fetchMoneyReport(payload);
  list.value = res.success ? res.data ?? [] : [];
};

onMounted(() => {
  endDate.value = moment().format('YYYY-MM-DD');
  startDate.value = moment().subtract(7, 'days').format('YYYY-MM-DD');
  onSubmit();
});
</script>
