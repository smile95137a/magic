<template>
  <Header />

  <DivinationInfo v-if="stepIndex === 1" @next="nextStep" />
  <DivinationConfirm v-if="stepIndex === 2" @next="nextStep" @prev="prevStep" />
  <DivinationResult v-if="stepIndex === 3" @reset="resetStep" />

  <Footer />
</template>

<script setup lang="ts">
import Header from '@/components/front/Header.vue';
import Footer from '@/components/front/Footer.vue';
import DivinationInfo from '@/components/front/DivinationInfo.vue';
import DivinationConfirm from '@/components/front/DivinationConfirm.vue';
import DivinationResult from '@/components/front/DivinationResult.vue';
import { storeToRefs } from 'pinia';
import { useDivinationStepStore } from '@/stores/divinationStepStore';

const stepStore = useDivinationStepStore();
const { stepIndex } = storeToRefs(stepStore);
const { nextStep, prevStep, resetStep } = stepStore;
</script>
