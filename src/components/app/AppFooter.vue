<template>
  <footer class="footer footer__container">
    <div class="footer__col-container">
      <div class="footer__col-wrapper">
        <logoMobile></logoMobile>
        <p>г. Санкт-Петербург, ул. Ждановская, д.45, лит. А, пом. 64Н, офис 1</p>
        <a class="footer__email" href="mailto:info@voblago.io">info@voblago.io</a>
      </div>
      <div class="footer__col-wrapper">
        <ul class="footer__col-list">
          <li>
            <h3>
              <router-link to="/about">Документы</router-link>
            </h3>
          </li>
          <li>
            <a
              href="http://localhost:8000/static/documents/Политика_в_отношении_обработки_ПД.pdf"
              target="_blank"
              >Персональные данные</a
            >
          </li>
          <li>
            <a
              href="http://localhost:8000/static/documents/Оферта_для_публичного_сбора_пожертвований.pdf"
              target="_blank"
              >Публичная оферта</a
            >
          </li>
        </ul>
      </div>
      <div class="footer__col-wrapper">
        <ul class="footer__col-list">
          <li>
            <h3>
              <router-link to="/about">О платформе</router-link>
            </h3>
          </li>
        </ul>
      </div>
      <div class="footer__col-wrapper">
        <ul class="footer__col-list">
          <li>
            <h3>
              <router-link to="/about">Помочь воБлаго</router-link>
            </h3>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer__col-wrapper--mobile">
      <logoMobile></logoMobile>
      <div class="footer__col-wrapper-address" style="display: flex">
        <p>г. Санкт-Петербург, ул. Ждановская, д.45, лит. А, пом. 64Н, офис 1</p>
        <a class="footer__email" href="mailto:info@voblago.io">info@voblago.io</a>
      </div>
    </div>
    <span class="footer__c">© “Воблаго” Все права защищены</span>
  </footer>
</template>

<script>
export default {
  name: "app-footer",
  components: {
    logoMobile: () => import("@/assets/iconsVue/logoMobile"),
  },
};
</script>

<style lang="scss" scoped></style>
