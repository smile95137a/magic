<template>
  <div class="m-t-12">
    <MCard>
      <div class="flex m-b-16">
        <p class="form__text form__text--title">
          外幣委代扣扣繳業務名稱對應匯款性質別
        </p>
      </div>

      <table>
        <thead>
          <tr>
            <th>業務名稱</th>
            <th>匯款性質別</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in currentPageItems" :key="item.id">
            <td>{{ item.value.paramType }}</td>
            <td>{{ item.value.paramValue }}</td>
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
          :totalItems="apToApIdList.length"
          @update:pageLimitSize="pageLimitSize = $event"
        />
      </div>
    </MCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import MCard from '@/components/common/MCard.vue';
import Pagination from '@/components/common/Pagination.vue';
import { usePagination } from '@/hook/usePagination';
import { useDialogStore } from '@/stores';
import { useFieldArray } from 'vee-validate';
import { genRandom } from '@/utils/RandomUtils';

const dialogStore = useDialogStore();

const selectedIds = ref<string[]>([]);
const selectAll = ref(false);

// 使用 apToApIdList 為資料來源
const {
  fields: apToApIdList,
  push,
  remove,
} = useFieldArray<any>('apToApIdList');

const pageLimitSize = ref(10);
const {
  totalPages,
  currentPageItems,
  renderPaginationNums,
  currentPage,
  nextPage,
  previousPage,
  goToPage,
} = usePagination<any>(apToApIdList, pageLimitSize);

// 全選判斷
const isAllSelected = computed(() => {
  const currentIds = currentPageItems.value.map((item: any) => item.id);
  return currentIds.every((id) => selectedIds.value.includes(id));
});

// 全選切換
const toggleSelectAll = () => {
  const currentIds = currentPageItems.value.map((item: any) => item.id);
  if (isAllSelected.value) {
    selectedIds.value = selectedIds.value.filter(
      (id) => !currentIds.includes(id)
    );
  } else {
    selectedIds.value = [...new Set([...selectedIds.value, ...currentIds])];
  }
};

// 自動更新 selectAll 狀態
watch([currentPageItems, selectedIds], () => {
  const currentIds = currentPageItems.value.map((item: any) => item.id);
  selectAll.value = currentIds.every((id) => selectedIds.value.includes(id));
});

// 新增項目
const handleAdd = async () => {
  const res = await dialogStore.openAddAPtoAPListDialog();

  if (res?.paramType && res?.paramValue) {
    const exists = apToApIdList.value.some(
      (item: any) =>
        item.paramType === res.paramType && item.paramValue === res.paramValue
    );
    if (exists) {
      await dialogStore.openInfoDialog({
        title: '提醒',
        message: '此連線設定已存在，請勿重複新增。',
      });
      return;
    }

    push({
      id: genRandom(32),
      paramType: res.paramType,
      paramValue: res.paramValue,
    });
  }
};

// 刪除選項
const handleDelete = () => {
  if (selectedIds.value.length === 0) {
    dialogStore.openInfoDialog({
      title: '提醒',
      message: '請先選擇要刪除的項目',
    });
    return;
  }

  for (let i = apToApIdList.value.length - 1; i >= 0; i--) {
    if (selectedIds.value.includes((apToApIdList.value[i] as any).id)) {
      remove(i);
    }
  }
  selectedIds.value = [];
};
</script>
