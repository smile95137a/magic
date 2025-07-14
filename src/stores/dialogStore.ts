import { useConfirmDialog } from '@/hook/confirmDialog';
import { useInfoDialog } from '@/hook/infoDialog';
import { defineStore } from 'pinia';
import { usePoeDivinationDialog } from '@/hook/poeDivinationDialog';
import { usePoeOfferingDialog } from '@/hook/poeOfferingDialog';

export const useDialogStore = defineStore('dialog', () => {
  const confirmDialog = useConfirmDialog();
  const infoDialog = useInfoDialog();
  const poeDivinationDialog = usePoeDivinationDialog();
  const poeOfferingDialog = usePoeOfferingDialog();
  return {
    ...confirmDialog,
    ...infoDialog,
    ...poeDivinationDialog,
    ...poeOfferingDialog,
  };
});
