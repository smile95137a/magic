<template>
  <div class="login">
    <SectionBackground variant="divination" />
    <div class="login__container">
      <MCard customClass="mcard--login login__card">
        <div class="login__content">
          <h2 class="login__title">會員登入</h2>
          <div class="login__main">
            <form class="login__form" @submit.prevent="onSubmit">
              <div class="login__auth">
                <div
                  class="login__auth-btn"
                  @click="handleOauthLogin('google')"
                >
                  <div class="login__auth-btn-icon">
                    <img :src="googleLogo" />
                  </div>
                  <div class="login__auth-btn-text">Google 帳號登入</div>
                </div>
              </div>

              <div class="login__divider">
                <div class="login__divider-line"></div>
                <div class="login__divider-text">或</div>
              </div>
              <div class="login__form-inputs">
                <p class="login__text">電子信箱</p>
                <input
                  class="login__form-input"
                  v-model="username"
                  :class="{ 'login__form-input--error': errors.username }"
                />
                <p class="login__text login__text--error">
                  {{ errors.username }}
                </p>
              </div>
              <div class="login__form-inputs">
                <p class="login__text">密碼</p>
                <input
                  type="password"
                  class="login__form-input"
                  v-model="password"
                  :class="{ 'login__form-input--error': errors.password }"
                />
                <p class="login__text login__text--error">
                  {{ errors.password }}
                </p>
              </div>

              <div class="login__forgot">
                <p
                  class="login__text login__text--forgot"
                  @click="handleForgotPassword"
                >
                  忘記密碼?
                </p>
              </div>

              <div class="login__btns">
                <button type="submit" class="login__btn">登入</button>
              </div>
              <div class="login__footer">
                <p>尚未加入會員？請註冊新帳號</p>
                <button
                  type="button"
                  class="login__btn login__btn--register"
                  @click="forwardRegistration"
                >
                  註冊
                </button>
              </div>
            </form>
          </div>
        </div>
      </MCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import googleLogo from '@/assets/image/google.svg';
import MCard from '@/components/common/MCard.vue';
import SectionBackground from '@/components/common/SectionBackground.vue';
import Header from '@/components/front/Header.vue';
import { login } from '@/services/UserService';
import { useAuthFrontStore } from '@/stores/authFrontStore';
import { useDialogStore } from '@/stores/dialogStore';
import { useLoadingStore } from '@/stores/loadingStore';
import { useForm } from 'vee-validate';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';

const router = useRouter();
const loadingStore = useLoadingStore();
const authStore = useAuthFrontStore();
const dialogStore = useDialogStore();

onMounted(() => {
  if (authStore.isLogin) {
    router.push('/home');
  }
});

const schema = yup.object({
  username: yup.string().required('電子信箱為必填'),
  password: yup.string().required('密碼為必填'),
});

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    username: '',
    password: '',
  },
});

const [username] = defineField('username');
const [password] = defineField('password');

const onSubmit = handleSubmit(async (values) => {
  const res = await login(values);
});

const forwardRegistration = () => {
  router.push('/register');
};

const handleOauthLogin = (provider: string) => {};

const handleForgotPassword = async () => {};
</script>

<style scoped>
.login__card {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}
</style>
