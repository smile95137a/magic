<template>
  <router-view></router-view>

  <AddIpListDialog v-if="dialogStore.isAddIpListDialogOpen" />
  <AddRelationMediaListDialog
    v-if="dialogStore.isAddRelationMediaListDialogOpen"
  />
  <AddBillerCodeIdListDialog
    v-if="dialogStore.isAddBillerCodeIdListDialogOpen"
  />
  <AddAPtoAPListDialog v-if="dialogStore.isAddAPtoAPListDialogOpen" />

  <SearchFnOptionDialog v-if="dialogStore.isSearchFnOptionDialogOpen" />
  <SearchFileTypeDialog v-if="dialogStore.isSearchFileTypeDialogOpen" />
  <SearchCompanyDialog v-if="dialogStore.isSearchCompanyDialogOpen" />

  <ConfirmDialog v-if="dialogStore.isConfirmDialogOpen" />
  <InfoDialog v-if="dialogStore.isInfoDialogOpen" />
  <LoadingMask v-if="loadingStore.isLoading" />
</template>

<script setup lang="ts">
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import InfoDialog from '@/components/common/InfoDialog.vue';
import LoadingMask from '@/components/common/LoadingMask.vue';
import { useDialogStore, useLoadingStore } from './stores';
import SearchCompanyDialog from './components/common/SearchCompanyDialog.vue';
import SearchFnOptionDialog from './components/common/SearchFnOptionDialog.vue';
import SearchFileTypeDialog from './components/common/SearchFileTypeDialog.vue';
import AddIpListDialog from '@/components/b01/b01001/AddIpListDialog.vue';
import AddRelationMediaListDialog from '@/components/b01/b01001/AddRelationMediaListDialog.vue';
import AddBillerCodeIdListDialog from '@/components/b01/b01001/AddBillerCodeIdListDialog.vue';
import AddAPtoAPListDialog from '@/components/b01/b01001/AddAPtoAPListDialog.vue';

const loadingStore = useLoadingStore();
const dialogStore = useDialogStore();
</script>

<style scoped>
.layout__body {
  display: flex;
}
.layout__main {
  flex: 1;
}
</style>
