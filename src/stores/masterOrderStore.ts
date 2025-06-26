import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMasterOrderStore = defineStore('masterOrder', () => {
  const step = ref<number>(1);

  const nextStep = () => {
    step.value++;
  };

  const resetStep = () => {
    step.value = 1;
  };

  return {
    step,
    nextStep,
    resetStep,
  };
});
