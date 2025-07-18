｀
<template>
  <section class="offering">
    <SectionBackground variant="red" />
    <div class="offering__container">
      <Title color="white" text="供奉大廳" />

      <div class="offering__temple">
        <div class="offering__main">
          <img class="offering__main-img" :src="tample" alt="" />
          <div class="offering__sign">
            {{ offerStore.selectedGod?.name || '請神中' }}
          </div>

          <div v-if="offerStore.isGodInvoked" class="offering__god-image">
            <img
              :src="godImages[offerStore.selectedGod?.imageCode]?.default"
              :alt="offerStore.selectedGod?.name"
              class="offering__god-image-img"
            />
          </div>
          <div v-else class="offering__god-placeholder">請選擇供奉神明</div>
        </div>
      </div>

      <div class="offering__fruits">
        <div
          v-for="(item, index) in 3"
          :key="index"
          class="offering__fruit"
          @click="openOfferingDialog(index)"
        >
          <img class="offering__fruit-bowl" :src="fruitBowl" alt="fruit bowl" />
          <div v-if="offerings[index]" class="offering__fruit-image">
            <img
              :src="offerings[index]"
              alt="offering"
              class="offering__fruit-img"
            />
          </div>
          <div v-else class="offering__fruit-placeholder">供花供果</div>
        </div>
      </div>

      <div class="offering__tabs">
        <button
          class="offering__tab"
          :class="{ 'offering__tab--active': currentTab === 'offer' }"
          @click="currentTab = 'offer'"
        >
          供奉神明
        </button>
        <button
          class="offering__tab"
          :class="{ 'offering__tab--active': currentTab === 'extend' }"
          @click="currentTab = 'extend'"
        >
          延長供奉
        </button>
      </div>
    </div>

    <!-- Tab content -->
    <div v-if="currentTab === 'offer'" class="offering__content">
      <p class="offering__content-title">請選擇供奉神明</p>
      <div class="offering__god-list">
        <div
          v-for="god in gods"
          :key="god.id"
          class="offering__god"
          @click="selectGod(god)"
        >
          <img
            :src="godImages[god.imageCode]?.default"
            :alt="god.imageCode"
            class="offering__god-icon"
          />
          <p class="offering__god-name">
            {{ godImages[god.imageCode]?.label || god.name }}
          </p>
        </div>
      </div>
    </div>

    <div v-else class="offering__content">
      <p class="offering__content-title">延長供奉內容區塊</p>
      <div class="offering__extend">
        <p class="offering__extend-title">請選擇延長供奉時間</p>
        <div class="offering__extend-options">
          <div
            class="offering__extend-option"
            v-for="item in extendOptions"
            :key="item.days"
          >
            <p class="offering__extend-days">
              <span class="offering__extend-number">{{ item.days }}</span> 天
            </p>
            <p class="offering__extend-price">NT${{ item.price }}</p>
            <button class="offering__extend-btn">
              選擇 <span class="offering__extend-arrow">➤</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  fetchAllGod,
  getGodInfo,
  presentOffering,
} from '@/services/GodService';
import { withLoading } from '@/utils/loadingUtils';
import godImages from '@/data/godImages';

import { useOfferStore } from '@/stores/offerStore';

import Title from '@/components/common/Title.vue';
import SectionBackground from '@/components/common/SectionBackground.vue';

import tample from '@/assets/image/img-tample.png';
import fruitBowl from '@/assets/image/img-plate.png';
import { useDialogStore } from '@/stores/dialogStore';

const offerStore = useOfferStore();
const dialogStore = useDialogStore();
const currentTab = ref<'offer' | 'extend'>('offer');
const gods = ref<any[]>([]);
const offerings = ref<(string | null)[]>([null, null, null]); // 每個位置代表一個供品區塊

const extendOptions = [
  { days: 7, price: 20 },
  { days: 30, price: 50 },
];

const loadGods = async () => {
  try {
    const res = await withLoading(() => fetchAllGod());
    if (res.success) {
      gods.value = res.data;
    }
  } catch (e) {
    console.error('神明列表載入失敗', e);
  }
};

onMounted(() => {
  loadGods();
});

const selectGod = async (god: any) => {
  try {
    const { success, data } = await withLoading(() =>
      getGodInfo({ godCode: god?.imageCode })
    );

    if (success) {
      if (data) {
        offerStore.setSelectedGod(data);
        offerStore.setGodInvoked(true);
      } else {
        offerStore.setSelectedGod(god);
        offerStore.goToStep(2);
      }
    } else {
      console.warn('API 成功回傳但 success 為 false');
    }
  } catch (error) {
    console.error('取得神明資訊失敗', error);
  }
};

