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

      <template v-if="activeLamps.length > 0">
        <div class="my-light__grid">
          <div
            v-for="lamp in activeLamps"
            :key="lamp.id"
            class="my-light__item"
            :class="{
              'my-light__item--active': selectedLamp?.id === lamp.id,
              'my-light__item--checked': lamp.checkedIn,
            }"
            @click="selectLamp(lamp)"
          >
            <!-- 縮圖容器：圖片 + 隨機小星星 + 掃光 -->
            <div class="my-light__thumb">
              <img
                :src="imageMap[lamp.lanternCode]"
                :alt="lamp.name"
                class="my-light__item-image"
              />

              <!-- 小星星（隨機位置/延遲；每個燈 memoize，不會每次重算） -->
              <span
                v-for="(star, idx) in getStars(lamp.id)"
                :key="idx"
                class="my-light__spark"
                :style="{
                  top: star.top,
                  left: star.left,
                  animationDelay: star.delay,
                }"
                aria-hidden="true"
              ></span>

              <!-- 掃光 -->
              <span class="my-light__shine" aria-hidden="true"></span>
            </div>

            <div class="my-light__item-info">
              <p class="my-light__item-name">{{ lamp.name }}</p>
              <p class="my-light__item-period">
                剩餘 {{ calcDaysLeft(lamp.expiredTime) }} 天
              </p>
            </div>
            <div class="lamp-info__actions">
              <button
                class="lamp-action__btn"
                :disabled="lamp.checkedIn"
                @click.stop="strengthenBlessing(lamp)"
              >
                {{ lamp.checkedIn ? '今日已加強' : '加強祈福' }}
              </button>

              <small class="lamp-info__hint"
                >每日可加強一次，完成後燈卡會發亮</small
              >
            </div>
          </div>
        </div>

        <MCard v-if="selectedLamp">
          <div class="lamp-info">
            <div class="lamp-info__block">
              <div class="lamp-info__title">
                <div class="lamp-info__title-text">祈福資訊</div>
              </div>
              <div class="lamp-info__content">
                <p>祈福者：{{ selectedLamp.name }}</p>
                <p>生日：{{ formatDate(selectedLamp.birthday) }}</p>
                <p>訊息：{{ selectedLamp.message }}</p>
                <p>剩餘天數：{{ calcDaysLeft(selectedLamp.expiredTime) }} 天</p>
              </div>
            </div>
          </div>
        </MCard>
      </template>

      <NoData v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NoData from '@/components/common/NoData.vue';
import SectionBackground from '@/components/common/SectionBackground.vue';
import Title from '@/components/common/Title.vue';
import MCard from '@/components/common/MCard.vue';
import LightBlessingTabs from '@/components/front/LightBlessingTabs.vue';
import lightImages from '@/data/lightImages';
import { executeApi } from '@/utils/executeApiUtils';
import {
  checkinLantern,
  getMyActiveLanterns,
} from '@/services/lanternServices';
import { useAuthFrontStore } from '@/stores/authFrontStore';
import moment from 'moment';
import { useDialogStore } from '@/stores/dialogStore';

const router = useRouter();
const authStore = useAuthFrontStore();

const activeLamps = ref<any[]>([]);
const selectedLamp = ref<any | null>(null);

// 建立 iconName 對應圖片 map
const imageMap = Object.fromEntries(
  lightImages.map((item) => [item.key, item.image])
);

// 計算剩餘天數
const calcDaysLeft = (expiredTime: string) => {
  const now = moment();
  const end = moment(expiredTime);
  return Math.max(end.diff(now, 'days'), 0);
};

const formatDate = (val: string) =>
  val ? moment(val).format('YYYY/MM/DD') : '-';

const selectLamp = (lamp: any) => {
  selectedLamp.value = { ...lamp, records: lamp.records ?? [] };
};

const strengthenBlessing = async (lamp: any) => {
  if (!lamp || lamp.checkedIn) return;
  await executeApi({
    fn: () => checkinLantern(lamp.id),
    errorTitle: '加強祈福失敗',
    onSuccess: () => {
      // 更新該筆燈
      lamp.checkedIn = true;

      const idx = activeLamps.value.findIndex((l) => l.id === lamp.id);
      if (idx > -1) {
        activeLamps.value[idx] = {
          ...activeLamps.value[idx],
          checkedIn: true,
        };
      }

      if (selectedLamp.value?.id === lamp.id) {
        selectedLamp.value = { ...selectedLamp.value, checkedIn: true };
      }
    },
  });
};

const fetchData = async () => {
  await executeApi({
    fn: () => getMyActiveLanterns(),
    errorTitle: '取得資料失敗',
    onSuccess: (data) => {
      activeLamps.value = data ?? [];
    },
  });
};

onMounted(async () => {
  if (!authStore.isLogin) {
    router.replace({ name: 'Login' });
    return;
  }
  await fetchData();
});

/** ⭐ 隨機星星：每個燈固定一組（memoize），避免重渲染時變動 */
type Star = { top: string; left: string; delay: string };
const STAR_COUNT = 10;
const starMemo = new Map<string, Star[]>();
const genStars = (): Star[] =>
  Array.from({ length: STAR_COUNT }, () => ({
    // 為避免被圓角裁切邊界，保留小邊距
    top: `${(Math.random() * 86 + 7).toFixed(2)}%`, // 7% ~ 93%
    left: `${(Math.random() * 84 + 8).toFixed(2)}%`, // 8% ~ 92%
    delay: `${(Math.random() * 1.5).toFixed(2)}s`, // 0 ~ 1.5s
  }));
