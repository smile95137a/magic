<template>
  <div class="my-blessings">
    <!-- 區塊一：目前供奉中 -->
    <h2 class="my-blessings__title">我的供奉</h2>
    <table class="my-blessings__table">
      <thead>
        <tr>
          <th>目前供奉</th>
          <th>期間</th>
          <th>強化供品紀錄</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>月老</td>
          <td>已供奉4天，剩餘3天</td>
          <td>
            <div>2025/06/03 08:24　金果</div>
            <div>2025/06/03 07:56　金香</div>
            <div>2025/06/03 07:08　金牌</div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 區塊二：查詢供奉紀錄 -->
    <h2 class="my-blessings__title">查詢供奉紀錄</h2>
    <div class="my-blessings__filter">
      <div class="my-blessings__filter-group">
        <label>起始時間</label>
        <input type="date" v-model="startDate" />
      </div>
      <div class="my-blessings__filter-group">
        <label>結束時間</label>
        <input type="date" v-model="endDate" />
      </div>
      <button class="my-blessings__btn" @click="handleSearch">查詢</button>
    </div>

    <table class="my-blessings__table">
      <thead>
        <tr>
          <th>日期</th>
          <th>項目</th>
          <th>內容</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in currentPageItems" :key="index">
          <td>{{ item.date }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.content }}</td>
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
        :totalItems="recordList.length"
        @update:pageLimitSize="pageLimitSize = $event"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Pagination from '@/components/common/Pagination.vue';
import { usePagination } from '@/hook/usePagination';

const startDate = ref('2024-08-04');
const endDate = ref('2024-08-04');

// 所有供奉紀錄原始資料
const recordList = ref<any[]>([]);

// 分頁設定
const pageLimitSize = ref(10);
const {
  totalPages,
  currentPageItems,
  renderPaginationNums,
  currentPage,
  nextPage,
  previousPage,
  goToPage,
} = usePagination<any>(recordList, pageLimitSize);

// 查詢動作（模擬）
const handleSearch = () => {
  recordList.value = Array.from({ length: 26 }, (_, i) => ({
    date: '2025/06/03 18:22',
    title: '項目名稱',
    content: '內容文字',
  }));
};
</script>

<style scoped lang="scss">
.my-blessings {
  &__title {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 2rem 0 1rem;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
    margin-bottom: 2rem;

    th,
    td {
      text-align: left;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #ddd;
      vertical-align: top;
    }

    td {
      white-space: pre-line;
    }
  }

  &__filter {
    display: flex;
    align-items: flex-end;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;

    &-group {
      display: flex;
      flex-direction: column;

      label {
        font-size: 0.9rem;
        margin-bottom: 0.25rem;
      }

      input[type='date'] {
        padding: 0.4rem 0.75rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 0.9rem;
      }
    }
  }

  &__btn {
    padding: 0.5rem 1.2rem;
    background-color: #a53b25;
    color: #fff;
    border: none;
    border-radius: 999px;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #902e1c;
    }
  }
}
</style>
