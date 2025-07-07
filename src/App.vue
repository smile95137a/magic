<template>
  <router-view></router-view>

  <LoadingMask v-if="loadingStore.isLoading" />
  <InfoDialog v-if="dialogStore.isInfoDialogOpen" />
  <ConfirmDialog v-if="dialogStore.isConfirmDialogOpen" />
  <PoeDivinationDialog v-if="dialogStore.isPoeDivinationDialogOpen" />
  <LoadingMask v-if="loadingStore.isLoading" />
</template>

<script setup lang="ts">
import InfoDialog from '@/components/common/InfoDialog.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import PoeDivinationDialog from '@/components/common/PoeDivinationDialog.vue';
import LoadingMask from '@/components/common/LoadingMask.vue';
import { useDialogStore } from './stores/dialogStore';
import { useLoadingStore } from './stores/loadingStore';


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
