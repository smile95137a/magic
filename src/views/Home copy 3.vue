<template>
  <SectionBackground variant="divination">
    <div class="master-order">
      <MCard>
        <h2 class="master-order__title">購買：張盛舒 科技紫微大師 親算</h2>

        <div class="master-order__form">
          <!-- 項目與費用區 -->
          <div class="master-order__row">
            <label class="master-order__label">選擇親算項目</label>
            <select v-model="selectedItem" class="master-order__select">
              <option value="love">婚姻愛情</option>
              <option value="career">事業財運</option>
              <option value="health">健康運勢</option>
            </select>
          </div>

          <div class="master-order__row">
            <label class="master-order__label">費用</label>
            <div class="master-order__price">NT$2,000</div>
          </div>

          <!-- 聯絡資訊區 -->
          <div class="master-order__contact">
            <div class="master-order__contact-label">填寫聯絡資訊</div>
            <div class="master-order__contact-fields">
              <div class="master-order__field">
                <label>姓名：</label>
                <input type="text" v-model="form.name" />
              </div>
              <div class="master-order__field">
                <label>電話：</label>
                <input type="text" v-model="form.phone" />
              </div>
              <div class="master-order__field">
                <label>E-mail：</label>
                <input type="email" v-model="form.email" />
              </div>
              <div class="master-order__field">
                <label>LINE ID：</label>
                <input type="text" v-model="form.lineId" />
              </div>
            </div>
          </div>

          <!-- 送出按鈕 -->
          <div class="master-order__footer">
            <button class="master-order__submit" @click="handleSubmit">
              確認送出 <i class="fas fa-chevron-right"></i>
            </button>
          </div></div
      ></MCard>
    </div>
  </SectionBackground>
</template>

<script setup lang="ts">
import SectionBackground from '@/components/common/SectionBackground.vue';
import divinationIntro from '@/assets/image/divinationIntro.png';
import StartButton from '@/components/StartButton.vue';
import MCard from '@/components/common/MCard.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { ref } from 'vue';

const selectedItem = ref('love');
const form = ref({
  name: '',
  phone: '',
  email: '',
  lineId: '',
});

const handleSubmit = () => {
  alert(`已送出：${form.value.name} / ${form.value.phone}`);
};
</script>

<style scoped lang="scss">
.master-order {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  &__title {
    font-size: 1.1rem;
    color: #a2352c;
    text-align: center;
    margin-bottom: 2rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      flex: 0 0 40%;
      font-weight: bold;
    }

    select,
    .master-order__price {
      flex: 0 0 60%;
    }
  }

  &__select {
    padding: 0.5rem;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  &__price {
    font-weight: bold;
    color: #d32f2f;
  }

  &__contact {
    background: #ffecec;
    padding: 1.5rem;
    border-radius: 8px;
  }

  &__contact-label {
    font-weight: bold;
    margin-bottom: 1rem;
  }

  &__contact-fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__field {
    display: flex;
    align-items: center;

    label {
      flex: 0 0 80px;
      font-weight: bold;
    }

    input {
      flex: 1;
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
  }

  &__footer {
    text-align: center;
    margin-top: 1.5rem;
  }

  &__submit {
    background: #f5b4a0;
    color: #000;
    padding: 0.75rem 2rem;
    border-radius: 999px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    font-size: 1rem;

    i {
      margin-left: 0.5rem;
    }
  }
}
</style>
