import { useConfirmDialog } from '@/hook/confirmDialog';
import { useInfoDialog } from '@/hook/infoDialog';
import { defineStore } from 'pinia';
import { usePoeDivinationDialog } from '@/hook/poeDivinationDialog';

export const useDialogStore = defineStore('dialog', () => {
  const confirmDialog = useConfirmDialog();
  const infoDialog = useInfoDialog();
  const poeDivinationDialog = usePoeDivinationDialog();
  return {
    ...confirmDialog,
    ...infoDialog,
    ...poeDivinationDialog,
  };
});
