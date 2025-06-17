<template>
  <Header />

  <DivinationInfo v-if="stepIndex === 1" @next="nextStep" />
  <DivinationConfirm v-if="stepIndex === 2" @next="nextStep" @prev="prevStep" />
  <DivinationResult v-if="stepIndex === 3" @reset="resetStep" />

  <Footer />
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import DivinationInfo from '@/components/DivinationInfo.vue';
import DivinationConfirm from '@/components/DivinationConfirm.vue';
import DivinationResult from '@/components/DivinationResult.vue';
import { storeToRefs } from 'pinia';
import { useDivinationStepStore } from '@/stores/divinationStepStore';

const stepStore = useDivinationStepStore();
const { stepIndex } = storeToRefs(stepStore);
const { nextStep, prevStep, resetStep } = stepStore;
</script>
