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
} from "vue";
import useObject from "@/components/compositions/utils/useObject";
import * as yup from "yup";
import ChInput from "@/components/ui/input/input.vue";
import ChButton from "@/components/ui/button/button.vue";
import { Props as FormField } from "@/components/ui/input/interface";
import { setLocale } from "yup";
import FormWizard from "@/components/ui/form/FormWizard.vue";
import FormStep from "@/components/ui/form/FormStep.vue";

import { useAuthStore } from "@/stores/modules/auth.ts";
import { useProfileStore } from "@/stores/modules/profile.js";
const authStore = useAuthStore();
// const profileStore = useProfileStore();
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

interface Form {
  emailOrPhone: FormField;
  password: FormField;
  code_2fa: FormField;
  // [index: string]: FormField; // предусматривает возможность добавления любого ключа типа стринг, что может вызвать неожиданное поведение
}
type FormKeys = keyof Form;

const form = ref<Form>({
  emailOrPhone: {
    modelValue: "",
    id: "emailOrPhone",
    label: "E-mail или телефон",
    placeholder: "E-mail или телефон",
    type: "email",
    error: null,
  },
  password: {
    modelValue: "",
    id: "password",
    label: "Пароль",
    placeholder: "Введите пароль",
    type: "password",
    error: null,
  },
  code_2fa: {
    modelValue: "",
    id: "code_2fa",
    label: "Код",
    placeholder: "Код",
    type: "text",
    error: null,
  },
});
let showNextStep = ref(false);
async function test(values) {
  console.log(values, "test");
  // await nextTick();
  try {
    await authStore.loginUser({
      password: values.password,
      [values.emailOrPhone.indexOf("@") !== -1
        ? "email"
        : "phone_number"]: values.emailOrPhone,
    });
    const result = await API.user.meUser();
    authStore.$patch({
      userId: result.id,
      email: result.email,
      profileId: result.profile,
    });
    // await profileStore.initDataFromLocalStorage();
    // if (this.fillAllStepsFromStorage) {
    //   if (this.fund.status !== "APPROVED") {
    //     await this.$router.push("/review_profile");
    //   } else {
    //     await this.$router.push("/lk/nko_info");
    //   }
    // } else {
    //   await this.$router.push("/fill_profile");
    // }
  } catch (e) {
    // if (e?.response?.status === 401) {
    //   if (e?.response?.data?.detail === "Неверный пароль") {
    //     // isPasswordError = true;
    //   } else {
    //     // isErrorRequest = true;
    //   }
    // }
    // if (e?.response?.status === 400) {
    //   if (e?.response?.data?.otp[0] === "Invalid otp") {
    //     // isFormValid = false;
    //     // showCodeField = true;
    //   }
    // }
    console.error(e);
  }
  // showNextStep.value = true;
}
onMounted(() => {
  authStore.test();
  // console.log(JSON.parse(JSON.stringify(authStore)));
});
</script>

<template>
  <section>
    <div class="form_container" @keypress.enter="login()">
      <h1 class="form_title">Авторизация в личном кабинете НКО</h1>
      <p class="form_subtitle">
        Введите вашу почту или телефон, указанные при регистрации, и пароль. Или пройдите
        <router-link to="/registration" style="color: #0f75bd">регистрацию</router-link>.
      </p>
      {{ showNextStep.value }}
      <FormWizard
        :validation-schema="schema"
        @submit="test"
        class="form__container"
        :showPrevStep="false"
        :showNextStep="showNextStep.value"
        prevStepText="Назад"
        nextStepText="Продолжить"
        submitText="Войти"
      >
        <FormStep>
          <div v-for="e in form">
            <ChInput
              v-if="e.id !== 'code_2fa'"
              :key="e.id"
              :type="e.type"
              :placeholder="e.placeholder"
              :label="e.label"
              :id="e.id"
              v-model="e.modelValue"
              :error="e.error"
            />
          </div>
        </FormStep>
        <FormStep>
          <div v-for="e in form">
            <ChInput
              v-if="e.id === 'code_2fa'"
              :key="e.id"
              :type="e.type"
              :placeholder="e.placeholder"
              :label="e.label"
              :id="e.id"
              v-model="e.modelValue"
              :error="e.error"
            /></div
        ></FormStep>
        <div class="form__link">
          <router-link to="/password?action=restore"> Забыли пароль? </router-link>
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

      &:hover {
        cursor: pointer;
        border-bottom: 1px solid #0f75bd;
      }
    }
  }
}
</style>
