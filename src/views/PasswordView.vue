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
import AppModal from "@/components/app/AppModal.vue";

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
  }),
  yup.object({
    password: yup.string().min(8).required(),
    password_confirm: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Повторите пароль"),
  }),
  yup.object({
    code_2fa: yup.string().min(6).max(6).required(),
  }),
]);

const authStore = useAuthStore();
const profileStore = useProfileStore();

const API = inject("API");
const router = useRouter();
const route = useRoute();

let showNextStep = ref(false);
let isShowCodeField = ref(false);
</script>

<template>
  <div class="form_container" @keypress.enter.prevent="createNewPassword">
    <h1 class="form_title">Восстановление пароля</h1>
    <p class="form_subtitle" v-if="$route.query.action === 'restore'">
      Пожалуйста, укажите email или телефон, который вы использовали для входа на сайт.
    </p>
    <p class="form_subtitle" v-else>Введите новый надежный пароль.</p>
    <FormWizard
      :validation-schema="schema"
      @submit="login"
      class="form__container"
      :showPrevStep="false"
      :showNextStep="showNextStep.value"
      nextStepText="Продолжить"
      submitText="Продолжить"
    >
      <FormStep>
        <!-- $route.query.action === 'restore' -->
        <ChInput
          v-if="!isShowCodeField"
          type="email"
          placeholder="E-mail или телефон"
          label="E-mail или телефон"
          id="emailOrPhone"
        >
        </ChInput>
      </FormStep>
      <!-- $route.query.action === 'create' -->
      <FormStep v-if="!isShowCodeField">
        <ChInput
          type="password"
          placeholder="Введите пароль"
          label="Пароль"
          id="password"
        />
        <ChInput
          type="password"
          placeholder="Подтвердите пароль"
          label="Подтверждение пароля"
          id="password_confirm"
        />
      </FormStep>
      <FormStep>
        <ChInput type="text" placeholder="Код" label="Код" id="code_2fa">
          <template v-if="isCodeError" #my-error-message>
            <span class="error-message"> Неверный код </span>
          </template>
        </ChInput>
      </FormStep>
    </FormWizard>
    <AppModal></AppModal>
    <!-- <p
      v-if="$route.query.action === 'restore' && !isShowCodeField"
      class="form_help"
      style="margin-top: 27px"
    >
      Если вы забыли e-mail или телефон, пожалуйста, обратитеть в нашу тех. поддержку:
      support@voblago .io
    </p>
    <app-modal
      :image="'../images/icons/hand-shake.svg'"
      :messages="[
        'Пароль успешно обновлен!',
        'Теперь вы можете войти в свой кабинет по новому паролю.',
      ]"
      @close="
        closeModal;
        $router.push('/login');
      "
      v-if="isShowModal"
    />
    <app-modal
      :image="'../images/icons/hand-shake.svg'"
      :messages="[
        'Письмо отправлено!',
        'Мы отправили письмо на вашу эл. почту. Пожалуйста, пройдите по ссылке в письме, чтобы подтвердить смену пароля.',
      ]"
      @close="closeModal(isShowModal2)"
      v-if="isShowModal2"
    /> -->
  </div>
</template>

<style scoped lang="scss">
.form {
  &_container {
    max-width: 430px !important;
  }
  &_help {
    font-style: normal;
    font-weight: 600;
    font-size: 13.23px;
    text-align: center;
    color: #0f75bd;
    max-width: 772px;
    width: 100%;
    margin: 0 auto;
  }

  &_subtitle {
    max-width: 854px;
    margin: 0 auto 16px auto;
  }
}
</style>
