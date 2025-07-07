<template>
  <section class="master-form">
     <SectionBackground variant="divination" />
         <div class="master-form__container">
           <Title color="dark" text="大師親算" />
           <div class="master-form__main">
    <div class="master-form__card">
      <h2 class="master-form__title">購買：張盛舒 科技紫微大師 親算</h2>

      <div class="master-form__field-row">
        <label class="master-form__label">選擇親算項目</label>
        <select v-model="selectedTopic" class="master-form__select">
          <option v-for="topic in topics" :key="topic" :value="topic">
            {{ topic }}
          </option>
        </select>
      </div>

      <div class="master-form__field-row">
        <label class="master-form__label">費用</label>
        <span class="master-form__price">NT$2,000</span>
      </div>

      <div class="master-form__info-block">
        <p class="master-form__block-title">填寫聯絡資訊</p>
        <div class="master-form__input-group">
          <label>姓名：</label>
          <input v-model="name" class="master-form__input" />
        </div>
        <div class="master-form__input-group">
          <label>電話：</label>
          <input v-model="phone" class="master-form__input" />
        </div>
        <div class="master-form__input-group">
          <label>E-mail：</label>
          <input v-model="email" class="master-form__input" />
        </div>
        <div class="master-form__input-group">
          <label>LINE ID：</label>
          <input v-model="lineId" class="master-form__input" />
        </div>
      </div>

      <div class="master-form__btn-wrapper">
        <button class="master-form__btn" @click="submitForm">
          確認送出 <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div></div></div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMasterOrderStore } from '@/stores/masterOrderStore';
import SectionBackground from '@/components/common/SectionBackground.vue';
import Title from '@/components/common/Title.vue';
const store = useMasterOrderStore();

const topics = ['婚姻愛情', '事業發展', '流年生涯', '家庭親子', '考試升學'];

const selectedTopic = ref(topics[0]);
const name = ref('');
const phone = ref('');
const email = ref('');
const lineId = ref('');

const submitForm = () => {
  // 👉 可在這裡加入表單驗證與暫存資料進 store
  store.nextStep(); // 進入下一步
};
</script>

<style scoped lang="scss">
.master-form {
  width: 100%;
  position: relative;
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;

  }


  &__card {
    background: #fff;
    border-radius: 12px;
    padding: 2rem;
    width: 100%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  &__title {
    font-weight: bold;
    font-size: 1.2rem;
    color: #a53b25;
    margin-bottom: 1.5rem;
  }

  &__field-row {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 1rem;

    label {
      width: 120px;
      font-weight: bold;
    }
  }

  &__select {
    flex: 1;
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  &__price {
    color: #e85028;
    font-weight: bold;
    font-size: 1rem;
  }

  &__info-block {
    background: #fbe9e7;
    padding: 1.5rem;
    border-radius: 8px;
    margin-top: 1.5rem;
  }

  &__block-title {
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
  }

  &__input-group {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    label {
      width: 80px;
    }

    input {
      flex: 1;
    }
  }

  &__input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 100%;
  }

  &__btn-wrapper {
    margin-top: 2rem;
    text-align: center;
  }

  &__btn {
    background: #a53b25;
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 999px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    font-size: 1rem;

    i {
      margin-left: 0.5rem;
    }

    &:hover {
      background: #892d1f;
    }
  }
}
</style>
