import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface BlessingContact {
  name: string;
  birthday: string;
  message: string;
}

export const useBlessingStore = defineStore('blessing', () => {
  // 步驟流程（1:選燈數, 2:填資料）
  const step = ref(1);

  const nextStep = () => {
    if (step.value < 2) step.value++;
  };

  const prevStep = () => {
    if (step.value > 1) step.value--;
  };

  const resetStep = () => {
    step.value = 1;
  };

  // 已選燈種
  const selectedLamp = ref<any | null>(null);

  // 燈數
  const quantity = ref(1);

  // 每盞燈對應的祈福人資料
  const contactInfos = ref<BlessingContact[]>([]);

  const setSelectedLamp = (lamp: any) => {
    selectedLamp.value = lamp;
  };

  const setQuantity = (val: number) => {
    quantity.value = val;
    contactInfos.value = Array.from({ length: val }, () => ({
      name: '',
      birthday: '',
      message: '',
    }));
  };

  const updateContact = (
    index: number,
    field: keyof BlessingContact,
    value: string
  ) => {
    if (contactInfos.value[index]) {
      contactInfos.value[index][field] = value;
    }
  };

  const resetBlessing = () => {
    selectedLamp.value = null;
    quantity.value = 1;
    contactInfos.value = [];
    resetStep();
  };

  return {
    step,
    nextStep,
    prevStep,
    resetStep,
    selectedLamp,
    quantity,
    contactInfos,
    setSelectedLamp,
    setQuantity,
    updateContact,
    resetBlessing,
  };
});