const getStars = (lampId: string): Star[] => {
  if (!starMemo.has(lampId)) starMemo.set(lampId, genStars());
  return starMemo.get(lampId)!;
};
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

      .my-light__thumb {
        box-shadow: 0 0 12px rgba(255, 200, 100, 0.9),
          0 0 24px rgba(255, 180, 80, 0.7);
        border-color: #ffcc66;
      }

      /* 觸發掃光動畫 */
      .my-light__shine {
        animation: shine 1s ease forwards;
      }

      /* hover 時星星開始閃爍 */
      .my-light__spark {
        animation: twinkle-star 1.8s ease-in-out infinite;
      }
    }

    &--active {
      .my-light__thumb {
        box-shadow: 0 0 14px rgba(255, 200, 100, 1),
          0 0 28px rgba(255, 180, 80, 0.8);
        border-color: #ff9900;
      }
      /* 選中狀態：星星持續閃 */
      .my-light__spark {
        animation: twinkle-star 1.8s ease-in-out infinite;
      }
    }
  }

  /* 縮圖容器（承載邊框/陰影/掃光/星星） */
  &__thumb {
    position: relative;
    width: 114px;
    height: 144px;
    border: 2px solid transparent;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    transition: all 0.3s ease;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__item-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* 掃光層 */
  &__shine {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: -70%;
    width: 40%;
    height: 100%;
    transform: skewX(-20deg);
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.65) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0;
  }

  @keyframes shine {
    0% {
      left: -70%;
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    100% {
      left: 130%;
      opacity: 0;
    }
  }

  /* 小星星（位置/延遲由 inline style 控制） */
  &__spark {
    position: absolute;
    width: 6px;
    height: 6px;
    pointer-events: none;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 245, 200, 0.9) 45%,
      rgba(255, 210, 120, 0) 70%
    );
    box-shadow: 0 0 6px rgba(255, 220, 140, 0.9),
      0 0 12px rgba(255, 190, 90, 0.6);
    opacity: 0; /* 平時不顯示 */
    transform: scale(0.8); /* 平時縮小 */
    mix-blend-mode: screen;
  }

  /* 星星閃爍動畫 */
  @keyframes twinkle-star {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    30% {
      opacity: 1;
      transform: scale(1);
    }
    60% {
      opacity: 0.85;
      transform: scale(1.15);
    }
    100% {
      opacity: 0;
      transform: scale(0.8);
    }
  }

  /* 減少動態偏好：關閉動畫 */
  @media (prefers-reduced-motion: reduce) {
    .my-light__shine {
      animation: none !important;
    }
    .my-light__spark {
      animation: none !important;
      opacity: 0.9;
    }
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

.lamp-info {
  margin-top: 2rem;

  &__block {
    margin-bottom: 1.5rem;
  }

  &__title {
    position: relative;

    &-text {
      background-color: #a2352c;
      color: #fff;
      font-weight: bold;
      padding: 0.5rem 1rem;
      font-size: 1.1rem;
      max-width: 392px;
    }

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: #a2352c;
    }
  }

  &__content {
    text-align: left;
    padding: 1rem;
    line-height: 1.6;
    font-size: 1rem;
    color: #000;
  }

  &__actions {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  &__hint {
    font-size: 12px;
    color: #7a4b34;
    opacity: 0.9;
  }
}

/* ✅ 已簽到：閃閃發亮 */
.my-light__item--checked {
  .my-light__thumb {
    box-shadow: 0 0 18px rgba(255, 230, 150, 1),
      0 0 36px rgba(255, 200, 100, 0.9), 0 0 60px rgba(255, 180, 80, 0.7);
    border-color: #ffd700; /* 金黃色 */
  }

  /* 星星持續閃爍 */
  .my-light__spark {
    animation: twinkle-star 1.8s ease-in-out infinite;
    opacity: 1;
  }

  /* 掃光自動跑不停 */
  .my-light__shine {
    animation: shine 2s ease-in-out infinite;
  }
}

/* === 按鈕樣式（BEM：.lamp-action__btn） === */
.lamp-action__btn {
  --btn-bg: #a2352c;
  --btn-bg-hover: #8f2e28;
  --btn-bg-disabled: #c9b0ab;
  --btn-fg: #fff;
  --btn-shadow: 0 6px 14px rgba(162, 53, 44, 0.3);

  appearance: none;
  border: none;
  outline: none;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 112px;
  padding: 0.5rem 1rem;
  border-radius: 999px;

  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.02em;

  color: var(--btn-fg);
  background: var(--btn-bg);
  box-shadow: var(--btn-shadow);
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    background: var(--btn-bg-hover);
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(162, 53, 44, 0.38);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 10px rgba(162, 53, 44, 0.25);
  }

  &:focus-visible {
    outline: 2px solid #ffd08a;
    outline-offset: 2px;
  }

  &[aria-busy='true'] {
    position: relative;
    pointer-events: none;

    /* 簡單 loading dots */
    &::after {
      content: '⋯';
      margin-left: 0.25rem;
      animation: ellipsis 1s steps(3, end) infinite;
    }
  }

  &:disabled {
    cursor: not-allowed;
    background: var(--btn-bg-disabled);
    box-shadow: none;
    transform: none;
    opacity: 0.9;
  }
}

@keyframes ellipsis {
  0% {
    content: '⋯';
  }
  33% {
    content: '⋅⋯';
  }
  66% {
    content: '⋅⋅⋯';
  }
  100% {
    content: '⋯';
  }
}
</style>
