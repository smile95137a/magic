<template>
  <div class="m-t-12">
    <MCard>
      <div class="flex m-b-16">
        <p class="form__text form__text--title">繳費單管理設定</p>
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
            <th>繳費單處理條件</th>
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
import { ref, onMounted, watch } from 'vue';
import MCard from '@/components/common/MCard.vue';
import Pagination from '@/components/common/Pagination.vue';
import { usePagination } from '@/hook/usePagination';
import { useDialogStore, useLoadingStore } from '@/stores';
import { useFieldArray, useFormContext } from 'vee-validate';
import { getCustomerPaySetting } from '@/services/B01001Service';
const { defineField, values } = useFormContext();

const [id] = defineField('id');
const [requestId] = defineField('requestId');
const [region] = defineField('region');
const [customerId] = defineField('customerId');

const dialogStore = useDialogStore();

const loadingStore = useLoadingStore();

const selectedIds = ref<string[]>([]);
const selectAll = ref(false);
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

const loadData = async () => {
  try {
    const payload = {
      id: id.value,
      region: region.value,
      requestId: requestId.value,
      customerId: customerId.value,
    };

    const { success, data } = await getCustomerPaySetting(payload);
    if (success) {
      list.value = data || [];
    } else {
      dialogStore.openInfoDialog({
        title: '錯誤',
        message: '載入 AP to AP 資料失敗',
      });
    }
  } catch (error) {
    dialogStore.openInfoDialog({
      title: '錯誤',
      message: '取得 AP to AP 資料失敗，請稍後再試',
    });
  }
};

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedIds.value = currentPageItems.value.map(
      (item: any) => item.value.companyId
    );
  } else {
    selectedIds.value = [];
  }
};

watch(selectedIds, () => {
  const currentIds = currentPageItems.value.map(
    (item: any) => item.value.companyId
  );
  selectAll.value = currentIds.every((id) => selectedIds.value.includes(id));
});

onMounted(() => {
  loadData();
});
</script>
