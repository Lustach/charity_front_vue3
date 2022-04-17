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
                style="display: flex; position: relative"
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
                    <div
                      v-for="(e, key) in iconLinks"
                      :key="key"
                      class="dropdown-item_wrapper"
                      @click="logout(e)"
                    >
                      <el-dropdown-item>
                        <router-link style="display: flex; position: relative" :to="e.to">
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
                        </router-link>
                      </el-dropdown-item>
                      <div
                        class="dropdown-item_bar"
                        v-if="key < iconLinks.length - 1"
                      ></div>
                    </div>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
            <router-link to="/registration" v-else style="display: flex">
              <button class="header__menu--item">Кабинет НКО</button>
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
export default {
  name: "app-header",
  components: {
    "el-dropdown": ElDropdown,
    "el-dropdown-item": ElDropdownItem,
    "el-dropdown-menu": ElDropdownMenu,
  },
  mounted() {
    console.log(this.$API);
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
    ...mapGetters(useAuthStore, ["loggedIn", "getFillAllStepsFromStorage"]),
  },
};
</script>

<style lang="scss" scoped>
.el-dropdown {
  margin-left: 20px;
}
.el-dropdown-menu {
  width: 367px;
  background: #ffffff;
  border: 2px solid #b0ceec;
  box-sizing: border-box;
  border-radius: 10px;
  top: 50px !important;
  padding: 26px 0;
  transform: scale(0.75);

  &:v-deep {
    button,
    li {
      margin: 0;
      padding: 0;
    }

    li {
      a {
        padding: 0 51px;
      }
    }

    button {
      font-style: normal;
      font-weight: normal;
      font-size: 22px !important;
      line-height: 30px !important;
      text-align: center !important;
      color: #0f75bd !important;
      margin: 15px 0;
      width: 100%;
    }

    .popper__arrow {
      display: none !important;
    }
  }
}

.dropdown-item {
  &_wrapper {
    display: flex;
    flex-direction: column;
  }

  &_bar {
    background: #dfebf7;
    transform: matrix(1, 0, 0, -1, 0, 0);
    width: 262px;
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
    bottom: 6px;
  }
}
</style>
