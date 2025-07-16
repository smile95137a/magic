import { useConfirmDialog } from '@/hook/confirmDialog';
import { useInfoDialog } from '@/hook/infoDialog';
import { defineStore } from 'pinia';
import { usePoeDivinationDialog } from '@/hook/poeDivinationDialog';
import { usePoeOfferingDialog } from '@/hook/poeOfferingDialog';
import { useRestPwdDialog } from '@/hook/restPwdDialog';

export const useDialogStore = defineStore('dialog', () => {
  const confirmDialog = useConfirmDialog();
  const infoDialog = useInfoDialog();
  const poeDivinationDialog = usePoeDivinationDialog();
  const poeOfferingDialog = usePoeOfferingDialog();
  const restPwdDialog = useRestPwdDialog();
  return {
    ...confirmDialog,
    ...infoDialog,
    ...poeDivinationDialog,
    ...poeOfferingDialog,
    ...restPwdDialog,
  };
});
