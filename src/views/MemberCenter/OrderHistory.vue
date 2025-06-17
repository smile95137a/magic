<template>
  <div class="order-history">
    <h2 class="order-history__title">訂單紀錄</h2>

    <!-- 篩選區 -->
    <div class="order-history__filter">
      <div class="order-history__filter-group">
        <label>起始時間</label>
        <input type="date" v-model="startDate" />
      </div>
      <div class="order-history__filter-group">
        <label>結束時間</label>
        <input type="date" v-model="endDate" />
      </div>
      <button class="order-history__btn" @click="handleSearch">查詢</button>
    </div>

    <!-- 表格 -->
    <table class="order-history__table">
      <thead>
        <tr>
          <th>日期</th>
          <th>訂單編號</th>
          <th>內容</th>
          <th>狀態</th>
          <th>明細</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in currentPageItems" :key="index">
          <td>{{ item.date }}</td>
          <td>
            <div>{{ item.orderId }}</div>
            <div>{{ item.orderId }}</div>
          </td>
          <td>{{ item.content }}</td>
          <td>{{ item.status }}</td>
          <td>
            <button class="order-history__link" @click="openDialog(item)">
              明細
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁 -->
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

    <!-- 明細 Dialog -->
    <div class="order-history__dialog-mask" v-if="showDialog">
      <div class="order-history__dialog">
        <h3 class="order-history__dialog-title">訂單明細</h3>
        <p><strong>訂單編號：</strong>{{ selectedItem.orderId }}</p>
        <p><strong>下單時間：</strong>{{ selectedItem.date }}</p>
        <p><strong>內容：</strong>{{ selectedItem.content }}</p>
        <p><strong>狀態：</strong>{{ selectedItem.status }}</p>
        <div class="order-history__dialog-actions">
          <button class="order-history__btn" @click="showDialog = false">
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Pagination from '@/components/common/Pagination.vue';
import { usePagination } from '@/hook/usePagination';

const startDate = ref('2024-08-04');
const endDate = ref('2024-08-04');

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

const showDialog = ref(false);
const selectedItem = ref<any>({});

const handleSearch = () => {
  list.value = Array.from({ length: 24 }, (_, i) => ({
    date: '2024/07/01 18:22',
    orderId: '123456789012345678',
    content: '內容文字內容文字\n內容文字內容文字',
    status: '訂單準備中',
  }));
};

const openDialog = (item: any) => {
  selectedItem.value = item;
  showDialog.value = true;
};
</script>

<style scoped lang="scss">
.order-history {
  &__title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
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

  &__table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;

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

  &__link {
    background: none;
    border: none;
    padding: 0;
    color: #a53b25;
    text-decoration: underline;
    font-weight: 500;
    font-size: 0.9rem;
    cursor: pointer;
  }

  &__dialog-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }

  &__dialog {
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    max-width: 400px;
    width: 100%;
  }

  &__dialog-title {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  &__dialog-actions {
    margin-top: 1.5rem;
    text-align: right;
  }
}
</style>
