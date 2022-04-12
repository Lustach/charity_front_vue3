<script setup lang="ts">
import { computed, ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import ChInput from "@/components/ui/input/input.vue";
import ChButton from "@/components/ui/button/button.vue";
// import myButton from "@/ui/button.vue";
import { Props as FormField } from "@/components/ui/input/interface";

import { setLocale } from "yup";
// TODO: вообще лучше не использовать генераторы форм по типу yup или zod, так как в случае необходимости гибких настроек, можно потратить
// очень много времени не получив результата (use <Field></Field> <Form></Form> and options API)
setLocale({
  mixed: {
    required: "Обязательное поле",
  },
  string: {
    email: "Невалидный e-mail",
    min: "Минимальная длина ${min} символов",
  },
});

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

const defaultForm = computed(() => {
  let result = Object.keys(form.value)
    .filter((key) => key.includes("emailOrPhone") || key.includes("password"))
    .reduce((cur: object, key) => {
      return Object.assign(cur, { [key]: form.value[key as FormKeys] }); // or key as keyof Form or key if used index in iterface or key as FormKeys
    }, {});
  return result as Form;
});
//  TODO: для полной красоты нужно прописать matches для всех, так как i18 yup не работает ?
const schema = yup.object({
  code_2fa: yup.string().max(6).required(),
  emailOrPhone: yup
    .string()
    .required("Заполните поле")
    .test("test-name", "Введите валидный e-mail или телефон", function (value) {
      const emailRegex = /\S+@\S+\.+(com|ru|org|net|info|io)$/;
      const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
      if (value) {
        let isValidEmail = emailRegex.test(value);
        let isValidPhone = phoneRegex.test(value);
        if (!isValidEmail && !isValidPhone) {
          return false;
        }
      }
      return true;
    }),
  // phone: yup.string().matches(phoneRegExp, "Невалидный номер телефона").required(),
  password: yup.string().min(8).required(),
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
      {{ defaultForm }}
      <!-- {{ meta }} -->
      <form class="form__container">
        <!-- <template v-if="!showCodeField"> -->
        <ChInput
          v-for="e in defaultForm"
          :key="e.id"
          :type="e.type"
          :placeholder="e.placeholder"
          :label="e.label"
          :id="e.id"
          v-model="e.modelValue"
          :error="e.error"
        />
        <!-- </template> -->
        <ChButton />
        <!-- <my-button title="Зарегистрироваться" :disabled="!meta.valid"></my-button> -->
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
.form_container {
  max-width: 536px;
  margin: 0 auto;
}
</style>
