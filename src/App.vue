<template>
  <router-view></router-view>

  <LoadingMask v-if="loadingStore.isLoading" />
  <PoeDivinationDialog v-if="dialogStore.isPoeDivinationDialogOpen" />
  <LoadingMask v-if="loadingStore.isLoading" />
</template>

<script setup lang="ts">
import PoeDivinationDialog from '@/components/common/PoeDivinationDialog.vue';
import LoadingMask from '@/components/common/LoadingMask.vue';
import { useDialogStore, useLoadingStore } from './stores';

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
