<template>
  <OfferingHallStep1 v-if="offerStore.step === 1" />
  <OfferingHallStep2 v-if="offerStore.step === 2" />
  <OfferingHallStep3 v-if="offerStore.step === 3" />
  <OfferingHallStep4 v-if="offerStore.step === 4" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useOfferStore } from '@/stores/offerStore';

import OfferingHallStep1 from '@/views/front/OfferingHallStep1.vue';
import OfferingHallStep2 from '@/views/front/OfferingHallStep2.vue';
import OfferingHallStep3 from '@/views/front/OfferingHallStep3.vue';
import OfferingHallStep4 from '@/views/front/OfferingHallStep4.vue';
import { useAuthFrontStore } from '@/stores/authFrontStore';
import { useRouter } from 'vue-router';
const router = useRouter();

const offerStore = useOfferStore();
const authStore = useAuthFrontStore();
onMounted(() => {
  offerStore.resetOfferProcess();
  if (!authStore.isLogin) {
    router.replace({ name: 'Login' });
    return;
  }
});
</script>
