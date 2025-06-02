<template>
  <Dialog
    :isOpen="isOpen"
    :customClass="`${customClass} dialog--addIpList`"
    @close="handleClose"
  >
    <div class="addIpListDialog">
      <div class="addIpListDialog__main">
        <div class="addIpListDialog__main-content">
          <MCard>
            <form class="form">
              <div class="flex m-b-16">
                <p class="form__text form__text--title">功能與角色權限設定</p>
              </div>
              <div class="flex flex-wrap">
                <div class="w-50 w-md-100 p-6">
                  <p class="form__text">IP位址(起)</p>
                  <div class="flex flex-column flex-1">
                    <input
                      v-model="ipStart"
                      type="text"
                      class="minput"
                      :class="{ 'error-border': errors.ipStart }"
                    />
                    <span class="error-text" v-if="errors.ipStart">{{
                      errors.ipStart
                    }}</span>
                  </div>
                </div>
                <div class="w-50 w-md-100 p-6">
                  <p class="form__text">IP位址(迄)</p>
                  <div class="flex flex-column flex-1">
                    <input
                      v-model="ipEnd"
                      type="text"
                      class="minput"
                      :class="{ 'error-border': errors.ipEnd }"
                    />
                    <span class="error-text" v-if="errors.ipEnd">{{
                      errors.ipEnd
                    }}</span>
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
import { getCustomerIdOptions } from '@/services/B01001Service';

const dialogStore = useDialogStore();

const isOpen = computed(() => dialogStore.isAddIpListDialogOpen);
const customClass = computed(() => dialogStore.addIpListCustomClass);
const addIpListDialogOptions = computed(
  () => dialogStore.addIpListDialogOptions
);

const handleClose = () => {
  dialogStore.closeAddIpListDialog(false);
};

//
const loadingStore = useLoadingStore();

// list

// Form handling module
const { defineField, errors } = useForm({
  initialValues: {
    ipStart: '',
    ipEnd: '',
  },
});
const [ipStart] = defineField('ipStart');
const [ipEnd] = defineField('ipEnd');

const handleConfirm = async () => {
  dialogStore.closeAddIpListDialog({
    ipStart: ipStart.value,
    ipEnd: ipEnd.value,
  });
};

const goBack = () => {
  handleClose();
};
</script>
