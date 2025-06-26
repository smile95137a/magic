<template>
  <header class="header">
    <div class="header__top">
      <div class="header__logo">
        <RouterLink to="/">
          <img
            src="@/assets/image/magic_joe.png"
            alt="祈願文舍 Logo"
            class="header__logo-img"
          />
        </RouterLink>
      </div>
    </div>

    <nav class="header__nav">
      <div class="header__nav-left">
        <RouterLink to="/divination">求籤問事</RouterLink>
        <span>|</span>
        <RouterLink to="/godOffering">請神供奉</RouterLink>
        <span>|</span>
        <RouterLink to="/blessing">點燈祈福</RouterLink>
        <span>|</span>
        <RouterLink to="/master">老師親算</RouterLink>
        <span>|</span>
        <RouterLink to="/store">開運商店</RouterLink>
      </div>
      <div class="header__nav-right">
        <template v-if="authStore.isLogin">
          <RouterLink to="/member-center" class="btn btn--primary"
            >會員中心</RouterLink
          >
          <button class="btn btn--outline" @click="logout">登出</button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="btn btn--primary">登入</RouterLink>
          <RouterLink to="/register" class="btn btn--outline"
            >免費加入會員</RouterLink
          >
        </template>
      </div>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  authStore.clearAuthData();
  router.push('/login'); // 登出後導回登入頁
};
</script>

<style scoped lang="scss">
.header {
  height: 100%;
  min-height: 132px;
  position: relative;
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 1rem;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__logo-img {
    height: 60px;
    width: auto;
  }

  &__slogan {
    display: flex;
    flex-direction: column;
    line-height: 1.4;
  }

  &__title {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 2px;
  }

  &__subtitle {
    font-size: 12px;
    color: #444;
  }

  &__links {
    font-size: 13px;
    color: #666;

    a {
      color: #666;
      text-decoration: none;
      margin: 0 0.3rem;

      &:hover {
        color: #d15b3c;
      }
    }
  }

  &__nav {
    width: 100%;
    max-width: 1200px;
    position: absolute;
    left: 50%;
    bottom: -30px;
    transform: translateX(-50%);
    background-color: #3f2412;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    min-height: 60px;
  }

  &__nav-left {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    a {
      color: #fff;
      font-weight: bold;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    span {
      color: #fff;
    }
  }

  &__nav-right {
    display: flex;
    gap: 0.5rem;
  }
}

.btn {
  padding: 0.4rem 1rem;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;

  &--primary {
    background-color: #eb6c4d;
    color: #fff;
    border: none;

    &:hover {
      background-color: #cc4d30;
    }
  }

  &--outline {
    background-color: transparent;
    border: 2px solid #eb6c4d;
    color: #eb6c4d;

    &:hover {
      background-color: #fff0eb;
    }
  }
}
</style>
