<template>
  <OfferingHallStep1 v-if="offerStore.step === 1" />
  <OfferingHallStep2 v-if="offerStore.step === 2" />
  <OfferingHallStep3 v-if="offerStore.step === 3" />
  <OfferingHallStep4 v-if="offerStore.step === 4" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOfferStore } from '@/stores/offerStore';
import { useAuthFrontStore } from '@/stores/authFrontStore';

import OfferingHallStep1 from '@/components/front/OfferingHall/OfferingHallStep1.vue';
import OfferingHallStep2 from '@/components/front/OfferingHall/OfferingHallStep2.vue';
import OfferingHallStep3 from '@/components/front/OfferingHall/OfferingHallStep3.vue';
import OfferingHallStep4 from '@/components/front/OfferingHall/OfferingHallStep4.vue';

import godImages from '@/data/godImages';
import { getGodInfo, fetchAllGod } from '@/services/GodService';
import { withLoading } from '@/utils/loadingUtils';

const router = useRouter();
const route = useRoute();

const offerStore = useOfferStore();
const authStore = useAuthFrontStore();
const offerings = ref<any[]>([]);
const gods = ref<any[]>([]);

const loadGods = async () => {
  try {
    const res = await withLoading(() => fetchAllGod());
    if (res.success && res.data) {
      gods.value = res.data;
    }
  } catch (e) {
    console.error('神明列表載入失敗', e);
  }
};

const selectGod = async (godCode: string) => {
  try {
    const { success, data } = await withLoading(() => getGodInfo({ godCode }));

    if (success && data) {
      offerStore.setSelectedGod(data);
      offerStore.setGodInvoked(true);
      const godOfferings = data.offerings || [];
      for (let i = 0; i < 3; i++) {
        offerings.value[i] = godOfferings[i] || null;
      }
    } else {
      await loadGods();
      const fallbackGod = gods.value.find((g: any) => g.imageCode === godCode);
      if (fallbackGod) {
        offerStore.setSelectedGod(fallbackGod);
        offerStore.goToStep(2);
      } else {
        console.warn(`找不到對應神明代碼: ${godCode}`);
      }
    }
  } catch (error) {
    console.error('取得神明資訊失敗', error);
  }
};

onMounted(async () => {
  offerStore.resetOfferProcess();

  if (!authStore.isLogin) {
    router.replace({ name: 'Login' });
    return;
  }

  const godKey = route.query.god as string;
  if (godKey) {
    await selectGod(godKey);
  }
});
</script>
