<script setup lang="ts">
import {
  computed,
  ref,
  onMounted,
  reactive,
  markRaw,
  nextTick,
  getCurrentInstance,
  inject,
  watch,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import useObject from "@/components/compositions/utils/useObject";
import * as yup from "yup";
import ChInput from "@/components/ui/input/input.vue";
import ChButton from "@/components/ui/button/button.vue";
import { setLocale } from "yup";
import FormWizard from "@/components/ui/form/FormWizard.vue";
import FormStep from "@/components/ui/form/FormStep.vue";
import { useAuthStore } from "@/stores/modules/auth.ts";
import { useProfileStore } from "@/stores/modules/profile.ts";
const authStore = useAuthStore();
const profileStore = useProfileStore();

import useTimeOut from "@/components/compositions/utils/watchers";
const { timeOut } = useTimeOut;
// TODO: вообще лучше не использовать генераторы форм по типу yup или zod, так как в случае необходимости гибких настроек, можно потратить
// очень много времени не получив результата (use <Field></Field> <Form></Form> and options API)
setLocale({
  mixed: {
    required: "Обязательное поле",
  },
  string: {
    email: "Невалидный e-mail",
    min: "Минимальная длина ${min} символов",
    max: "Максимальная длина ${max} символов",
  },
});
//  TODO: для полной красоты нужно прописать matches для всех, так как i18 yup не работает ?
const schema = ref([
  yup.object({
    emailOrPhone: yup
      .string()
      .required("Заполните поле")
      .test("test-name", "Неверный e-mail или телефон", function (value) {
        if (value === "") {
          return false;
        } else {
          if (
            value &&
            (new RegExp(/\S+@\S+\.+(com|ru|org|net|info|io)$/).test(value) ||
              new RegExp(/^\+7[0-9]{10}$/).test(value))
          ) {
            return true;
          } else {
            return false;
          }
        }
      }),
    password: yup.string().min(8).required(),
  }),
  yup.object({
    code_2fa: yup.string().min(6).max(6).required(),
  }),
]);
const API = inject("API");
const router = useRouter();
const route = useRoute();

let showNextStep = ref(false);
let emailOrPhoneErrorType = ref("");
let isEmailError = ref(false);
let isPasswordError = ref(false);
let isCodeError = ref(false);
let isShowCodeField = ref(false);

timeOut(isEmailError, 3500);
timeOut(isPasswordError, 3500);
timeOut(isCodeError, 3500);

async function login(values) {
  try {
    await authStore.loginUser({
      password: values.password,
      [values.emailOrPhone.indexOf("@") !== -1
        ? "email"
        : "phone_number"]: values.emailOrPhone,
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
    if (e.response.status === 401) {
      if (e.response.data.detail === "Неверный пароль") {
        isPasswordError.value = true;
      } else if (e.response.data.detail === "Неверный e-mail или телефон") {
        isEmailError.value = true;
        values.emailOrPhone.indexOf("@") !== -1
          ? (emailOrPhoneErrorType.value = "e-mail")
          : (emailOrPhoneErrorType.value = "телефон");
      }
    }
    if (e.response.status === 400) {
      if (e.response.data.otp[0] === "Invalid otp") {
        showNextStep.value = true;
      }
    }
    console.error(e);
  }
}
</script>

<template>
  <section>
    <div class="form_container" @keypress.enter="login()">
      <h1 class="form_title">Авторизация в личном кабинете НКО</h1>
      <p class="form_subtitle">
        Введите вашу почту или телефон, указанные при регистрации, и пароль. Или пройдите
        <router-link to="/registration" style="color: #0f75bd">регистрацию</router-link>.
      </p>
      <FormWizard
        :validation-schema="schema"
        @submit="login"
        class="form__container"
        :showPrevStep="false"
        :showNextStep="showNextStep.value"
        prevStepText="Назад"
        nextStepText="Продолжить"
        submitText="Войти"
      >
        <FormStep>
          <ChInput
            type="email"
            placeholder="E-mail или телефон"
            label="E-mail или телефон"
            id="emailOrPhone"
          >
            <template v-if="isEmailError" #my-error-message>
              <span class="error-message">
                Данный {{ emailOrPhoneErrorType }} не зарегистрирован
              </span>
            </template>
          </ChInput>
          <ChInput
            type="password"
            placeholder="Введите пароль"
            label="Пароль"
            id="password"
          >
            <template v-if="isPasswordError" #my-error-message>
              <span class="error-message"> Неверный пароль </span>
            </template>
          </ChInput>
        </FormStep>
        <FormStep>
          <ChInput type="text" placeholder="Код" label="Код" id="code_2fa">
            <template v-if="isCodeError" #my-error-message>
              <span class="error-message"> Неверный код </span>
            </template>
          </ChInput>
        </FormStep>
        <div class="form__link">
          <router-link class="vblg-link" to="/password?action=restore"> Забыли пароль? </router-link>
        </div>
      </FormWizard>
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
    margin: 0 auto;
    text-align: right;
    a {
      margin-top: -8px;
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      color: #0f75bd;
    }
  }
}
</style>
