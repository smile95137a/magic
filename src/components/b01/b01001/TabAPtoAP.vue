<template>
  <div class="m-t-12">
    <MCard>
      <div class="flex m-b-16">
        <p class="form__text form__text--title">AP to AP連線設定</p>
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
            <th>系統連線類別</th>
            <th>連線參數</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in currentPageItems" :key="index">
            <td>
              <input type="checkbox" :value="item.id" v-model="selectedIds" />
            </td>
            <td>{{ item.paramType }}</td>
            <td>{{ item.paramValue }}</td>
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
import { ref, computed, watch, onMounted } from 'vue';
import MCard from '@/components/common/MCard.vue';
import Pagination from '@/components/common/Pagination.vue';
import { usePagination } from '@/hook/usePagination';
import { useDialogStore } from '@/stores';
import { useFormContext } from 'vee-validate';
import {
  createCustomerApToAp,
  deleteCustomerApToAp,
  getCustomerApToAp,
} from '@/services/B01001Service';

const { defineField } = useFormContext();
const [id] = defineField('id');
const [requestId] = defineField('requestId');
const [region] = defineField('region');
const [customerId] = defineField('customerId');

const dialogStore = useDialogStore();

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

// ✅ 初始化與重載用
const loadData = async () => {
  try {
    const payload = {
      id: id.value,
      region: region.value,
      requestId: requestId.value,
      customerId: customerId.value,
    };

    const { success, data } = await getCustomerApToAp(payload);
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

// ✅ 新增
const handleAdd = async () => {
  const res = await dialogStore.openAddAPtoAPListDialog();
  if (res?.paramType && res?.paramValue) {
    const payload = {
      paramType: res.paramType,
      paramValue: res.paramValue,
      id: id.value,
      region: region.value,
      requestId: requestId.value,
      customerId: customerId.value,
    };

    try {
      const { success } = await createCustomerApToAp(payload);
      if (success) {
        await loadData(); // 重新取得資料
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
    } catch (error) {
      dialogStore.openInfoDialog({
        title: '錯誤',
        message: '呼叫 API 失敗，請稍後再試',
      });
    }
  }
};

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
    checkApToApIdList: selectedIds.value,
  };

  try {
    const { success } = await deleteCustomerApToAp(payload);
    if (success) {
      await loadData();
      dialogStore.openInfoDialog({
        title: '成功',
        message: '刪除成功',
      });
    } else {
      dialogStore.openInfoDialog({
        title: '錯誤',
        message: '刪除失敗，請稍後再試',
      });
    }
  } catch (error) {
    dialogStore.openInfoDialog({
      title: '錯誤',
      message: '刪除 API 呼叫失敗，請稍後再試',
    });
  } finally {
    selectedIds.value = [];
  }
};

onMounted(() => {
  loadData();
});
</script>
