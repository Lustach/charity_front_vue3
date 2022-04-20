<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <router-link class="link" to="/">
          <!-- <img src="@/assets/icons/logo-iphone.png" alt="" v-if="$store.state.isIphone"> -->
          <img src="@/assets/icons/logo.svg" alt="" />
        </router-link>
        <div class="header__menu" cy="header__menu">
          <template
            v-if="$route.name !== 'FillProfile' && $route.name !== 'ReviewProfile'"
          >
            <template v-if="loggedIn && getFillAllStepsFromStorage">
              <router-link
                :class="{ 'vblg-link': e.to !== $route.fullPath && !e.disabled }"
                style="
                  display: flex;
                  position: relative;
                  margin: 0 auto;
                  height: fit-content;
                "
                v-for="(e, key) in links"
                :key="key"
                :to="e.to"
                :disabled="e.disabled"
                :event="e.disabled ? '' : 'click'"
              >
                <button
                  :cy="{
                    'header__menu--item-disabled': e.disabled,
                    'header__menu--item-active': !e.disabled,
                  }"
                  class="header__menu--item"
                  :class="{
                    'header__menu--item-disabled': e.disabled,
                    'header__menu--item-active': !e.disabled,
                  }"
                >
                  {{ e.title }}
                </button>
              </router-link>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <img
                    cy="menu"
                    src="@/assets/images/icons/lk-person.jpg"
                    style="zoom: 0.7; cursor: pointer"
                    alt=""
                  />
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <router-link
                      v-for="(e, key) in iconLinks"
                      :key="key"
                      class="dropdown-item_wrapper"
                      style="display: flex; position: relative; margin: 0 auto"
                      :to="e.to"
                      @click="logout(e)"
                    >
                      <el-dropdown-item>
                        <button class="header__menu--item" v-if="!e.icon">
                          {{ e.title }}
                        </button>
                        <button
                          class="header__menu--item header__menu--item_dropdown"
                          cy="logout"
                          v-else
                          @click="$emit('exit')"
                        >
                          <img src="@/assets/images/icons/exit.svg" alt="" />
                          {{ e.title }}
                        </button>
                      </el-dropdown-item>
                      <div
                        class="dropdown-item_bar"
                        v-if="key < iconLinks.length - 1"
                      ></div>
                    </router-link>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
            <router-link to="/registration" v-else style="display: flex">
              <button class="header__menu--item vblg-link">Кабинет НКО</button>
            </router-link>
          </template>
          <template v-else>
            <button class="header__menu--item" @click="$emit('exit')">Выйти</button>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "pinia";
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from "element-plus";
import { useAuthStore } from "@/stores/modules/auth.ts";
import { useProfileStore } from "@/stores/modules/profile.ts";
export default {
  name: "app-header",
  components: {
    "el-dropdown": ElDropdown,
    "el-dropdown-item": ElDropdownItem,
    "el-dropdown-menu": ElDropdownMenu,
  },
  data: () => ({
    links: [
      {
        title: "Аналитика",
        to: "/lk/analytics",
        disabled: false,
      },
      {
        title: "Терминалы",
        to: "/lk/terminals",
        disabled: false,
      },
      {
        title: "Программы",
        to: "/programs",
        disabled: true,
      },
      {
        title: "Отчетность",
        to: "/reporting",
        disabled: true,
      },
      {
        title: "Страница НКО",
        to: "/lk/nko_info",
        // disabled: true,
      },
    ],
    iconLinks: [
      {
        title: "Личные настройки",
        to: "/lk/settings",
      },
      {
        title: "Безопасность",
        to: "/lk/security",
      },
      {
        title: "Реквизиты НКО",
        to: "/lk/requisite",
      },
      {
        title: "Сгенерировать QR",
        to: "/lk/generate_qr",
      },
      {
        title: "Крипто виджет",
        to: "/lk/crypto_widget",
      },
      {
        title: "Выйти из аккаунта",
        to: "/",
        icon: "exit",
      },
    ],
  }),
  methods: {
    ...mapActions(useAuthStore, ["logoutUser"]),
    logout(e) {
      if (e.icon === "exit") this.logoutUser();
    },
  },
  computed: {
    ...mapGetters(useAuthStore, ["loggedIn"]),
    ...mapGetters(useProfileStore, ["getFillAllStepsFromStorage"]),
  },
};
</script>

<style lang="scss">
.el-dropdown-menu {
  &__item {
    &:hover {
      cursor: pointer;
      .header__menu--item {
        color: #62b8ef !important;
      }
    }
  }
  &:v-deep {
    .el-dropdown-menu__item {
      justify-content: center !important;
    }
  }
}

.el-dropdown__popper {
  &:v-deep {
    .header__menu--item {
      font-weight: 400 !important;
    }
  }
  // padding: 40px !important;
}
.dropdown-item {
  &_wrapper {
    display: flex;
    flex-direction: column;
  }

  &_bar {
    background: #dfebf7;
    transform: matrix(1, 0, 0, -1, 0, 0);
    width: 180px;
    height: 3px;
    margin: 0 auto;
  }
}

.router-link-active .header__menu--item-active {
  color: #0f75bd !important;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #0f75bd;
    left: 0;
    bottom: 0;
  }
}
</style>

<style lang="scss" scoped></style>
