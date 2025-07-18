<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__logo-section">
        <img
          src="@/assets/image/magic_joe.png"
          alt="祈願文舍 Logo"
          class="footer__logo"
        />
        <p class="footer__slogan">精誠所至｜金石為開</p>
      </div>

      <div class="footer__links">
        <div class="footer__column">
          <h4 class="footer__title">關於我們</h4>
          <ul class="footer__list">
            <li class="footer__item"><a href="#">公司介紹</a></li>
            <li class="footer__item"><a href="#">人才招募</a></li>
            <li class="footer__item"><a href="#">網站導覽</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <h4 class="footer__title">熱門服務</h4>
          <ul class="footer__list">
            <li class="footer__item"><a href="#">求籤問事</a></li>
            <li class="footer__item"><a href="#">請神供奉</a></li>
            <li class="footer__item"><a href="#">點燈祈福</a></li>
            <li class="footer__item"><a href="#">老師競算</a></li>
            <li class="footer__item"><a href="#">開運商店</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <h4 class="footer__title">客戶服務</h4>
          <ul class="footer__list">
            <li class="footer__item"><a href="#">會員中心</a></li>
            <li class="footer__item"><a href="#">客服中心</a></li>
            <li class="footer__item"><a href="#">客服信箱</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <p class="footer__copyright">© 2025. ABC All rights reserved.</p>
      <div class="footer__policies">
        <RouterLink to="/policy">服務條款</RouterLink>
        ｜<RouterLink to="/privacy">隱私權政策</RouterLink> ｜<a href="#"
          >防詐騙提醒</a
        >
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 無特殊邏輯，目前空白即可
</script>

<style lang="scss" scoped>
.footer {
  background-color: #fff;
  padding: 2rem 1rem;
  font-size: 14px;
  border-top: 1px solid #ccc;
  min-height: 490px;
  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    gap: 2rem;

    @media (max-width: 767px) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__logo-section {
    flex: 1 1 100%;
    max-width: 200px;
    text-align: left;

    .footer__logo {
      width: 100px;
      margin-bottom: 0.5rem;
    }

    .footer__slogan {
      font-size: 12px;
      color: #333;
    }

    @media (max-width: 767px) {
      text-align: center;
    }
  }

  &__links {
    display: flex;
    flex: 2 1 100%;
    gap: 2rem;
    flex-wrap: wrap;
    max-width: 800px;
    width: 100%;
    justify-content: end;

    @media (max-width: 767px) {
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
  }

  &__column {
    min-width: 200px;

    @media (max-width: 767px) {
      width: 100%;
    }
  }

  &__title {
    font-weight: bold;
    margin-bottom: 0.5rem;
    font-size: 15px;
  }

  &__list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;

    // 手機版為 row 排列（預設）
    @media (max-width: 767px) {
      gap: 0.25rem 1rem;
    }

    // ✅ 桌面版為 column 排列
    @media (min-width: 768px) {
      flex-direction: column;
      gap: 0.25rem 0;
    }

    .footer__item {
      margin: 0;

      a {
        text-decoration: none;
        color: #333;
        transition: color 0.2s;

        &:hover {
          color: #c00;
        }
      }
    }
  }

  &__bottom {
    border-top: 1px solid #ccc;
    margin-top: 2rem;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    color: #666;
    text-align: center;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      max-width: 1200px;
      margin: 2rem auto 0;
      padding: 1rem;
    }
  }

  &__policies {
    margin-top: 0.5rem;

    a {
      color: #666;
      text-decoration: none;
      margin: 0 0.25rem;

      &:hover {
        color: #000;
      }
    }

    @media (min-width: 768px) {
      margin-top: 0;
    }
  }
}
</style>
