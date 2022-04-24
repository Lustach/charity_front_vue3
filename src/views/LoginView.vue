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
  toRaw,
  unref,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { useForm } from "vee-validate";
import { SchemaForm, useSchemaForm, SchemaFormFactory } from "formvuelate";
import LookupPlugin from "@formvuelate/plugin-lookup";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";
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

markRaw(ChInput);

const SchemaFormWithPlugins = SchemaFormFactory([
  LookupPlugin({
    // mapComponents: {
    //   string: "ChInput",
    //   array: "ChInput",
    // },
  }),
  VeeValidatePlugin(),
]);

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
const form = ref({
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
    condition: (model) => !model.isShowCodeField,
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
    condition(model) {
      return model.isShowCodeField;
    },
  },
});
const validationSchema = computed(() => {
  if (form.value.isShowCodeField === false) {
    return yup.object().shape({
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
    });
  } else if (form.value.isShowCodeField === true) {
    return yup.object().shape({
      code_2fa: yup.string().min(6).max(6).required(),
    });
  }
});

const API = inject("API");
const router = useRouter();
const route = useRoute();

let showNextStep = ref(false);
let emailOrPhoneErrorType = ref("");
let isEmailError = ref(false);
let isPasswordError = ref(false);
let isCodeError = ref(false);
let isShowCodeField = ref(false);
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
    if (e.response.status === 401) {
      if (e.response.data.detail === "Неверный пароль") {
        isPasswordError.value = true;
      } else if (e.response.data.detail === "Неверный e-mail или телефон") {
        isEmailError.value = true;
        values.emailOrPhone.includes("@")
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
        <router-link to="/registration" style="color: var(--vblg-c-primary)">регистрацию</router-link>.
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
      {{ form }}
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
      color: var(--vblg-c-primary);
    }
  }
}
</style>
