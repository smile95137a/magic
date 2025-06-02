<template>
  <Dialog
    :isOpen="isOpen"
    :customClass="`${customClass} dialog--addAPtoAPList`"
    @close="handleClose"
  >
    <div class="addAPtoAPListDialog">
      <div class="addAPtoAPListDialog__main">
        <div class="addAPtoAPListDialog__main-content">
          <MCard>
            <form class="form">
              <div class="flex m-b-16">
                <p class="form__text form__text--title">AP to AP連線設定</p>
              </div>
              <div class="flex flex-wrap">
                <div class="w-50 w-md-100 p-6">
                  <p class="form__text">系統連線類別</p>
                  <div class="flex flex-column flex-1">
                    <select
                      v-model="paramType"
                      class="mselect"
                      :class="{ 'error-border': errors.paramType }"
                    >
                      <option value="">請選擇系統連線類別</option>
                      <option
                        v-for="item in paramTypeOptions"
                        :key="item.value"
                        :value="item.value"
                      >
                        {{ item.label }}
                      </option>
                    </select>
                    <span class="error-text" v-if="errors.paramType">
                      {{ errors.paramType }}
                    </span>
                  </div>
                </div>

                <div class="w-50 w-md-100 p-6">
                  <p class="form__text">連線參數</p>
                  <div class="flex flex-column flex-1">
                    <input
                      v-model="paramValue"
                      type="text"
                      class="minput"
                      :class="{ 'error-border': errors.paramValue }"
                    />
                    <span class="error-text" v-if="errors.paramValue">
                      {{ errors.paramValue }}
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </MCard>

          <div class="flex justify-end gap-x-12 m-t-12">
            <button type="button" class="mbtn" @click="handleConfirm">
              確定
            </button>
            <button type="button" class="mbtn" @click="goBack">返回</button>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Dialog from '@/components/common/Dialog.vue';
import MCard from '@/components/common/MCard.vue';
import { useDialogStore } from '@/stores/dialogStore';
import { useLoadingStore } from '@/stores/loadingStore';
import { useForm } from 'vee-validate';
import { getParamTypeOptions } from '@/services/B01001Service';

const dialogStore = useDialogStore();
const loadingStore = useLoadingStore();

const isOpen = computed(() => dialogStore.isAddAPtoAPListDialogOpen);
const customClass = computed(() => dialogStore.addAPtoAPListDialogCustomClass);

// 下拉選項資料
const paramTypeOptions = ref<{ label: string; value: string }[]>([]);

// 表單欄位與驗證
const { defineField, errors, handleSubmit } = useForm({
  initialValues: {
    paramType: '',
    paramValue: '',
  },
});
const [paramType] = defineField('paramType');
const [paramValue] = defineField('paramValue');

// 初始載入下拉資料
const fetchInitialData = async () => {
  try {
    loadingStore.startLoading();
    const { success, data } = await getParamTypeOptions();
    if (success) paramTypeOptions.value = data || [];
  } catch (error) {
    console.error('Error loading paramTypeOptions:', error);
  } finally {
    loadingStore.stopLoading();
  }
};
onMounted(fetchInitialData);

// 送出
const handleConfirm = handleSubmit((values) => {
  dialogStore.closeAddAPtoAPListDialog({
    paramType: values.paramType,
    paramValue: values.paramValue,
  });
});

// 返回
const handleClose = () => {
  dialogStore.closeAddAPtoAPListDialog(false);
};
const goBack = () => handleClose();
</script>
