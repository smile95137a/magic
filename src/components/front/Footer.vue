<template>
  <footer class="footer" role="contentinfo" aria-label="網站頁尾">
    <div class="footer__container">
      <div class="footer__logo-section">
        <img
          src="@/assets/image/magic_joe.png"
          alt="祈願文舍 Logo"
          class="footer__logo"
          loading="lazy"
        />
        <p class="footer__slogan">精誠所至｜金石為開</p>
      </div>

      <div class="footer__links">
        <div class="footer__column">
          <h4 class="footer__title">熱門服務</h4>
          <ul class="footer__list">
            <li class="footer__item">
              <RouterLink to="/divination">求籤問事</RouterLink>
            </li>
            <li class="footer__item">
              <RouterLink to="/godOffering">請神供奉</RouterLink>
            </li>
            <li class="footer__item">
              <RouterLink to="/blessing">點燈祈福</RouterLink>
            </li>
            <li class="footer__item">
              <RouterLink to="/master">老師親算</RouterLink>
            </li>
            <li class="footer__item">
              <RouterLink to="/store">開運商店</RouterLink>
            </li>
          </ul>
        </div>

        <div class="footer__column">
          <h4 class="footer__title">客戶服務</h4>
          <ul class="footer__list">
            <li class="footer__item">
              <RouterLink to="/member-center">會員中心</RouterLink>
            </li>
            <li class="footer__item">
              <a
                href="https://line.me/R/ti/p/@131gsonn"
                target="_blank"
                rel="noopener"
                >客服中心</a
              >
            </li>
          </ul>
        </div>

        <!-- 公司資訊 -->
        <div class="footer__column">
          <h4 class="footer__title">公司資訊</h4>
          <p>網站維護管理：神乎奇技文創有限公司</p>
          <p>公司統編：60755266</p>
          <p>公司地址：新北市板橋區雙十路二段10-3號7樓</p>
          <p>客服服務時間：週一至週五 09:00~17:00</p>
          <div class="footer__social">
            <a
              href="https://www.facebook.com/profile.php?id=100079259756919&mibextid=ZbWKwL"
              target="_blank"
              rel="noopener"
              >Facebook</a
            >
            ｜
            <a
              href="https://www.instagram.com/magic20.22?igsh=MTY1OGVmMWh5ZGo4Ng=="
              target="_blank"
              rel="noopener"
              >Instagram</a
            >
          </div>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <p class="footer__copyright">© 2025. ABC All rights reserved.</p>
      <div class="footer__policies">
        <RouterLink to="/policy">服務條款</RouterLink>
        ｜<RouterLink to="/privacy">隱私權政策</RouterLink> ｜<RouterLink
          to="/fraud-alert"
          >防詐騙提醒</RouterLink
        >
      </div>
    </div>
  </footer>
</template>

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
