<template>
  <div class="login">
    <div class="login__container">
      <div class="login__header">
        <h1 class="login__title">WebCash</h1>
        <p class="login__subtitle">後台應用管理系統</p>
      </div>
      <form class="login__form" @submit.prevent="onSubmit">
        <div class="login__field">
          <label for="language" class="login__label">語系：</label>
          <select id="language" class="login__select" v-model="language">
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
          <p v-if="errors.language" class="error-text">
            {{ errors.language }}
          </p>
        </div>
        <div class="login__field">
          <label for="username" class="login__label">帳號：</label>
          <input
            type="text"
            id="username"
            class="login__input"
            v-model="username"
            :class="{ 'input-error': errors.username }"
          />
        </div>
        <p v-if="errors.username" class="error-text">
          {{ errors.username }}
        </p>
        <div class="login__field">
          <label for="password" class="login__label">密碼：</label>
          <input
            type="password"
            id="password"
            class="login__input"
            :class="{ 'input-error': errors.username }"
            v-model="password"
          />
        </div>
        <p v-if="errors.password" class="error-text">
          {{ errors.password }}
        </p>
        <button class="login__button" type="submit">LOGIN</button>
        <p class="login__hint">Log in with your open ID ...</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import { useLoadingStore, useAuthStore, useDialogStore } from '@/stores';
import { login } from '@/services/AuthService';

const router = useRouter();
const loadingStore = useLoadingStore();
const authStore = useAuthStore();
const dialogStore = useDialogStore();

const schema = yup.object({
  username: yup.string().required('電子信箱為必填'),
  password: yup.string().required('密碼為必填'),
});

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    language: 'zh',
    username: '',
    password: '',
  },
});
const [language] = defineField('language');
const [username] = defineField('username');
const [password] = defineField('password');

const onSubmit = handleSubmit(async (values) => {
  console.log(values);

  try {
    loadingStore.startLoading();
    const { success, data, code } = await login(values);
    loadingStore.stopLoading();
    if (success) {
      authStore.setToken(data);
      router.push('/home');
    } else {
      let message = '登入失敗，系統問題請聯繫管理員。';
      if (code === '998') {
        message =
          '登入失敗，尚未認證，請至信箱收信，如未收到驗證信，請聯繫客服。';
      } else if (code === '999') {
        message = '登入失敗，請檢查您的帳號和密碼，然後再試一次。';
      } else if (code === '997') {
        message = '登入失敗，黑名單。';
      }
      await dialogStore.openInfoDialog({
        title: '系統通知',
        message,
      });
    }
  } catch (error) {
    loadingStore.stopLoading();
    await dialogStore.openInfoDialog({
      title: '系統通知',
      message: '系統問題，請稍後再嘗試。',
    });
  }
});
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #007f99;
}

.login__container {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 400px;
}

.login__header {
  margin-bottom: 1rem;
}

.login__title {
  font-size: 1.5rem;
  color: #007f99;
  margin: 0;
}

.login__subtitle {
  font-size: 1rem;
  color: #555;
}

.login__form {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.login__field {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}

.login__label {
  color: #555;
  font-size: 1rem;
  text-align: right;
  width: 60px;
}

.login__input,
.login__select {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login__button {
  background: #ff8c00;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}

.login__button:hover {
  background: #e67e00;
}

.login__hint {
  font-size: 0.9rem;
  color: #777;
  margin-top: 1rem;
}
</style>
