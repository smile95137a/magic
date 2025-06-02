<template>
  <div class="m-t-12">
    <MCard>
      <div class="flex m-b-16">
        <p class="form__text form__text--title">關係企業授權媒體</p>
      </div>

      <div class="flex justify-end gap-x-12">
        <button class="mbtn" @click="handleAdd">新增</button>
        <button class="mbtn" @click="handleDelete">刪除</button>
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
            <th>關係企業名稱</th>
            <th>授權媒體清單</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in currentPageItems" :key="item.key">
            <td>
              <input
                type="checkbox"
                :value="item.value.companyId"
                v-model="selectedIds"
              />
            </td>
            <td>{{ item.value.companyName }}</td>
            <td>{{ item.value.mediaList?.join(', ') || '尚未設定' }}</td>
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
          :totalItems="customerRelationFilesIdList.length"
          @update:pageLimitSize="pageLimitSize = $event"
        />
      </div>
    </MCard>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import MCard from '@/components/common/MCard.vue';
import Pagination from '@/components/common/Pagination.vue';
import { usePagination } from '@/hook/usePagination';
import { useDialogStore, useLoadingStore } from '@/stores';
import { useFieldArray, useFormContext } from 'vee-validate';

const dialogStore = useDialogStore();
const loadingStore = useLoadingStore();

const selectAll = ref(false);
const selectedIds = ref<string[]>([]);

const {
  fields: customerRelationFilesIdList,
  push,
  remove,
} = useFieldArray<any>('customerRelationFilesIdList');

// pagination 綁定 customerRelationFilesIdList
const pageLimitSize = ref(10);
const {
  totalPages,
  currentPageItems,
  renderPaginationNums,
  currentPage,
  nextPage,
  previousPage,
  goToPage,
} = usePagination<any>(customerRelationFilesIdList, pageLimitSize);

// 判斷是否全選
const isAllSelected = computed(() => {
  const currentIds = currentPageItems.value.map(
    (item: any) => item.value.companyId
  );
  return (
    currentIds.length > 0 &&
    currentIds.every((id) => selectedIds.value.includes(id))
  );
});

// 全選切換
const toggleSelectAll = () => {
  const currentIds = currentPageItems.value.map(
    (item: any) => item.value.companyId
  );
  if (isAllSelected.value) {
    selectedIds.value = selectedIds.value.filter(
      (id) => !currentIds.includes(id)
    );
  } else {
    selectedIds.value = [...new Set([...selectedIds.value, ...currentIds])];
  }
};

// 自動同步 checkbox 勾選狀態
watch(currentPageItems, () => {
  const currentIds = currentPageItems.value.map(
    (item: any) => item.value.companyId
  );
  selectAll.value =
    currentIds.length > 0 &&
    currentIds.every((id) => selectedIds.value.includes(id));
});
watch(selectedIds, () => {
  const currentIds = currentPageItems.value.map(
    (item: any) => item.value.companyId
  );
  selectAll.value =
    currentIds.length > 0 &&
    currentIds.every((id) => selectedIds.value.includes(id));
});

// 新增一筆
const handleAdd = async () => {
  const res = await dialogStore.openAddRelationMediaListDialog();
  if (res) {
    const exists = customerRelationFilesIdList.value.some(
      (item: any) => item.value.companyId === res.companyId
    );

    if (exists) {
      await dialogStore.openInfoDialog({
        title: '提醒',
        message: `「${res.companyName}」已存在於清單中，無法重複新增。`,
      });
      return;
    }

    const newItem = {
      key: crypto.randomUUID(),
      companyId: res.companyId,
      companyName: res.companyName,
      mediaList: res.mediaList || [],
    };

    push(newItem);
  }
};

// 刪除選取
const handleDelete = () => {
  if (selectedIds.value.length === 0) {
    dialogStore.openInfoDialog({
      title: '提醒',
      message: '請先選擇要刪除的項目',
    });
    return;
  }

  [...selectedIds.value].reverse().forEach((companyId) => {
    const index = customerRelationFilesIdList.value.findIndex(
      (item: any) => item.companyId === companyId
    );
    if (index !== -1) remove(index);
  });

  selectedIds.value = [];
};
</script>
