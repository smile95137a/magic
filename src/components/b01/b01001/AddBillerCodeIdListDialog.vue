<template>
  <Dialog
    :isOpen="isOpen"
    :customClass="`${customClass} dialog--addBillerCodeIdList`"
    @close="handleClose"
  >
    <div class="addBillerCodeIdListDialog">
      <div class="addBillerCodeIdListDialog__main">
        <div class="addBillerCodeIdListDialog__main-content">
          <MCard>
            <form class="form">
              <div class="flex m-b-16">
                <p class="form__text form__text--title">企業識別碼</p>
              </div>
              <div class="flex flex-wrap">
                <div class="w-100 p-6">
                  <p class="form__text">企業識別碼</p>
                  <div class="flex flex-column flex-1">
                    <input
                      v-model="billerCode"
                      type="text"
                      class="minput"
                      :class="{ 'error-border': errors.billerCode }"
                    />
                    <span class="error-text" v-if="errors.billerCode">
                      {{ errors.billerCode }}
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
import Dialog from '@/components/common/Dialog.vue';
import MCard from '@/components/common/MCard.vue';
import { computed } from 'vue';
import { useForm } from 'vee-validate';
import { useDialogStore } from '@/stores/dialogStore';

const dialogStore = useDialogStore();

const isOpen = computed(() => dialogStore.isAddBillerCodeIdListDialogOpen);
const customClass = computed(() => dialogStore.addBillerCodeIdListCustomClass);

const handleClose = () => {
  dialogStore.closeAddBillerCodeIdListDialog(false);
};

// 表單邏輯
const { defineField, errors, validate } = useForm({
  initialValues: {
    billerCode: '',
  },
});
const [billerCode] = defineField('billerCode');

// 確認按鈕邏輯
const handleConfirm = async () => {
  const result = await validate();
  if (!result.valid) return;

  const confirm = await dialogStore.openConfirmDialog({
    title: '提示訊息',
    message: `請確認是否要新增「${billerCode.value}」企業識別碼？`,
  });

  if (!confirm) return;

  dialogStore.closeAddBillerCodeIdListDialog({
    billerCode: billerCode.value,
  });
};

const goBack = () => {
  handleClose();
};
</script>
