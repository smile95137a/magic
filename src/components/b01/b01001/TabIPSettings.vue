<template>
  <div class="m-t-12">
    <MCard>
      <div class="flex m-b-16">
        <p class="form__text form__text--title">IP位址設定</p>
      </div>

      <MCard>
        <form class="form">
          <div class="flex m-b-16">
            <p class="form__text form__text--title">客戶基本資料</p>
          </div>

          <div class="flex flex-wrap">
            <div class="w-50 w-md-100 p-6">
              <p class="form__text form__text--red">是否檢核IP：</p>
              <div class="flex flex-column flex-1">
                <select
                  v-model="ipcheck"
                  class="mselect"
                  :class="{ 'error-border': errors.ipcheck }"
                >
                  <option value="">請選擇地區</option>
                  <option
                    v-for="item in ipCheckOptions"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </option>
                </select>
                <span class="error-text" v-if="errors.ipcheck">{{
                  errors.ipcheck
                }}</span>
              </div>
            </div>
          </div>
        </form>
      </MCard>
      <div v-if="ipCheckFlag" class="flex justify-end gap-x-12">
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
            <th>IP位址（起）</th>
            <th>IP位址（迄）</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in currentPageItems" :key="item.id">
            <td>
              <input type="checkbox" :value="item.id" v-model="selectedIds" />
            </td>
            <td>
              {{ item.ipStart }}
            </td>
            <td>
              {{ item.ipEnd }}
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
import { computed, onMounted, ref, watch } from 'vue';
import MCard from '@/components/common/MCard.vue';
import Pagination from '@/components/common/Pagination.vue';
import { usePagination } from '@/hook/usePagination';
import { useDialogStore, useLoadingStore } from '@/stores';
import { useFormContext } from 'vee-validate';
import {
  createCustomerIp,
  deleteCustomerIp,
  getCustomerIp,
  getIpcheckOptions,
} from '@/services/B01001Service';
import { applySettledResult } from '@/utils/ApplySettledResult';

const { defineField, errors } = useFormContext();
const [id] = defineField('id');
const [requestId] = defineField('requestId');
const [region] = defineField('region');
const [customerId] = defineField('customerId');
const [ipcheck] = defineField('ipcheck');

const loadingStore = useLoadingStore();
const dialogStore = useDialogStore();

const ipCheckOptions = ref<any[]>([]);
const list = ref<any[]>([]);
const selectedIds = ref<string[]>([]);
const selectAll = ref(false);
const pageLimitSize = ref(10);

const ipCheckFlag = computed(() => ipcheck.value === 'Y'); // 顯示表格控制

const {
  totalPages,
  currentPageItems,
  renderPaginationNums,
  currentPage,
  nextPage,
  previousPage,
  goToPage,
} = usePagination<any>(list, pageLimitSize);

// 選單載入
const loadSelectOptions = async () => {
  const [res1] = await Promise.allSettled([getIpcheckOptions()]);
  applySettledResult(res1, (x) => (ipCheckOptions.value = x), '是否檢核IP', []);
};

// 初始化資料
const loadData = async () => {
  try {
    const payload = {
      id: id.value,
      region: region.value,
      requestId: requestId.value,
      customerId: customerId.value,
    };
    const { success, data } = await getCustomerIp(payload);
    if (success) {
      list.value = data || [];
    } else {
      dialogStore.openInfoDialog({
        title: '錯誤',
        message: '載入 IP 資料失敗',
      });
    }
  } catch {
    dialogStore.openInfoDialog({
      title: '錯誤',
      message: '載入 IP 資料時發生錯誤，請稍後再試',
    });
  }
};

// 新增 IP 資料
const handleAdd = async () => {
  const res = await dialogStore.openAddIpListDialog();
  if (res?.ipStart && res?.ipEnd) {
    const payload = {
      ipStart: res.ipStart,
      ipEnd: res.ipEnd,
      id: id.value,
      region: region.value,
      requestId: requestId.value,
      customerId: customerId.value,
    };

    try {
      const { success } = await createCustomerIp(payload);
      if (success) {
        await loadData();
        dialogStore.openInfoDialog({
          title: '成功',
          message: '新增成功',
        });
      } else {
        dialogStore.openInfoDialog({
          title: '錯誤',
          message: '新增失敗，請稍後再試',
        });
      }
    } catch {
      dialogStore.openInfoDialog({
        title: '錯誤',
        message: '新增 API 呼叫失敗，請稍後再試',
      });
    }
  }
};

// 刪除
const handleDelete = async () => {
  if (selectedIds.value.length === 0) {
    dialogStore.openInfoDialog({
      title: '提醒',
      message: '請先選擇要刪除的項目',
    });
    return;
  }

  const payload = {
    id: id.value,
    region: region.value,
    requestId: requestId.value,
    customerId: customerId.value,
    checkIpIdList: selectedIds.value,
  };

  try {
    const { success } = await deleteCustomerIp(payload);
    if (success) {
      await loadData();
      dialogStore.openInfoDialog({
        title: '成功',
        message: '刪除成功',
      });
    } else {
      dialogStore.openInfoDialog({
        title: '錯誤',
        message: '刪除失敗',
      });
    }
  } catch {
    dialogStore.openInfoDialog({
      title: '錯誤',
      message: '刪除 API 呼叫失敗，請稍後再試',
    });
  }
};

// 全選切換
const isAllSelected = computed(() => {
  const currentIds = currentPageItems.value.map((item: any) => item.id);
  return currentIds.every((id) => selectedIds.value.includes(id));
});

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

watch([currentPageItems, selectedIds], () => {
  const currentIds = currentPageItems.value.map((item: any) => item.id);
  selectAll.value = currentIds.every((id) => selectedIds.value.includes(id));
});

onMounted(() => {
  loadSelectOptions();
  loadData();
});
</script>
