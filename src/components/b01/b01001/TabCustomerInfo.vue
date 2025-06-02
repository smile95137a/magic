<template>
  <MCard>
    <form class="form">
      <div class="flex m-b-16">
        <p class="form__text form__text--title">客戶基本資料</p>
      </div>

      <div class="flex flex-wrap">
        <div class="w-50 w-md-100 p-6">
          <p class="form__text">地區</p>
          <div class="flex flex-column flex-1">
            <select
              v-model="region"
              class="mselect"
              :class="{ 'error-border': errors.region }"
            >
              <option value="">請選擇地區</option>
              <option
                v-for="item in regionOptions"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
            <span class="error-text" v-if="errors.region">{{
              errors.region
            }}</span>
          </div>
        </div>

        <div class="w-50 w-md-100 p-6">
          <p class="form__text">客戶別：</p>
          <div class="flex flex-column flex-1">
            <select
              v-model="customerType"
              class="mselect"
              :class="{ 'error-border': errors.customerType }"
            >
              <option value="">請選擇客戶別</option>
              <option
                v-for="item in customerTypeOptions"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
            <span class="error-text" v-if="errors.customerType">{{
              errors.customerType
            }}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap">
        <div class="w-50 w-md-100 p-6">
          <p class="form__text">統一編號：</p>
          <div class="flex flex-column flex-1">
            <input
              v-model="code"
              class="minput"
              :class="{ 'error-border': errors.code }"
            />
            <span class="error-text" v-if="errors.code">{{ errors.code }}</span>
          </div>
        </div>

        <div class="w-50 w-md-100 p-6">
          <p class="form__text">公司名稱：</p>
          <div class="flex flex-column flex-1">
            <input
              v-model="name"
              class="minput"
              :class="{ 'error-border': errors.name }"
            />
            <span class="error-text" v-if="errors.name">{{ errors.name }}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap">
        <div class="w-100 w-md-100 p-6">
          <p class="form__text">通訊地址</p>
          <div class="flex gap-x-12">
            <div class="flex w-30 flex-column">
              <input
                v-model="postcode"
                class="minput"
                :class="{ 'error-border': errors.postcode }"
              />
              <span class="error-text" v-if="errors.postcode">{{
                errors.postcode
              }}</span>
            </div>
            <div class="flex flex-column flex-1">
              <input
                v-model="address"
                class="minput"
                :class="{ 'error-border': errors.address }"
              />
              <span class="error-text" v-if="errors.address">{{
                errors.address
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap">
        <div class="w-50 w-md-100 p-6">
          <p class="form__text">提供繳款人專區</p>
          <div class="flex flex-column flex-1">
            <select
              v-model="printable"
              class="mselect"
              :class="{ 'error-border': errors.printable }"
            >
              <option value="">全部</option>
              <option
                v-for="item in printableOptions"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
            <span class="error-text" v-if="errors.printable">{{
              errors.printable
            }}</span>
          </div>
        </div>

        <div class="w-100 w-md-100 p-6">
          <p class="form__text">網銀客戶</p>
          <div class="flex flex-column flex-1">
            <select
              v-model="ssoUser"
              class="mselect"
              :class="{ 'error-border': errors.ssoUser }"
            >
              <option value="">請選擇</option>
              <option
                v-for="item in SSOUserOptions"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
            <span class="error-text" v-if="errors.ssoUser">{{
              errors.ssoUser
            }}</span>

            <span
              >備註：客戶為網銀客戶時,
              不可由系統登入，故不製發密碼函。網銀客戶改為非網銀客戶時，主管放行後，公司項下所有使用者皆需進行密碼函重製作業。</span
            >
          </div>
        </div>
      </div>
    </form>
  </MCard>
  <div class="m-t-12">
    <MCard>
      <div class="flex m-b-16">
        <p class="form__text form__text--title">企業識別碼</p>
      </div>

      <div class="flex justify-end gap-x-12">
        <button class="mbtn" type="button" @click="handleAdd">新增</button>
        <button class="mbtn" type="button" @click="handleDelete">刪除</button>
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
            <th>企業識別碼</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in currentPageItems" :key="item.id">
            <td>
              <input type="checkbox" :value="item.id" v-model="selectedIds" />
            </td>
            <td>{{ item.billerCode }}</td>
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

  <div class="m-t-12">
    <MCard>
      <div class="flex flex-wrap">
        <div class="w-33 w-md-100 p-6">
          <p class="form__text">總批數 ：</p>
          <div class="flex flex-column flex-1">0</div>
        </div>
        <div class="w-33 w-md-100 p-6">
          <p class="form__text">總筆數 ：</p>
          <div class="flex flex-column flex-1">0</div>
        </div>
        <div class="w-34 w-md-100 p-6">
          <p class="form__text">總金額 ：</p>
          <div class="flex flex-column flex-1">0</div>
        </div>
      </div>
    </MCard>
  </div>
</template>
<script setup lang="ts">
import MCard from '@/components/common/MCard.vue';
import Pagination from '@/components/common/Pagination.vue';
import { onMounted, ref, computed, watch } from 'vue';
import { usePagination } from '@/hook/usePagination';
import { genRandom } from '@/utils/RandomUtils';
import {
  createCustomerBillerCode,
  deleteCustomerBillerCode,
  getCustomerBillerCode,
  getCustomerTypeOptions,
  getPrintableOptions,
  getRegionOptions,
  getSsoUserOptions,
} from '@/services/B01001Service';
import { applySettledResult } from '@/utils/ApplySettledResult';
import { useFieldArray, useFormContext } from 'vee-validate';
import { useLoadingStore, useDialogStore } from '@/stores';

const loadingStore = useLoadingStore();
const dialogStore = useDialogStore();

const regionOptions = ref<any[]>([]);
const customerTypeOptions = ref<any[]>([]);
const printableOptions = ref<any[]>([]);
const SSOUserOptions = ref<any[]>([]);

const loadSelectOptions = async () => {
  const [res1, res2, res3, res4] = await Promise.allSettled([
    getRegionOptions(),
    getCustomerTypeOptions(),
    getPrintableOptions(),
    getSsoUserOptions(),
  ]);

  applySettledResult(res1, (x) => (regionOptions.value = x), '地區', []);
  applySettledResult(
    res2,
    (x) => (customerTypeOptions.value = x),
    '客戶別',
    []
  );
  applySettledResult(
    res3,
    (x) => (printableOptions.value = x),
    '提供繳款人專區',
    []
  );
  applySettledResult(res4, (x) => (SSOUserOptions.value = x), '網銀客戶', []);
};

onMounted(() => {
  loadSelectOptions();
});

const { defineField, errors } = useFormContext();
const [id] = defineField('id');
const [requestId] = defineField('requestId');
const [customerId] = defineField('customerId');

const [region] = defineField('region');
const [customerType] = defineField('customerType');
const [code] = defineField('code');
const [name] = defineField('name');
const [postcode] = defineField('postcode');
const [address] = defineField('address');
const [printable] = defineField('printable');
const [ssoUser] = defineField('ssoUser');

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

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedIds.value = currentPageItems.value.map((item: any) => item.id);
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

const loadData = async () => {
  try {
    const payload = {
      id: id.value,
      region: region.value,
      requestId: requestId.value,
      customerId: customerId.value,
    };

    const { success, data } = await getCustomerBillerCode(payload);
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

const handleAdd = async () => {
  const res = await dialogStore.openAddBillerCodeIdListDialog();

  if (res && res.billerCode) {
    const payload = {
      billerCode: res.billerCode,
      id: id.value,
      region: region.value,
      requestId: requestId.value,
      customerId: customerId.value,
    };

    try {
      const { success } = await createCustomerBillerCode(payload);
      if (success) {
        await loadData(); // 重新載入資料
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
      title: '系統提示',
      message: '請先勾選要刪除的資料',
    });
    return;
  }

  const confirmed = await dialogStore.openConfirmDialog({
    title: '確認刪除',
    message: '確定要刪除所選的企業識別碼嗎？',
  });

  if (!confirmed) return;

  try {
    const payload = {
      id: id.value,
      region: region.value,
      requestId: requestId.value,
      customerId: customerId.value,
      billerCodeIdList: selectedIds.value, // 假設後端接受此欄位為刪除列表
    };

    const { success } = await deleteCustomerBillerCode(payload);
    if (success) {
      dialogStore.openInfoDialog({
        title: '成功',
        message: '刪除成功',
      });
      await loadData(); // 重新載入資料
    } else {
      dialogStore.openInfoDialog({
        title: '錯誤',
        message: '刪除失敗，請稍後再試',
      });
    }
  } catch (error) {
    dialogStore.openInfoDialog({
      title: '錯誤',
      message: '呼叫刪除 API 失敗，請稍後再試',
    });
  }
};

// 統計數值
const totalCount = computed(() => list.value.length);
const totalBatch = computed(() => 1); // 可依邏輯分批
const totalAmount = computed(() =>
  list.value.reduce((sum, item) => sum + (item.value.amount || 0), 0)
);
</script>
