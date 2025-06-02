<template>
  <Dialog
    :isOpen="isOpen"
    :customClass="`${customClass} dialog--searchFileType`"
    @close="handleClose"
  >
    <div class="searchFileTypeDialog">
      <div class="searchFileTypeDialog__main">
        <div class="searchFileTypeDialog__main-content">
          <MCard>
            <form class="form" @submit.prevent="onSubmit">
              <div class="flex m-b-16">
                <p class="form__text form__text--title">功能與角色權限設定</p>
              </div>

              <div class="flex flex-wrap">
                <div class="w-50 w-md-100 p-6">
                  <p class="form__text">地區</p>
                  <div class="flex flex-column flex-1">全部</div>
                </div>
                <div class="w-50 w-md-100 p-6">
                  <p class="form__text">媒體名稱</p>
                  <div class="flex flex-column flex-1">
                    <input
                      v-model="fileTypeName"
                      type="text"
                      class="minput"
                      :class="{ 'error-border': errors.fileTypeName }"
                    />
                    <span class="error-text" v-if="errors.fileTypeName">{{
                      errors.fileTypeName
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="flex justify-center m-y-8">
                <button type="submit" :class="['mbtn']">查詢</button>
              </div>
            </form>
          </MCard>

          <div class="m-t-12">
            <MCard>
              <NoData v-if="list.length === 0" />
              <div v-else>
                <table>
                  <thead>
                    <tr>
                      <th>公司名稱</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in currentPageItems" :key="item.value">
                      <td>
                        <span
                          @click="handleChoose(item.value)"
                          class="clickable"
                        >
                          {{ item.label }}
                        </span>
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
              </div>
            </MCard>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from './Dialog.vue';
import { useDialogStore } from '@/stores/dialogStore';
import { onMounted, ref, computed } from 'vue';
import { useForm } from 'vee-validate';
import { useLoadingStore } from '@/stores';
import MCard from '@/components/common/MCard.vue';
import Pagination from '@/components/common/Pagination.vue';
import NoData from '@/components/common/NoData.vue';
import { usePagination } from '@/hook/usePagination';

const dialogStore = useDialogStore();

const isOpen = computed(() => dialogStore.isSearchFileTypeDialogOpen);
const customClass = computed(() => dialogStore.searchFileTypeCustomClass);
const searchFileTypeDialogOptions = computed(
  () => dialogStore.searchFileTypeDialogOptions
);

const handleClose = () => {
  dialogStore.closeSearchFileTypeDialog(false);
};

//
const loadingStore = useLoadingStore();

// list
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

const fetchInitialData = async () => {
  try {
  } catch (error) {
    console.error('Error fetching initial data:', error);
  }
};
onMounted(fetchInitialData);

// Form handling module
const { defineField, handleSubmit, errors, values } = useForm({
  initialValues: {
    fileTypeName: '',
  },
});
const [fileTypeName] = defineField('fileTypeName');

const onSubmit = handleSubmit(async (values) => {
  try {
    loadingStore.startLoading();

    const queryFn = searchFileTypeDialogOptions.value?.queryFn;
    if (typeof queryFn !== 'function') {
      throw new Error('查詢函式未提供');
    }

    const { success, data } = await queryFn(values);
    loadingStore.stopLoading();

    if (success) {
      list.value = data;
    }
  } catch (error) {
    loadingStore.stopLoading();
    console.error('Error querying data:', error);
  }
});

const handleChoose = (companyId: string) => {
  dialogStore.closeSearchFileTypeDialog(companyId);
};
</script>
