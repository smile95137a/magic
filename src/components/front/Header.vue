<template>
  <header class="header">
    <div class="header__top">
      <div class="header__logo" @click="router.push('/')">
        <img
          src="@/assets/image/magic_joe.png"
          alt="祈願文舍 Logo"
          class="header__logo-img"
        />
      </div>
      <button class="header__menu-toggle" @click="toggleMenu">
        <span class="header__menu-icon">☰</span>
      </button>
    </div>

    <nav class="header__nav">
      <div class="header__nav-left">
        <div class="nav-link" @click="router.push('/divination')">求籤問事</div>
        <span>|</span>
        <div class="nav-link" @click="router.push('/godOffering')">
          請神供奉
        </div>
        <span>|</span>
        <div class="nav-link" @click="router.push('/blessing')">點燈祈福</div>
        <span>|</span>
        <div class="nav-link" @click="router.push('/master')">老師親算</div>
        <span>|</span>
        <div class="nav-link" @click="router.push('/store')">開運商店</div>
      </div>
      <div class="header__nav-right">
        <template v-if="authStore.isLogin">
          <div class="btn btn--primary" @click="router.push('/member-center')">
            會員中心
          </div>
          <div class="btn btn--outline" @click="router.push('/cart')">
            <i class="fas fa-shopping-cart"></i>
          </div>
          <button class="btn btn--outline" @click="logout">登出</button>
        </template>
        <template v-else>
          <div class="btn btn--primary" @click="router.push('/login')">
            登入
          </div>
          <div class="btn btn--outline" @click="router.push('/register')">
            免費加入會員
          </div>
          <div class="btn btn--outline" @click="router.push('/cart')">
            <i class="fas fa-shopping-cart"></i>
          </div>
        </template>
      </div>
    </nav>

    <transition name="fade">
      <div class="header__mobile-nav" v-if="menuOpen">
        <button class="header__close-btn" @click="closeMenu">
          <i class="fas fa-xmark"></i>
        </button>
        <div class="header__mobile-links">
          <div @click="navigate('/divination')">求籤問事</div>
          <div @click="navigate('/godOffering')">請神供奉</div>
          <div @click="navigate('/blessing')">點燈祈福</div>
          <div @click="navigate('/master')">老師親算</div>
          <div @click="navigate('/store')">開運商店</div>
          <div @click="navigate('/cart')">
            <i class="fas fa-shopping-cart"></i> 購物車
          </div>
          <div class="header__mobile-actions">
            <template v-if="authStore.isLogin">
              <div @click="navigate('/member-center')">會員中心</div>
              <button @click="logout">登出</button>
            </template>
            <template v-else>
              <div @click="navigate('/login')">登入</div>
              <div @click="navigate('/register')">免費加入會員</div>
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

const navigate = (path: string) => {
  closeMenu();
  router.push(path);
};
</script>

<style scoped lang="scss">
.header {
  height: 100%;
  min-height: 132px;
  position: relative;
  z-index: 9999;
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
    cursor: pointer;
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
    gap: 0.25rem;

    .nav-link {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 80px;
      height: 44px;
      padding: 0 1rem;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      border-radius: 6px;
      transition: background 0.2s;
      text-align: center;
      white-space: nowrap;

      &:hover {
        background-color: rgba(255, 255, 255, 0.15);
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
    gap: 1rem;
    font-size: 18px;
    text-align: center;

    div,
    button {
      display: block;
      width: 100%;
      padding: 1rem;
      color: white;
      background: none;
      border: none;
      font-size: inherit;
      font-weight: bold;
      cursor: pointer;
      border-radius: 8px;
      text-align: center;
      transition: background 0.2s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
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
  display: inline-block;
  cursor: pointer;

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
    height: 132px;
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
