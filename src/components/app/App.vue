<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import AppHeader from "@/components/app/header/AppHeader.vue";
import AppFooter from "@/components/app/AppFooter.vue";
</script>

<template>
  <main>
    <AppHeader />
    <a
      v-if="
        $route.path !== '/' &&
        $route.path !== '/fill_profile' &&
        $route.path !== '/review_profile' &&
        $route.path !== '/reject_profile'
      "
      @click="$router.go(-1)"
      class="go-back"
      ><img src="@/../images/icons/double-arrow.svg" alt="" /> Назад</a
    >
    <RouterView class="view" />
    <AppFooter />
  </main>
</template>

<style lang="scss">
@import "@/assets/base.css";
@import "@/assets/scss/style.scss";

.view {
  height: auto;
  flex: 1;
  width: 100%;
  margin-top: 69px;
  @media (max-width: 1024px) {
    padding: 0 2vw;
  }
}

* {
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: $vblg-subtitle2;
  // color: var(--clr-dark);
}

html,
body {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  @media (max-width: 850px) and(max-height: 480px) and(orientation: landscape) {
    zoom: 0.8;
  }
}

.go-back {
  position: fixed;
  z-index: 1000;
  left: 50px;
  top: 76px;
  color: var(--vblg-c-primary);
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  display: flex;

  img {
    margin-right: 9px;
  }

  @media screen and (max-width: 850px) {
    display: none;
  }
}

main {
  position: relative;
  padding-top: 69px;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  min-height: calc(100vh - 4px);
}
</style>