const openOfferingDialog = async (index: number) => {
  if (!offerStore.isGodInvoked) {
    await dialogStore.openInfoDialog({
      title: '提示',
      message: '請先選擇並成功請神明後，才能供奉供品',
      customClass: 'my-custom-class',
    });
    return;
  }

  try {
    const res = await dialogStore.openPoeOfferingDialog(); // 使用者選擇的供品物件

    if (res) {
      const payload = {
        godCode: offerStore.selectedGod?.imageCode,
        newOfferingId: res.id,
      };
      const result = await presentOffering(payload);

      if (result.success) {
        offerings.value[index] = res.imageBase64;
      } else {
        alert('供奉失敗，請稍後再試');
      }
    }
  } catch (error) {
    console.error('供奉供品失敗', error);
    alert('供奉失敗，請稍後再試');
  }
};
</script>

<style lang="scss" scoped>
.offering {
  width: 100%;
  position: relative;
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__logo {
    width: 80px;
    margin-bottom: 0.5rem;
  }

  &__title {
    font-size: 2rem;
    font-weight: bold;
  }

  &__temple {
    position: relative;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  &__main {
    width: 100%;
    height: 638px;
    max-width: 1200px;
    background-size: cover;
    position: relative;
    &-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform-origin: center;
      transition: transform 0.6s ease;
    }
  }

  &__sign {
    position: absolute;
    top: 140px;
    left: 50%;
    transform: translateX(-50%);
    background: #eeafa2;
    color: #000;
    padding: 0.25rem 1rem;
    border-radius: 4px;
    width: 142px;
    height: 52px;
    border: 3px solid #3c2313;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  &__god-placeholder {
    position: absolute;
    bottom: 132px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    border: 1px dashed #fff;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    width: 178px;
    height: 152px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  &__steps {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  &__step {
    padding: 0.5rem 1.5rem;
    background: #fff;
    color: #b64832;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;

    &--active {
      background: #df5b3c;
      color: #fff;
    }
  }

  &__gods {
    background: #ffe6e1;
    color: #000;
    padding: 1.5rem;
    border-radius: 12px;
  }

  &__gods-title {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  &__gods-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }

  &__god {
    background: #fff;
    border-radius: 8px;
    padding: 1rem;
    width: 100px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &:hover {
      background: #ffd1c4;
    }
  }

  &__god-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 0.5rem;
  }

  &__god-name {
    font-size: 0.875rem;
    font-weight: bold;
  }
}
.offering__fruits {
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding: 2rem 0;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 1200px;
    height: 64px;
    border-radius: 12px;

    background: #e0664d;
    z-index: 0;
  }
}

.offering__fruit {
  position: relative;
  width: 100%;
  max-width: 220px;
  height: 160px;

  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.offering__fruit-bowl {
  width: 160px;
  height: auto;
  z-index: 1;
}

.offering__fruit-placeholder {
  position: absolute;
  top: 0;
  width: 100%;
  max-width: 178px;
  height: 120px;
  border: 1px dashed #ffffff;
  color: #fff;
  font-size: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  pointer-events: none;
}
.offering__tabs {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 2rem 0 0 0;
}

.offering__tab {
  position: relative;
  background: #eeafa2;
  color: #3c2313;
  padding: 0.5rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: all 0.3s;
  width: 100%;
  max-width: 180px;
  height: 44px;
  border-radius: 100px;
  font-size: 20px;
  opacity: 0.5;
  &--active {
    position: relative;
    opacity: 1;
    &::after {
      content: '';
      position: absolute;
      top: 56px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #ffe6e1; // 顏色與 tab 一致
    }
  }
}

.offering__content {
  background: #ffe6e1;
  padding: 2rem;
  text-align: center;
}

.offering__content-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.offering__god-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.offering__god {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  width: 100px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background: #ffd1c4;
  }
}

.offering__god-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 0.5rem;
}

.offering__god-name {
  font-size: 0.875rem;
  font-weight: bold;
}
.offering__extend {
  text-align: center;
  padding: 2rem;

  &-title {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: #000;
  }

  &-options {
    display: flex;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
  }

  &-option {
    background: #fff;
    border-radius: 12px;
    padding: 1rem 2rem;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    min-width: 120px;
  }

  &-days {
    font-size: 1.5rem;
    font-weight: bold;
    color: #000;

    .offering__extend-number {
      font-size: 2rem;
      font-weight: 700;
    }
  }

  &-price {
    font-size: 1rem;
    color: #000;
  }

  &-btn {
    background: #b64832;
    color: #fff;
    font-weight: bold;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 999px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #df5b3c;
    }
  }

  &-arrow {
    font-size: 1rem;
  }
}

.offering__god-image {
  position: absolute;
  bottom: 132px;
  left: 50%;
  transform: translateX(-50%);
  width: 178px;
  height: 152px;
  display: flex;
  align-items: center;
  justify-content: center;

  &-img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
}
.offering__fruit-image {
  position: absolute;
  top: 0;
  width: 100%;
  max-width: 178px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  .offering__fruit-img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
}
</style>
