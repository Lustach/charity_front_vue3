<script setup lang="ts">
import { computed, ref, onMounted, reactive, markRaw } from "vue";
import useObject from "@/components/compositions/utils/useObject";
import {
  useForm,
  useValidateForm,
  useResetForm,
  Field,
  ErrorMessage,
} from "vee-validate";
import * as yup from "yup";
import ChInput from "@/components/ui/input/input.vue";
import ChButton from "@/components/ui/button/button.vue";
// import myButton from "@/ui/button.vue";
import { Props as FormField } from "@/components/ui/input/interface";

import { setLocale } from "yup";

import FormWizard from "@/components/ui/form/FormWizard.vue";
import FormStep from "@/components/ui/form/FormStep.vue";
// TODO: вообще лучше не использовать генераторы форм по типу yup или zod, так как в случае необходимости гибких настроек, можно потратить
// очень много времени не получив результата (use <Field></Field> <Form></Form> and options API)
setLocale({
  mixed: {
    required: "Обязательное поле",
  },
  string: {
    email: "Невалидный e-mail",
    min: "Минимальная длина ${min} символов",
    max: "Максимальная длина ${max} символов"
  },
});
//  TODO: для полной красоты нужно прописать matches для всех, так как i18 yup не работает ?
const schema = [
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
];

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

const { meta } = useForm({
  validationSchema: schema,
});
</script>

<template>
  <section>
    <div class="form_container" @keypress.enter="login()">
      <h1 class="form_title">Авторизация в личном кабинете НКО</h1>
      <p class="form_subtitle">
        Введите вашу почту или телефон, указанные при регистрации, и пароль. Или пройдите
        <router-link to="/registration" style="color: #0f75bd">регистрацию </router-link>.
      </p>
      <FormWizard
        :validation-schema="schema"
        @submit="onSubmit"
        class="form__container"
        :showPrevStep="false"
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
