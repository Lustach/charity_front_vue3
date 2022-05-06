<script setup lang="ts">
import { computed, ref, unref, watch, markRaw } from "vue";
import LookupPlugin from "@formvuelate/plugin-lookup";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";
import { useRouter, useRoute } from "vue-router";

import { useSchemaForm, SchemaFormFactory } from "formvuelate";
import { object, bool } from "yup";
import { rules } from "@/compositions/validation_rules";

import ChInput from "@/components/ui/input/input.vue";
import ChButton from "@/components/ui/button/button.vue";
import ChCheckbox from "@/components/ui/checkbox/checkbox.vue";

import { useAuthStore } from "@/stores/modules/auth";
import { useProfileStore } from "@/stores/modules/profile";
const authStore = useAuthStore();
const profileStore = useProfileStore();

markRaw(ChInput);
markRaw(ChCheckbox);
const SchemaFormWithPlugins = SchemaFormFactory([LookupPlugin({}), VeeValidatePlugin()]);

const validationSchema = object({
  email: rules.email,
  phone: rules.phone,
  password: rules.password,
  passwordConfirm: rules.passwordConfirm,
  offerRules: bool().required(), // вот это должно быть array ?
  privacyRules: bool().required(),
});
const form = ref({
  email: "",
  phone: "",
  password: "",
  passwordConfirm: "",
  offerRules: "",
  privacyRules: "",
});
useSchemaForm(form);

const schema = ref({
  email: {
    component: ChInput,
    type: "email",
    placeholder: "Введите ваш email",
    label: "E-mail",
    id: "email",
    error: "",
    maxWidth: "328px",
  },
  phone: {
    component: ChInput,
    type: "phone",
    placeholder: "Введите номер телефона",
    label: "Номер телефона",
    id: "phone",
    error: "",
    maxWidth: "328px",
  },
  password: {
    component: ChInput,
    type: "password",
    placeholder: "Введите пароль",
    label: "Пароль",
    id: "password",
    maxWidth: "328px",
    error: "",
  },
  passwordConfirm: {
    component: ChInput,
    type: "password",
    placeholder: "Подтвердите пароль",
    label: "Подтверждение пароля",
    id: "passwordConfirm",
    maxWidth: "328px",
    error: "",
  },
});

let modelValue = ref(true);
let validServiceRules = ref(false);
let touchServiceRules = ref(false);
let isLoadingBtn = ref(false);
const router = useRouter();
const route = useRoute();
// let serviceRules: Array<string> = ref([]);
async function signUp() {
  let values = unref(form);
  localStorage.clear();
  authStore.$reset();
  profileStore.$reset();
  // this.resetProfileState();
  // this.resetUserState();
  const data = {
    password: values.password,
    username: values.email,
    re_password: values.passwordConfirm,
    email: values.email,
    phone_number: values.phone,
  };
  isLoadingBtn.value = true;
  try {
    await authStore.signUp(data);
    if (localStorage.getItem("isEmailActivation")) {
      localStorage.removeItem("isEmailActivation");
    }
    await router.push("/fill_profile");
  } catch (e) {
    if (e.response.status === 400) {
      if (e.response.data.email) {
        isErrorRequest = true;
      }
      if (e.response.data.phone_number) {
        isPhoneErrorRequest = true;
      }
      console.error(e.response);
    }
  } finally {
    isLoadingBtn.value = false;
  }
}

</script>

<template>
  <section>
    <div class="form_container" @keypress.enter="signUp">
      <h1 class="form_title">Регистрация в личном кабинете НКО</h1>
      <p class="form_subtitle">
        Введите телефон или e-mail, чтобы зарегистрироваться, и придумайте надежный
        пароль. Или
        <router-link to="/login" style="color: var(--vblg-c-primary)"
          >войдите</router-link
        >
        в свой профиль .
      </p>
      <form class="form__container">
        <!-- <template v-if="!showCodeField"> -->
        <SchemaFormWithPlugins
          :schema="schema"
          :validation-schema="validationSchema"
          @submit="signUp"
        >
          <template #afterForm="{ validation }">
            <ChCheckbox name="offerRules" :value="false">
              <template #text>
                <p>
                  Соглашаюсь с
                  <a
                    style="text-decoration: underline; color: initial"
                    href="http://localhost:8000/static/documents/Оферта_для_публичного_сбора_пожертвований.pdf"
                    target="_blank"
                    >офертой</a
                  >
                </p>
              </template>
            </ChCheckbox>
            <ChCheckbox name="privacyRules" :value="false">
              <template #text>
                <p>
                  Соглашаюсь на обработку
                  <a
                    style="text-decoration: underline; color: initial"
                    href="http://localhost:8000/static/documents/Политика_в_отношении_обработки_ПД.pdf"
                    target="_blank"
                    >персональных данных</a
                  >
                </p>
              </template>
            </ChCheckbox>
            <ChButton
              @click="signUp"
              :loading="isLoadingBtn"
              :disabled="!validation.meta.valid"
              >Продолжить</ChButton
            >
          </template>
        </SchemaFormWithPlugins>
        <div
          class="el-form-item__error"
          style="margin-top: 10px; margin-bottom: 15px; text-align: left !important"
          v-if="validServiceRules && touchServiceRules"
        >
          Заполните все поля
        </div>
        <!-- </template> -->
        <!-- <ChButton :disabled="!meta.valid"> Зарегистрироваться </ChButton> -->
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
<style lang="scss">
@import "@/assets/scss/ui/checkbox.scss";
</style>
