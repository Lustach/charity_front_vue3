<script setup lang="ts">
import { computed, ref, markRaw, inject, unref, watch } from "vue";
//store
import { useAuthStore } from "@/stores/modules/auth/auth";
import { useProfileStore } from "@/stores/modules/profile/profile";
//router
import { useRouter, useRoute } from "vue-router";
//validation
import { useSchemaForm, SchemaFormFactory } from "formvuelate";
import LookupPlugin from "@formvuelate/plugin-lookup";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";
import { object, array } from "yup";
import { rules } from "@/compositions/validation_rules";
// components
import ChFormCategoryTitle from "@/components/pages/NkoInfo/ChFormCategoryTitle.vue";
import ChInput from "@/components/ui/input/input.vue";
import ChButton from "@/components/ui/button/button.vue";
import ChMultiselect from '@/components/ui/multiselect/multiselect.vue'
import alert from "@/components/app/Alert.vue";
//modals
import AppModal from "@/components/app/AppModal.vue";
//
markRaw(ChInput);
markRaw(ChFormCategoryTitle);
markRaw(ChMultiselect)
const SchemaFormWithPlugins = SchemaFormFactory([LookupPlugin({}), VeeValidatePlugin()]);
const authStore = useAuthStore();
const profileStore = useProfileStore();
const API = inject("API");
const router = useRouter();
const route = useRoute();

const form = ref({
  password: "",
  oldPassword: "",
  passwordConfirm: "",
  multiselect: "",
});

useSchemaForm(form);
const schema = ref({
  title: {
    component: ChFormCategoryTitle,
    title: "Смена пароля",
    model: "",
  },
  oldPassword: {
    component: ChInput,
    type: "password",
    placeholder: "",
    label: "Старый пароль",
    id: "oldPassword",
    maxWidth: "420px",
    error: "",
  },
  password: {
    component: ChInput,
    type: "password",
    placeholder: "",
    label: "Новый пароль",
    id: "password",
    maxWidth: "420px",
    error: "",
  },
  passwordConfirm: {
    component: ChInput,
    type: "password",
    placeholder: "",
    label: "Подтвердите новый пароль",
    id: "passwordConfirm",
    maxWidth: "420px",
    error: "",
  },
});
watch(
  () => form.value.oldPassword,
  (nV) => {
    if (nV) {
      schema.value.oldPassword.error = "";
    }
  },
  {
    deep: true,
  }
);
const validationSchema = computed(() => {
  return object().shape({
    oldPassword: rules.password,
    password: rules.password,
    passwordConfirm: rules.passwordConfirm,
    multiselect: array().min(1),
  });
});

let isPasswordReseted = ref(false);
let isLoadingBtn = ref(false);

async function changePassword() {
  isLoadingBtn.value = true;
  let values = unref(form);
  try {
    await API.user.setPassword({
      new_password: values.password,
      current_password: values.oldPassword,
      re_new_password: values.passwordConfirm,
      // otp: otpCode,
    });
    isPasswordReseted.value = true;
    authStore.logoutUser();
    router.push("/login");
  } catch (e) {
    if (e?.response?.data?.current_password?.length) {
      schema.value.oldPassword.error = "Неверный пароль";
    } else if (e?.response?.data?.otp?.length) {
      // this.showModalChangePassword = true;
    }
    console.error(e);
  } finally {
    isLoadingBtn.value = false;
  }
}
</script>

<template>
  <section>
    <alert
      title="Управление безопасностью профиля"
      description="На этой странице вы можете установить двухфакторную аутентификацию, чтобы обеспечить дополнительную защиту для своего личного кабинета."
    ></alert>
    <div class="form_container" @keypress.enter="changePassword">
      <SchemaFormWithPlugins
        :schema="schema"
        :validation-schema="validationSchema"
        @submit="changePassword"
      >
        <template #afterForm="{ validation }">
          <ChButton
            class="my-btn"
            @click="changePassword"
            :loading="isLoadingBtn"
            :disabled="!validation.meta.valid"
            >Изменить</ChButton
          >
        </template>
      </SchemaFormWithPlugins>
      <div class="primary_text" v-if="true">
        <h2 style="margin: 65px 0 16px 0 !important">Двухфакторная аутентификация</h2>
        Защитите свой профиль. Для этого установите Google Authenticator для
        <a
        class="vblg-link"
          href="https://apps.apple.com/ru/app/google-authenticator/id388497605"
          target="_blank"
          >Apple
        </a>
        или
        <a
        class="vblg-link"
          href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=ru&gl=US"
          target="_blank"
          >Android </a
        >.
      </div>
      <p class="primary_text" v-else>Вы подключили двухфакторную аутентификацию.</p>
      <AppModal
        @close="$router.push('/login')"
        :modelValue="isPasswordReseted"
        :image="'../images/icons/check_mark.svg'"
        :imgSize="76"
        :messages="['Пароль успешно обновлен!']"
      >
      </AppModal>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@/assets/scss/ui/input.scss";
.primary_text {
  color: #0f75bd;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 13.23px;
  text-align: left;
  @media (max-width: 768px) {
    width: auto;
  }

  a {
    color: inherit;
  }
}
.my-btn {
  max-width: 270px;
}
.form {
  &_container {
    max-width: 420px;
    margin: 0 auto;
  }
  &__link {
    max-width: 420px;
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
