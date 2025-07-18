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
      <button class="header__menu-toggle" @click="toggleMenu">
        <span class="header__menu-icon">☰</span>
      </button>
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
          <RouterLink to="/cart" class="btn btn--outline">
            <i class="fas fa-shopping-cart"></i
          ></RouterLink>
          <button class="btn btn--outline" @click="logout">登出</button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="btn btn--primary">登入</RouterLink>
          <RouterLink to="/register" class="btn btn--outline"
            >免費加入會員</RouterLink
          >
          <RouterLink to="/cart" class="btn btn--outline">
            <i class="fas fa-shopping-cart"></i
          ></RouterLink>
        </template>
      </div>
    </nav>

    <transition name="fade">
      <div class="header__mobile-nav" v-if="menuOpen">
        <button class="header__close-btn" @click="closeMenu">
          <i class="fas fa-xmark"></i>
        </button>
        <div class="header__mobile-links">
          <RouterLink to="/divination" @click="closeMenu">求籤問事</RouterLink>
          <RouterLink to="/godOffering" @click="closeMenu">請神供奉</RouterLink>
          <RouterLink to="/blessing" @click="closeMenu">點燈祈福</RouterLink>
          <RouterLink to="/master" @click="closeMenu">老師親算</RouterLink>
          <RouterLink to="/store" @click="closeMenu">開運商店</RouterLink>
          <RouterLink to="/cart" @click="closeMenu">
            <i class="fas fa-shopping-cart"></i> 購物車
          </RouterLink>
          <div class="header__mobile-actions">
            <template v-if="authStore.isLogin">
              <RouterLink to="/member-center" @click="closeMenu"
                >會員中心</RouterLink
              >
              <button @click="logout">登出</button>
            </template>
            <template v-else>
              <RouterLink to="/login" @click="closeMenu">登入</RouterLink>
              <RouterLink to="/register" @click="closeMenu"
                >免費加入會員</RouterLink
              >
            </template>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAuthFrontStore } from '@/stores/authFrontStore';

const authStore = useAuthFrontStore();
const router = useRouter();

const menuOpen = ref(false);
const toggleMenu = () => (menuOpen.value = !menuOpen.value);
const closeMenu = () => (menuOpen.value = false);

const logout = async () => {
  authStore.clearAuthData();
  router.push('/login');
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

  &__menu-toggle {
    display: none;
    background: none;
    border: none;
    color: #3f2412;
    font-size: 24px;
    position: absolute;
    top: 1.5rem;
    right: 1rem;
    z-index: 1001;
    cursor: pointer;
  }

  &__mobile-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #3f2412;
    color: white;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  &__mobile-links {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-size: 18px;
    text-align: center;

    a,
    button {
      color: white;
      background: none;
      border: none;
      font-size: inherit;
      font-weight: bold;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &__mobile-actions {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

@media (max-width: 768px) {
  .header__nav {
    display: none;
  }

  .header__menu-toggle {
    display: block;
    left: 1.25rem;
    right: auto;
    top: 50%;
    transform: translateY(-50%);
  }

  .header__top {
    position: relative;
    height: 132px; // 建議加一個固定高度，方便置中
  }

  .header__logo {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.header__close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 28px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1100;

  &:hover {
    color: #ffb3a1;
  }
}
</style>
