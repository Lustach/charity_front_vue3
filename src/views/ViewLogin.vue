<script setup lang="ts">
import axios from "axios";
import { computed, ref, markRaw, inject, unref, watch } from "vue";
import type { Ref } from "vue";

import { useRouter, useRoute } from "vue-router";
import { useSchemaForm, SchemaFormFactory } from "formvuelate";
import LookupPlugin from "@formvuelate/plugin-lookup";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";
import { object } from "yup";
import { rules } from "@/compositions/validation_rules";
import ChInput from "@/components/ui/input/input.vue";
import ChButton from "@/components/ui/button/button.vue";
import { useAuthStore } from "@/stores/modules/auth/auth";
import { useProfileStore } from "@/stores/modules/profile/profile";
import useTimeOut from "@/components/compositions/utils/watchers";

markRaw(ChInput);
const SchemaFormWithPlugins = SchemaFormFactory([LookupPlugin({}), VeeValidatePlugin()]);

const authStore = useAuthStore();
const profileStore = useProfileStore();
const { timeOut } = useTimeOut;

type TForm = {
  isShowCodeField: boolean;
  emailOrPhone: string;
  password: string;
  code_2fa: string;
};
const form: Ref<TForm> = ref({
  isShowCodeField: false,
  emailOrPhone: "",
  password: "",
  code_2fa: "",
});

useSchemaForm(form);
const schema = ref({
  emailOrPhone: {
    component: ChInput,
    type: "email",
    placeholder: "E-mail или телефон",
    label: "E-mail или телефон",
    id: "emailOrPhone",
    error: "",
    maxWidth: "328px",
    condition: (model: TForm) => !model.isShowCodeField,
  },
  password: {
    component: ChInput,
    type: "password",
    placeholder: "Введите пароль",
    label: "Пароль",
    id: "password",
    maxWidth: "328px",
    error: "",
    options: [false],
  },
  code_2fa: {
    component: ChInput,
    type: "text",
    placeholder: "Код",
    label: "Код",
    id: "code_2fa",
    maxWidth: "328px",
    error: "",
    condition(model: TForm) {
      return model.isShowCodeField;
    },
  },
});
watch(
  () => form.value.emailOrPhone,
  (nV) => {
    if (nV) {
      schema.value.emailOrPhone.error = "";
    }
  },
  {
    deep: true,
  }
);
watch(
  () => form.value.password,
  (nV) => {
    if (nV) {
      schema.value.password.error = "";
    }
  },
  {
    deep: true,
  }
);
watch(
  () => form.value.code_2fa,
  (nV) => {
    if (nV) {
      schema.value.code_2fa.error = "";
    }
  },
  {
    deep: true,
  }
);
const validationSchema = computed(() => {
  if (form.value.isShowCodeField === false) {
    return object().shape({
      emailOrPhone: rules.emailOrPhone,
      password: rules.password,
    });
  } else if (form.value.isShowCodeField === true) {
    return object().shape({
      code_2fa: rules.code_2fa,
    });
  }
  return undefined;
});

const router = useRouter();
const route = useRoute();

let showNextStep = ref(false);
let isEmailError = ref(false);
let isPasswordError = ref(false);
let isCodeError = ref(false);
// let isShowCodeField = ref(false);
let isLoadingBtn = ref(false);

timeOut(isEmailError, 3500);
timeOut(isPasswordError, 3500);
timeOut(isCodeError, 3500);

async function login() {
  isLoadingBtn.value = true;
  let values = unref(form);
  try {
    const result = await authStore.loginUser({
      password: values.password,
      [values.emailOrPhone.includes("@") ? "email" : "phone_number"]: values.emailOrPhone,
    });
    if (profileStore.fillAllStepsFromStorage) {
      if (profileStore.fund.status !== "APPROVED") {
        router.push("/review_profile");
      } else {
        router.push("/lk/nko_info");
      }
    } else {
      router.push("/fill_profile");
    }
  } catch (e) {
    if (axios.isAxiosError(e))
      if (e.response.status === 401) {
        if (e.response.data.detail === "Неверный пароль") {
          schema.value.password.error = "Неверный пароль";
        } else if (e.response.data.detail === "Неверный e-mail или телефон") {
          schema.value.emailOrPhone.error = values.emailOrPhone.includes("@")
            ? "Данный e-mail не зарегистрирован"
            : "Данный телефон не зарегистрирован";
        }
      }
    if (e.response.status === 400) {
      if (e.response.data.otp[0] === "Invalid otp") {
        schema.value.code_2fa.error = "Неверный код";
      }
    }
    console.error(e);
  } finally {
    isLoadingBtn.value = false;
  }
}
</script>

<template>
  <section>
    <div class="form_container" @keypress.enter="login()">
      <h1 class="form_title">Авторизация в личном кабинете НКО</h1>
      <p class="form_subtitle">
        Введите вашу почту или телефон, указанные при регистрации, и пароль. Или пройдите
        <router-link to="/registration" style="color: var(--vblg-c-primary)"
          >регистрацию</router-link
        >.
      </p>
      <SchemaFormWithPlugins
        :schema="schema"
        :validation-schema="validationSchema"
        @submit="login"
      >
        <template #afterForm="{ validation }">
          <ChButton
            @click="login"
            :loading="isLoadingBtn"
            :disabled="!validation.meta.valid"
            >Продолжить</ChButton
          >
          <div class="form__link">
            <router-link class="vblg-link" to="/password?action=restore">
              Забыли пароль?
            </router-link>
          </div>
        </template>
      </SchemaFormWithPlugins>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@/assets/scss/ui/input.scss";
.form {
  &_container {
    max-width: 536px;
    margin: 0 auto;
  }
  &__link {
    max-width: 328px;
    margin: 5px auto 0 auto;
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
