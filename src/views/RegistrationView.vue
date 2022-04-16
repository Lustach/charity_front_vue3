<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";

import { ElCheckbox } from "element-plus";
import ChInput from "@/components/ui/input/input.vue";
import ChButton from "@/components/ui/button/button.vue";
import ChCheckbox from "@/components/ui/checkbox/checkbox.vue";
// import myButton from "@/ui/button.vue";
import { Props as FormField } from "@/components/ui/input/interface";
import {Props as FormCheckbox} from "@/components/ui/checkbox/interface"
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
  email: FormField;
  phone: FormField;
  password: FormField;
  passwordConfirm: FormField;
  // offerRules: FormCheckbox;
  // [index: string]: FormField; // предусматривает возможность добавления любого ключа типа стринг, что может вызвать неожиданное поведение
}

const form = ref<Form>({
  email: {
    modelValue: "",
    id: "email",
    label: "Еmail",
    placeholder: "Введите ваш email",
    type: "email",
    error: null,
  },
  phone: {
    modelValue: "",
    id: "phone",
    label: "Номер телефона",
    placeholder: "Введите номер телефона",
    type: "phone",
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
  passwordConfirm: {
    modelValue: "",
    id: "password_confirm",
    label: "Подтверждение пароля",
    placeholder: "Подтвердите пароль",
    type: "password",
    error: null,
  },
  // offerRules: {
  //   modelValue:  null,
  //   // Field's own value
  //   value: null,
  //   name: 'offer',
  //   rules: undefined,
  //   error: null,
  // },
});

//  TODO: для полной красоты нужно прописать matches для всех, так как i18 yup не работает ?
const schema = yup.object({
  email: yup
    .string()
    .matches(/\S+@\S+\.+(com|ru|org|net|info|io)$/, "Неверный формат эл. почты")
    .required(),
  phone: yup
    .string()
    .matches(/^\+7[0-9]{10}$/, "Невалидный номер телефона")
    .required(),
  password: yup.string().min(8).required(),
  password_confirm: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Повторите пароль"),
  // offerRules: yup.string().required(), // вот это должно быть array ?
  // privacyRules: yup.string().required(),
});

const { meta } = useForm({
  validationSchema: schema,
});

let isErrorRequest = false,
  isPhoneErrorRequest = false,
  validServiceRules = false,
  touchServiceRules = false,
  btnLoading = false;

let serviceRules: Array<string> = ref([]);
// watch(serviceRules, (o, n) => {
//   console.log(o, n);

//   if (n.length === 2 && !validServiceRules) {
//     validServiceRules = true;
//     touchServiceRules = true;
//   } else if (validServiceRules) {
//     validServiceRules = false;
//   }
// });
</script>

<template>
  <section>
    <div class="form_container" @keypress.enter="login()">
      <h1 class="form_title">Регистрация в личном кабинете НКО</h1>
      <p class="form_subtitle">
        Введите телефон или e-mail, чтобы зарегистрироваться, и придумайте надежный
        пароль. Или
        <router-link to="/login" style="color: #0f75bd">войдите</router-link>
        в свой профиль .
      </p>
      <!-- {{ meta }} -->
      <form class="form__container">
        <!-- <template v-if="!showCodeField"> -->
        <ChInput
          v-for="e in form"
          :key="e.id"
          :type="e.type"
          :placeholder="e.placeholder"
          :label="e.label"
          :id="e.id"
          v-model="e.modelValue"
          :error="e.error"
        />

        <!-- <ChCheckbox>
          <template #text>
            Соглашаюсь с
            <a
              style="text-decoration: underline; color: initial"
              href="http://localhost:8000/static/documents/Оферта_для_публичного_сбора_пожертвований.pdf"
              target="_blank"
              >офертой</a
            >
          </template>
        </ChCheckbox> -->
        <!-- <el-checkbox
          cy="registrationOffer"
          class="vblg-checkbox"
          name="serviceRules"
          label="offer"
          v-model="serviceRules"
          >Соглашаюсь с
          <a
            style="text-decoration: underline; color: initial"
            href="http://localhost:8000/static/documents/Оферта_для_публичного_сбора_пожертвований.pdf"
            target="_blank"
            >офертой</a
          >
        </el-checkbox>
        <el-checkbox
          cy="registrationPrivacy"
          class="vblg-checkbox"
          name="serviceRules"
          label="privacy"
          v-model="serviceRules"
          >Соглашаюсь на обработку
          <a
            style="text-decoration: underline; color: initial"
            href="http://localhost:8000/static/documents/Политика_в_отношении_обработки_ПД.pdf"
            target="_blank"
            >персональных данных</a
          >
        </el-checkbox> -->
        <div
          class="el-form-item__error"
          style="margin-top: 10px; margin-bottom: 15px; text-align: left !important"
          v-if="validServiceRules && touchServiceRules"
        >
          Заполните все поля
        </div>
        <!-- </template> -->
        <ChButton :disabled="!meta.valid">
          <template #text>Зарегистрироваться</template>
        </ChButton>
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
