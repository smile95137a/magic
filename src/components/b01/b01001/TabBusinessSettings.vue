<template>
  <div class="m-t-12">
    <MCard>
      <div class="flex m-b-16">
        <p class="form__text form__text--title">業務設定</p>
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
            <th>業務名稱</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in currentPageItems" :key="item.bizcode">
            <td>
              <input
                type="checkbox"
                :value="item.bizcode"
                v-model="selectedIds"
              />
            </td>
            <td>{{ item.bizname }}</td>
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
import { onMounted, ref, watch } from 'vue';
import MCard from '@/components/common/MCard.vue';
import Pagination from '@/components/common/Pagination.vue';
import { usePagination } from '@/hook/usePagination';
import { useLoadingStore } from '@/stores';
import { useFormContext } from 'vee-validate';
import { getCustomerBusiness } from '@/services/B01001Service';

const loadingStore = useLoadingStore();
const { defineField } = useFormContext();
const [id] = defineField('id');
const [requestId] = defineField('requestId');
const [region] = defineField('region');
const [customerId] = defineField('customerId');
const [checkBusinessBizcodeList] = defineField('checkBusinessBizcodeList');

const list = ref([]);
const selectedIds = ref<string[]>([]);
const selectAll = ref(false);

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

const loadCustomerBusiness = async () => {
  try {
    loadingStore.startLoading();
    const payload = {
      id: id.value,
      region: region.value,
      requestId: requestId.value,
      customerId: customerId.value,
    };

    const res = await getCustomerBusiness(payload);
    loadingStore.stopLoading();
    if (res.success) {
      list.value = res.data;
    }
  } catch (error) {
    loadingStore.stopLoading();
    console.error('載入客戶業務設定失敗', error);
  }
};

const toggleSelectAll = () => {
  const currentIds = currentPageItems.value.map((item: any) => item.id);
  if (selectAll.value) {
    selectedIds.value = selectedIds.value.filter(
      (id) => !currentIds.includes(id)
    );
  } else {
    selectedIds.value = [...new Set([...selectedIds.value, ...currentIds])];
  }
  checkSelectAll();
};

const checkSelectAll = () => {
  const currentIds = currentPageItems.value.map((item: any) => item.id);
  selectAll.value =
    currentIds.length > 0 &&
    currentIds.every((id) => selectedIds.value.includes(id));
};

onMounted(() => {
  loadCustomerBusiness();
});

watch(selectedIds, () => {
  checkSelectAll();
});
watch(currentPageItems, () => {
  checkSelectAll();
});

watch(selectedIds, () => {
  checkSelectAll();
  checkBusinessBizcodeList.value = selectedIds.value; // ✅ 直接指派值
});
</script>
