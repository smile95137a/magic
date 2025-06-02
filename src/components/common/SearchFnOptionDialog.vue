<template>
  <Dialog
    :isOpen="isOpen"
    :customClass="`${customClass} dialog--searchFnOption`"
    @close="handleClose"
  >
    <div class="searchFnOptionDialog">
      <div class="searchFnOptionDialog__main">
        <div class="searchFnOptionDialog__main-content">
          <MCard>
            <form class="form" @submit.prevent="onSubmit">
              <div class="flex flex-wrap">
                <div class="w-50 w-md-100 p-6">
                  <p class="form__text">功能編號</p>
                  <div class="flex flex-column flex-1">
                    <input
                      v-model="menuId"
                      class="minput"
                      :class="{ 'error-border': errors.menuId }"
                    />
                    <span class="error-text" v-if="errors.menuId">{{
                      errors.menuId
                    }}</span>
                  </div>
                </div>
                <div class="w-50 w-md-100 p-6">
                  <p class="form__text">功能名稱</p>
                  <div class="flex flex-column flex-1">
                    <input
                      v-model="menuName"
                      class="minput"
                      :class="{ 'error-border': errors.menuName }"
                    />
                    <span class="error-text" v-if="errors.menuName">{{
                      errors.menuName
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
                      <th>功能編號</th>
                      <th>功能名稱</th>
                      <th>排列順序</th>
                      <th>父功能編號</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in currentPageItems" :key="item.menuId">
                      <td>
                        <span
                          @click="handleChoose(item.menuId)"
                          class="clickable"
                        >
                          {{ item.menuId }}
                        </span>
                      </td>
                      <td>{{ item.menuName }}</td>
                      <td>{{ item.orderNum }}</td>
                      <td>{{ item.parentId }}</td>
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

const isOpen = computed(() => dialogStore.isSearchFnOptionDialogOpen);
const customClass = computed(() => dialogStore.searchFnOptionDialogCustomClass);
const searchFnOptionDialogOptions = computed(
  () => dialogStore.searchFnOptionDialogOptions
);

const handleClose = () => {
  dialogStore.closeSearchFnOptionDialog(false);
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
const { defineField, handleSubmit, errors } = useForm({
  initialValues: {
    menuId: '',
    menuName: '',
  },
});
const [menuId] = defineField('menuId');
const [menuName] = defineField('menuName');

const onSubmit = handleSubmit(async (values) => {
  try {
    loadingStore.startLoading();

    const queryFn = searchFnOptionDialogOptions.value?.queryFn;
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

const handleChoose = (menuId: string) => {
  dialogStore.closeSearchFnOptionDialog(menuId);
};
</script>
