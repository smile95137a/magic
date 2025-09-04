<template>
  <div class="admin-list">
    <h1 class="admin-list__title">商品列表</h1>

    <div class="admin-list__toolbar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜尋商品名稱或副標題"
        class="admin-list__search-input"
      />
      <button class="admin-list__add-btn" @click="goToAdd">新增商品</button>
    </div>

    <!-- 上架中（上架） -->
    <section class="admin-list__section">
      <div class="admin-list__section-header">
        <h2 class="admin-list__section-title">
          上架中（{{ enabledFilteredList.length }}）
        </h2>
      </div>

      <table class="admin-list__table" v-if="enabledFilteredList.length">
        <thead>
          <tr>
            <th>主圖</th>
            <th>商品名稱</th>
            <th>副標題</th>
            <th>售價</th>
            <th>原價</th>
            <th>狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in currentPageItemsEnabled" :key="item.id">
            <td>
              <img
                v-if="item.mainImageUrl"
                :src="getImageUrl(item.mainImageUrl)"
                alt="商品主圖"
                class="admin-list__image"
              />
              <span v-else>—</span>
            </td>
            <td>{{ item.name || '-' }}</td>
            <td>{{ item.subtitle || '-' }}</td>
            <td>{{ item.specialPrice ?? '-' }}</td>
            <td>{{ item.originalPrice ?? '-' }}</td>
            <td>{{ item.status ? '上架' : '下架' }}</td>
            <td>
              <button @click="goToEdit(item.id)">編輯</button>
              <button @click="goToAdjustStock(item.id)">庫存調整</button>
            </td>
          </tr>
        </tbody>
      </table>
      <NoData v-else />

      <div class="flex justify-center m-t-12" v-if="enabledFilteredList.length">
        <Pagination
          :totalPages="totalPagesEnabled"
          :renderPaginationNums="renderPaginationNumsEnabled"
          :currentPage="currentPageEnabled"
          :nextPage="nextPageEnabled"
          :previousPage="previousPageEnabled"
          :goToPage="goToPageEnabled"
          :pageLimitSize="pageLimitSizeEnabled"
          :totalItems="enabledFilteredList.length"
          @update:pageLimitSize="pageLimitSizeEnabled = $event"
        />
      </div>
    </section>

    <!--  下架 -->
    <section class="admin-list__section m-t-24">
      <div class="admin-list__section-header">
        <h2 class="admin-list__section-title">
          下架（{{ disabledFilteredList.length }}）
        </h2>
      </div>

      <table class="admin-list__table" v-if="disabledFilteredList.length">
        <thead>
          <tr>
            <th>主圖</th>
            <th>商品名稱</th>
            <th>副標題</th>
            <th>售價</th>
            <th>原價</th>
            <th>狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in currentPageItemsDisabled" :key="item.id">
            <td>
              <img
                v-if="item.mainImageUrl"
                :src="getImageUrl(item.mainImageUrl)"
                alt="商品主圖"
                class="admin-list__image"
              />
              <span v-else>—</span>
            </td>
            <td>{{ item.name || '-' }}</td>
            <td>{{ item.subtitle || '-' }}</td>
            <td>{{ item.specialPrice ?? '-' }}</td>
            <td>{{ item.originalPrice ?? '-' }}</td>
            <td>{{ item.status ? '上架' : '下架' }}</td>
            <td>
              <button @click="goToEdit(item.id)">編輯</button>
              <button @click="goToAdjustStock(item.id)">庫存調整</button>
            </td>
          </tr>
        </tbody>
      </table>
      <NoData v-else />

      <div
        class="flex justify-center m-t-12"
        v-if="disabledFilteredList.length"
      >
        <Pagination
          :totalPages="totalPagesDisabled"
          :renderPaginationNums="renderPaginationNumsDisabled"
          :currentPage="currentPageDisabled"
          :nextPage="nextPageDisabled"
          :previousPage="previousPageDisabled"
          :goToPage="goToPageDisabled"
          :pageLimitSize="pageLimitSizeDisabled"
          :totalItems="disabledFilteredList.length"
          @update:pageLimitSize="pageLimitSizeDisabled = $event"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Pagination from '@/components/common/Pagination.vue';
import { usePagination } from '@/hook/usePagination';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getProductList } from '@/services/admin/adminProductServices';
import { withLoading } from '@/utils/loadingUtils';
import { getImageUrl } from '@/utils/ImageUtils';
import { useDialogStore } from '@/stores/dialogStore';

const router = useRouter();
const dialogStore = useDialogStore();

const list = ref<any[]>([]);
const searchQuery = ref('');

// 共用搜尋：先過濾，再依狀態切兩組
const searchedList = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return list.value;
  return list.value.filter(
    (item) =>
      item.name?.toLowerCase().includes(q) ||
      item.subtitle?.toLowerCase().includes(q)
  );
});

// 依狀態切分
const enabledFilteredList = computed(
  () => searchedList.value.filter((x) => !!x.status) // true 視為上架
);
const disabledFilteredList = computed(
  () => searchedList.value.filter((x) => !x.status) // false 視為未上架/下架
);

// 各自的分頁控制
const pageLimitSizeEnabled = ref(10);
const {
  totalPages: totalPagesEnabled,
  currentPageItems: currentPageItemsEnabled,
  renderPaginationNums: renderPaginationNumsEnabled,
  currentPage: currentPageEnabled,
  nextPage: nextPageEnabled,
  previousPage: previousPageEnabled,
  goToPage: goToPageEnabled,
} = usePagination<any>(enabledFilteredList, pageLimitSizeEnabled);

const pageLimitSizeDisabled = ref(10);
const {
  totalPages: totalPagesDisabled,
  currentPageItems: currentPageItemsDisabled,
  renderPaginationNums: renderPaginationNumsDisabled,
  currentPage: currentPageDisabled,
  nextPage: nextPageDisabled,
  previousPage: previousPageDisabled,
  goToPage: goToPageDisabled,
} = usePagination<any>(disabledFilteredList, pageLimitSizeDisabled);

// 載入資料
const load = async () => {
  const res = await withLoading(() => getProductList({}));
  if (res.success && Array.isArray(res.data)) {
    list.value = res.data;
  }
};

const goToAdd = () => router.push('/admin/mall/items/add');
const goToEdit = (id: number) => router.push(`/admin/mall/items/edit/${id}`);
const goToAdjustStock = async (productId: string) => {
  const result = await dialogStore.openStockAdjustDialog(productId);
  if (result === true) {
    load(); // 更新商品列表
  }
};

onMounted(load);
</script>

<style scoped lang="scss">
.admin-list {
  &__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    gap: 12px;
  }

  &__search-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  &__add-btn {
    padding: 8px 16px;
    background-color: #3f2412;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  &__section {
    margin-top: 8px;
  }

  &__section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin: 12px 0;
  }

  &__section-title {
    font-size: 16px;
    font-weight: 700;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;

    thead th {
      text-align: left;
      padding: 10px 8px;
      background: #f8f8f8;
      border-bottom: 1px solid #eaeaea;
    }

    tbody td {
      padding: 10px 8px;
      border-bottom: 1px solid #f0f0f0;
      vertical-align: middle;
    }
  }

  &__image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 6px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
