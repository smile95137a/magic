import { useAddAPtoAPListDialog } from '@/hook/AddAPtoAPListDialog';
import { useAddIpListDialog } from '@/hook/AddIpListDialog';
import { useAddRelationMediaListDialog } from '@/hook/AddRelationMediaListDialog';
import { useAddBillerCodeIdListDialog } from '@/hook/AddBillerCodeIdListDialog';
import { useConfirmDialog } from '@/hook/confirmDialog';
import { useInfoDialog } from '@/hook/infoDialog';
import { useSearchCompanyDialog } from '@/hook/searchCompanyDialog';
import { useSearchFileTypeDialog } from '@/hook/searchFileTypeDialog';
import { useSearchFnOptionDialog } from '@/hook/searchFnOptionDialog';
import { defineStore } from 'pinia';

export const useDialogStore = defineStore('dialog', () => {
  const confirmDialog = useConfirmDialog();
  const infoDialog = useInfoDialog();
  const searchCompanyDialog = useSearchCompanyDialog();
  const searchFnOptionDialog = useSearchFnOptionDialog();
  const searchFileTypeDialog = useSearchFileTypeDialog();
  const addIpListDialog = useAddIpListDialog();
  const addRelationMediaListDialog = useAddRelationMediaListDialog();
  const addAPtoAPListDialog = useAddAPtoAPListDialog();
  const addBillerCodeIdListDialog = useAddBillerCodeIdListDialog();
  return {
    ...confirmDialog,
    ...infoDialog,
    ...searchCompanyDialog,
    ...searchFnOptionDialog,
    ...searchFileTypeDialog,
    ...addIpListDialog,
    ...addRelationMediaListDialog,
    ...addAPtoAPListDialog,
    ...addBillerCodeIdListDialog,
  };
});
