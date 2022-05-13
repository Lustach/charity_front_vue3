<script setup lang="ts">
import axios from "axios";
import { computed, ref, markRaw, inject, unref, watch } from "vue";
const API = inject("API");
//store
import { useAuthStore } from "@/stores/modules/auth";
import { useProfileStore } from "@/stores/modules/profile";
let authStore = useAuthStore();
// components
import ChButton from "@/components/ui/button/button.vue";
import SecurityChangePassword from "@/components/pages/Security/SecurityChangePassword.vue";
//modals
import Security2FaEnableStep1 from "@/components/pages/Security/Security2FaEnableStep1.vue";
import Security2FaEnableStep2 from "../components/pages/Security/Security2FaEnableStep2.vue";

// 2Fa steps
let isEnable2FaStep1 = ref(false);
let isEnable2FaStep2 = ref(true);

let isDisable2FaStep1 = ref(false);


//
let isBtn2FaLoading = ref(false);

let info2Fa = ref({
  qrCode: "",
  code: "",
});

async function enable2Fa() {
  isBtn2FaLoading.value = true;
  if (authStore.is2faEnabled) {
    // isDisable2FaStep1.value = true;
  } else {
    const result = await API.user.prepare2Fa();
    info2Fa.value.qrCode = result.qrcode;
    info2Fa.value.code_2fa = result.code_2fa;
    isEnable2FaStep1.value = true;
  }
  isBtn2FaLoading.value = false;
}
</script>

<template>
  <section>
    <SecurityChangePassword></SecurityChangePassword>
    <ChButton class="my-btn" @click="enable2Fa" :loading="isBtn2FaLoading"
      >Включить защиту</ChButton
    >

    <Security2FaEnableStep1 :modelValue="isEnable2FaStep1" @showStep2="showStep2()" :code="info2Fa.code"></Security2FaEnableStep1>
    <!-- <Security2FaEnableStep2 :modelValue="isEnable2FaStep2"></Security2FaEnableStep2> -->
  </section>
</template>

<style scoped lang="scss">
@import "@/assets/scss/ui/input.scss";
.primary_text {
  color: #0f75bd;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 13.23px;
  text-align: left;
  //width: max-content;
  @media (max-width: 768px) {
    width: auto;
  }

  a {
    border-bottom: 1px solid #0f75bd;
    color: inherit;
  }
}
.my-btn {
  max-width: 270px;
}
.form {
  &_container {
    max-width: 420px;
    margin: 0 auto;
  }
  &__link {
    max-width: 420px;
    margin: 0 auto;
    text-align: right;
    a {
      margin-top: -8px;
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      color: var(--vblg-c-primary);
    }
  }
}
</style>
