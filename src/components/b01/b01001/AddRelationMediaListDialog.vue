<template>
  <Dialog
    :isOpen="isOpen"
    :customClass="`${customClass} dialog--addRelationMediaList`"
    @close="handleClose"
  >
    <div class="addRelationMediaListDialog">
      <div class="addRelationMediaListDialog__main">
        <div class="addRelationMediaListDialog__main-content">
          <MCard>
            <form class="form">
              <div class="flex m-b-16">
                <p class="form__text form__text--title">功能與角色權限設定</p>
              </div>
              <div class="flex flex-wrap">
                <div class="w-50 w-md-100 p-6">
                  <p class="form__text">地區</p>
                  <div class="flex flex-column flex-1">TW-台灣</div>
                </div>

                <div class="w-50 w-md-100 p-6">
                  <p class="form__text">關係企業名稱</p>
                  <div class="flex flex-1">
                    <div class="flex flex-column flex-1">
                      <select
                        v-model="relCustomerId"
                        class="mselect"
                        :class="{ 'error-border': errors.relCustomerId }"
                      >
                        <option value=""></option>

                        <option
                          v-for="item in relCustomerOptions"
                          :key="item.value"
                          :value="item.value"
                        >
                          {{ item.label }}
                        </option>
                      </select>
                      <span class="error-text" v-if="errors.relCustomerId">{{
                        errors.relCustomerId
                      }}</span>
                    </div>
                    <div
                      class="flex items-center p-x-12"
                      @click="searchCompanyId"
                    >
                      <i class="fas fa-search m-r-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </MCard>
          <div class="flex justify-end gap-x-12 m-t-12">
            <button type="button" :class="['mbtn']" @click="handleConfirm">
              確定
            </button>
            <button type="button" :class="['mbtn']" @click="goBack">
              返回
            </button>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from '@/components/common/Dialog.vue';
import { useDialogStore } from '@/stores/dialogStore';
import { onMounted, ref, computed } from 'vue';
import { useForm } from 'vee-validate';
import { useLoadingStore } from '@/stores';
import MCard from '@/components/common/MCard.vue';
import Pagination from '@/components/common/Pagination.vue';
import NoData from '@/components/common/NoData.vue';
import { usePagination } from '@/hook/usePagination';
import {
  getCustomerIdOptions,
  queryCustomerName,
} from '@/services/B01001Service';

const dialogStore = useDialogStore();

const isOpen = computed(() => dialogStore.isAddRelationMediaListDialogOpen);
const customClass = computed(() => dialogStore.addRelationMediaListCustomClass);
const addRelationMediaListDialogOptions = computed(
  () => dialogStore.addRelationMediaListDialogOptions
);

const relCustomerOptions = ref<{ label: string; value: string }[]>([]);

const fetchInitialData = async () => {
  try {
    loadingStore.startLoading();
    const { success, data } = await getCustomerIdOptions();
    loadingStore.stopLoading();
    if (success) {
      relCustomerOptions.value = data || [];
    }
  } catch (error) {
    console.error('Error fetching initial data:', error);
  }
};

onMounted(fetchInitialData);

const handleClose = () => {
  dialogStore.closeAddRelationMediaListDialog(false);
};

//
const loadingStore = useLoadingStore();

// list

// Form handling module
const { defineField, errors } = useForm({
  initialValues: {
    relCustomerId: '',
  },
});
const [relCustomerId] = defineField('relCustomerId');

const searchCompanyId = async () => {
  const res = await dialogStore.openSearchCompanyDialog({
    queryFn: queryCustomerName,
  });
  if (res) {
    relCustomerId.value = res;
  }
};

const handleConfirm = async () => {
  if (!relCustomerId.value) {
    await dialogStore.openInfoDialog({
      title: '提醒',
      message: '請先選擇關係企業名稱',
    });
    return;
  }

  const selected = relCustomerOptions.value.find(
    (item: any) => item.value === relCustomerId.value
  );

  const selectedLabel = selected?.label || relCustomerId.value;

  const confirm = await dialogStore.openConfirmDialog({
    title: '提示訊息',
    message: `請確認是否要與「${selectedLabel}」建立關係戶？`,
  });

  if (!confirm) return;

  dialogStore.closeAddRelationMediaListDialog({
    companyId: relCustomerId.value,
    companyName: selectedLabel,
  });
};

const goBack = () => {
  handleClose();
};
</script>
