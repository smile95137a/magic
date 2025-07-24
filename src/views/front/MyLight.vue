<template>
  <div class="my-light">
    <SectionBackground variant="divination" />
    <div class="my-light__container">
      <Title color="white" text="我的祈福燈" />
      <div class="my-light__header">
        <p class="my-light__description">
          以下是您目前供奉中的祈福燈，點擊可查看詳細資料與加強供奉。
        </p>
      </div>

      <LightBlessingTabs />

      <div class="my-light__grid">
        <div
          v-for="lamp in activeLamps"
          :key="lamp.id"
          class="my-light__item"
          @click="selectLamp(lamp)"
        >
          <img
            :src="imageMap[lamp.iconName]"
            :alt="lamp.name"
            class="my-light__item-image"
          />
          <div class="my-light__item-info">
            <p class="my-light__item-name">{{ lamp.name }}</p>
            <p class="my-light__item-period">剩餘 {{ lamp.daysLeft }} 天</p>
          </div>
        </div>
      </div>

      <MCard v-if="selectedLamp">
        <div class="lamp-info">
          <div class="lamp-info__block">
            <div class="lamp-info__title">
              <div class="lamp-info__title-text">供奉紀錄</div>
            </div>
            <div class="lamp-info__content">
              <div v-for="record in selectedLamp.records" :key="record.id">
                {{ record.date }}　{{ record.item }}
              </div>
            </div>
          </div>
        </div>
      </MCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SectionBackground from '@/components/common/SectionBackground.vue';
import Title from '@/components/common/Title.vue';
import MCard from '@/components/common/MCard.vue';
import LightBlessingTabs from '@/components/front/LightBlessingTabs.vue';
import lightImages from '@/data/lightImages';

const activeLamps = ref<any[]>([]);
const selectedLamp = ref<any | null>(null);

const imageMap = Object.fromEntries(
  lightImages.map((item) => [item.key, item.image])
);

const fetchData = async () => {};

const selectLamp = (lamp: any) => {
  selectedLamp.value = lamp;
};

onMounted(fetchData);
</script>

<style scoped lang="scss">
.my-light {
  width: 100%;
  position: relative;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  &__header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  &__description {
    font-size: 1rem;
    color: #000;
    margin-top: 0.5rem;
    text-align: left;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1.5rem;
    justify-items: center;
    margin-bottom: 2rem;
  }

  &__item {
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__item-image {
    width: 114px;
    height: 144px;
    background: white;
    object-fit: cover;
  }

  &__item-info {
    margin-top: 0.5rem;
  }

  &__item-name {
    font-weight: bold;
    color: #a2352c;
    font-size: 1rem;
  }

  &__item-period {
    font-size: 0.85rem;
    color: #444;
  }
}
</style>
