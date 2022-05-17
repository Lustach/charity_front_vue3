<script setup lang="ts">
import { computed, ref, markRaw, inject, unref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { object } from "yup";
import LookupPlugin from "@formvuelate/plugin-lookup";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";
import { useSchemaForm, SchemaFormFactory } from "formvuelate";
import { rules } from "@/compositions/validation_rules";
import ChInput from "@/components/ui/input/input.vue";
import ChButton from "@/components/ui/button/button.vue";
import { useAuthStore } from "@/stores/modules/auth/auth";
import { useProfileStore } from "@/stores/modules/profile/profile";
import AppModal from "@/components/app/AppModal.vue";

markRaw(ChInput);
const SchemaFormWithPlugins = SchemaFormFactory([LookupPlugin({}), VeeValidatePlugin()]);

const validationSchema = computed(() => {
  if (!isShowCodeField.value && !isShowPasswordField.value) {
    return object().shape({
      emailOrPhone: rules.emailOrPhone,
    });
  } else if (!isShowCodeField.value && isShowPasswordField.value) {
    return object().shape({
      password: rules.password,
      passwordConfirm: rules.passwordConfirm,
    });
  } else if (isShowCodeField.value) {
    return object().shape({
      code_2fa: rules.code_2fa,
    });
  }
  return undefined;
});

const form = ref({
  emailOrPhone: "",
  password: "",
  passwordConfirm: "",
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
    condition: () => !isShowCodeField.value && !isShowPasswordField.value,
  },
  password: {
    component: ChInput,
    type: "password",
    placeholder: "Введите пароль",
    label: "Пароль",
    id: "password",
    maxWidth: "328px",
    error: "",
    condition: () => !isShowCodeField.value && isShowPasswordField.value,
  },
  passwordConfirm: {
    component: ChInput,
    type: "password",
    placeholder: "Введите пароль",
    label: "Пароль",
    id: "passwordConfirm",
    maxWidth: "328px",
    error: "",
    condition: () => !isShowCodeField.value && isShowPasswordField.value,
  },
  code_2fa: {
    component: ChInput,
    type: "text",
    placeholder: "Код",
    label: "Код",
    id: "code_2fa",
    maxWidth: "328px",
    error: "",
    condition: () => isShowCodeField.value,
  },
});

//store
const authStore = useAuthStore();
const profileStore = useProfileStore();
//app
const API = inject("API");
const useNotification = inject("useNotification");
//router
const router = useRouter();
const route = useRoute();
//flags
let isShowCodeField = ref(false);
let isShowPasswordField = ref(false);
let isBtnLoading = ref(false);
//modals
let isPasswordReseted = ref(false);
let isEmailSended = ref(false);

async function createNewPassword() {
  //todo
  isBtnLoading.value = true;
  if (authStore.is2faEnabled && !isShowCodeField.value) {
    isShowCodeField.value = true;
    isBtnLoading.value = false;
    return;
  }
  let values = unref(form);
  if (route.query.action === "create") {
    isShowPasswordField.value = true;
    try {
      await API.user.resetPasswordConfirmSpacer({
        new_password: values.password,
        re_new_password: values.passwordConfirm,
        uid: localStorage.getItem("ResU"),
        token: localStorage.getItem("ResT"),
        otp: isShowCodeField.value ? values.code_2fa : null,
      });
      isPasswordReseted.value = true;
      isShowCodeField.value = false;
      localStorage.removeItem("ResU");
      localStorage.removeItem("ResT");
    } catch (e) {
      console.error(e);
      useNotification();
    } finally {
      isBtnLoading.value = false;
    }
  } else if (route.query.action === "restore") {
    try {
      await API.user.resetPasswordEmail({
        email: values.emailOrPhone,
        otp: isShowCodeField.value ? values.code_2fa : null,
      });
      isShowPasswordField.value = true;
      isEmailSended.value = true;
      isShowCodeField.value = false;
      await router.push("password?action=create");
    } catch (e) {
      if (e.response.data.otp.length) {
        authStore.is2faEnabled = true;
        isShowCodeField.value = true;
      }
      console.error(e.response);
      useNotification();
    } finally {
      isBtnLoading.value = false;
    }
  }
}

onMounted(() => {
  if (route.query.action === "create") isShowPasswordField.value = true;
});

watch(
  () => route.query.action,
  (nV) => {
    if (nV === "create") {
      isShowPasswordField.value = true;
    } else {
      isShowPasswordField.value = false;
    }
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div class="form_container" @keypress.enter.prevent="createNewPassword">
    <h1 class="form_title">Восстановление пароля</h1>
    <p class="form_subtitle" v-if="$route.query.action === 'restore'">
      Пожалуйста, укажите email или телефон, который вы использовали для входа на сайт.
    </p>
    <p class="form_subtitle" v-else>Введите новый надежный пароль.</p>
    <SchemaFormWithPlugins
      :schema="schema"
      :validation-schema="validationSchema"
      @submit="createNewPassword"
    >
      <template #afterForm="{ validation }">
        <ChButton
          @click="createNewPassword"
          :loading="isBtnLoading"
          :disabled="!validation.meta.valid"
          >Продолжить
        </ChButton>
      </template>
    </SchemaFormWithPlugins>
    <p
      v-if="$route.query.action === 'restore' && !isShowCodeField"
      class="form_help"
      style="margin-top: 27px"
    >
      Если вы забыли e-mail или телефон, пожалуйста, обратитесь в нашу тех. поддержку:
      <a class="vblg-link" href="mailto:info@voblago.io">info@voblago.io</a>
    </p>
    <AppModal
      @close="
        $router.push('/login');
        isPasswordReseted = false;
      "
      :modelValue="isPasswordReseted"
      :image="'../images/icons/hand-shake.svg'"
      :imgSize="60"
      :messages="[
        'Пароль успешно обновлен!',
        'Теперь вы можете войти в свой кабинет по новому паролю.',
      ]"
    >
    </AppModal>
    <AppModal
      @close="isEmailSended = false"
      :modelValue="isEmailSended"
      :image="'../images/icons/hand-shake.svg'"
      :imgSize="60"
      :messages="[
        'Письмо отправлено!',
        'Мы отправили письмо на вашу эл. почту. Пожалуйста, пройдите по ссылке в письме, чтобы подтвердить смену пароля.',
      ]"
    >
    </AppModal>
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
    font-size: 14px;
    text-align: center;
    color: var(--vblg-c-primary);
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
