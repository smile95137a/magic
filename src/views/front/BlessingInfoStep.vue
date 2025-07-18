<template>
  <div class="lamp-box">
    <h3 class="lamp-box__title">填寫祈福者資料</h3>
    <div
      v-for="(info, index) in store.contactInfos"
      :key="index"
      class="lamp-box__column"
    >
      <label class="lamp-box__label">第 {{ index + 1 }} 位祈福者姓名</label>
      <input
        v-model="info.name"
        type="text"
        class="lamp-box__input"
        placeholder="請輸入姓名"
      />

      <label class="lamp-box__label">生日</label>
      <input v-model="info.birthday" type="date" class="lamp-box__input" />

      <label class="lamp-box__label">祈福內容</label>
      <textarea
        v-model="info.message"
        class="lamp-box__textarea"
        placeholder="請輸入祈福內容"
      ></textarea>
    </div>

    <div class="lamp-box__actions">
      <button class="lamp-box__submit" @click="store.step = 1">上一步</button>
      <button class="lamp-box__submit" @click="finalSubmit">送出祈福</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { purchaseLantern } from '@/services/lanternServices';
import { useBlessingStore } from '@/stores/blessingStore';
import { storeToRefs } from 'pinia';

const store = useBlessingStore();
const { contactInfos, selectedLamp } = storeToRefs(store);

const finalSubmit = async () => {
  try {
    const payload = {
      lanternCode: selectedLamp.value?.iconName || '',
      list: contactInfos.value.map((info) => ({
        ...info,
        birthday: info.birthday
          ? moment(info.birthday).format('YYYY/MM/DD')
          : '',
      })),
    };

    await purchaseLantern(payload);
    alert('祈福資料已送出！');
    store.resetBlessing();
  } catch (error) {
    console.error('送出失敗:', error);
    alert('送出失敗，請稍後再試');
  }
};
</script>

<style scoped lang="scss">
/* Blessing page 與燈品列表區塊樣式 */
.blessing-page {
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
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
    justify-items: center;
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
}

/* MCard 包含的燈箱樣式 */
.lamp-box {
  background: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  font-family: sans-serif;

  &__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  &__image {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    object-fit: cover;
  }

  &__info {
    flex: 1;
    min-width: 200px;
  }

  &__title {
    font-size: 1.5rem;
    color: #a2352c;
    margin: 0;
  }

  &__desc {
    color: #d45343;
    font-weight: bold;
    margin-top: 0.25rem;
    text-decoration: underline;
    font-size: 0.95rem;
  }

  &__stat {
    text-align: right;
    font-size: 0.9rem;
    color: #333;
    min-width: 200px;
  }

  &__highlight {
    color: #d32f2f;
    font-weight: bold;
  }

  &__row {
    display: flex;
    gap: 1.5rem;
    background: #ffe5df;
    padding: 1rem;
    border-radius: 10px;
    flex-wrap: wrap;
  }

  &__column {
    flex: 1;
    min-width: 220px;
    margin-bottom: 1rem;
  }

  &__label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.25rem;
  }

  /* 內建 input 與 textarea */
  &__input,
  &__textarea,
  &__select {
    width: 100%;
    padding: 0.4rem 0.75rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-bottom: 0.75rem;
  }

  &__textarea {
    resize: vertical;
    min-height: 80px;
  }

  &__select-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__reminder {
    padding: 0.75rem;
    font-size: 0.85rem;
    line-height: 1.5;
    margin: 0;
  }

  &__actions {
    width: 100%;
    text-align: center;
    margin-top: 1rem;
  }

  &__submit {
    padding: 0.75rem 2rem;
    background: #a2352c;
    color: #fff;
    border: none;
    border-radius: 999px;
    font-weight: bold;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background: #892d24;
    }
  }
}

/* 燈資訊區塊 */
.lamp-info {
  margin-top: 2rem;

  &__block {
    margin-bottom: 1.5rem;
  }

  &__title {
    position: relative;
    &-text {
      background-color: #a2352c;
      color: white;
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
}
</style>
