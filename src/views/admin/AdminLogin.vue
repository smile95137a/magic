<template>
  <div class="admin-login">
    <h1 class="admin-login__title">後台登入</h1>
    <form class="admin-login__form" @submit.prevent="onSubmit">
      <input v-model="username" placeholder="帳號" class="admin-login__input" />
      <input
        v-model="password"
        type="password"
        placeholder="密碼"
        class="admin-login__input"
      />
      <button class="admin-login__btn">登入</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const onSubmit = () => {
  console.log('登入帳號:', username.value, '密碼:', password.value);
  // 實際整合驗證流程可以在此補上
};
</script>

<style scoped lang="scss">
.admin-login {
  max-width: 400px;
  margin: 60px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
  &__title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 16px;
    text-align: center;
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  &__input {
    padding: 10px;
    font-size: 16px;
  }
  &__btn {
    background-color: #333;
    color: white;
    padding: 10px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: background 0.3s;
    &:hover {
      background-color: #555;
    }
  }
}
</style>
