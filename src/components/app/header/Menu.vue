<template>
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
          <div class="dropdown-item_bar" v-if="key < iconLinks.length - 1"></div>
        </router-link>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
import { mapActions, mapGetters } from "pinia";
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from "element-plus";
import { useAuthStore } from "@/stores/modules/auth/auth";
import { useProfileStore } from "@/stores/modules/profile/profile";
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
  &:deep {
    .el-dropdown-menu__item {
      justify-content: center !important;
    }
  }
}

.el-dropdown__popper {
  &:deep {
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
</style>
