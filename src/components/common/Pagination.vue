<template>
  <div class="pagination">
    <div class="pagination__main">
      <button
        type="button"
        class="pagination__btn"
        @click="goToPage(1)"
        :disabled="currentPage === 1"
      >
        <i class="fas fa-angles-left"></i>
      </button>

      <button
        type="button"
        class="pagination__btn"
        @click="previousPage"
        :disabled="currentPage === 1"
      >
        <i class="fas fa-chevron-left"></i>
      </button>

      <div class="pagination__items">
        <button
          v-for="page in renderPaginationNums"
          :key="page"
          type="button"
          class="pagination__btn"
          :class="{ 'pagination__btn--active': page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>

      <button
        type="button"
        class="pagination__btn"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        <i class="fas fa-chevron-right"></i>
      </button>

      <button
        type="button"
        class="pagination__btn"
        @click="goToPage(totalPages)"
        :disabled="currentPage === totalPages"
      >
        <i class="fas fa-angles-right"></i>
      </button>
    </div>

    <label for="pagination__page-size" class="pagination__info"
      >共計 {{ totalItems }} 筆資訊，目前顯示: {{ displayStart }}~{{
        displayEnd
      }}
      筆</label
    >
    <select
      id="pagination__page-size"
      class="pagination__page-size"
      :value="pageLimitSize"
      @change="
        $emit(
          'update:pageLimitSize',
          Number(($event.target as HTMLSelectElement).value)
        )
      "
    >
      <option
        v-for="size in [10, 20, 30, 40, 50, 100, 150, 200]"
        :key="size"
        :value="size"
      >
        每頁顯示{{ size }}筆
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
  totalPages: number;
  renderPaginationNums: number[]; // 修正為數組
  currentPage: number;
  nextPage: () => void; // 修正為明確的函數類型
  previousPage: () => void; // 修正為明確的函數類型
  goToPage: (page: number) => void; // 修正為明確的函數類型
  pageLimitSize: number;
  totalItems: number; // 新增總數據數量
}>();

const displayStart = computed(
  () => ~~((props.currentPage - 1) * props.pageLimitSize + 1)
);
const displayEnd = computed(
  () => ~~Math.min(props.currentPage * props.pageLimitSize, props.totalItems)
);
</script>
