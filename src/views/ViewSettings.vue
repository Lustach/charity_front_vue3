<script setup lang="ts">
import {
  computed,
  ref,
  markRaw,
  inject,
  unref,
  onMounted,
} from "vue";
//store
import { useAuthStore } from "@/stores/modules/auth/auth";
import { useProfileStore } from "@/stores/modules/profile/profile";
//validation
import { useSchemaForm, SchemaFormFactory } from "formvuelate";
import LookupPlugin from "@formvuelate/plugin-lookup";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";
import { object, string } from "yup";
// components
import ChFormCategoryTitle from "@/components/pages/NkoInfo/ChFormCategoryTitle.vue";
import ChInput from "@/components/ui/input/input.vue";
import ChButton from "@/components/ui/button/button.vue";
import alert from "@/components/app/Alert.vue";
import AppModal from "@/components/app/AppModal.vue";
markRaw(ChInput);
markRaw(ChFormCategoryTitle);
const SchemaFormWithPlugins = SchemaFormFactory([LookupPlugin({}), VeeValidatePlugin()]);
const authStore = useAuthStore();
const profileStore = useProfileStore();
const API = inject("API");

const form = ref({
  phone: "",

  fullName: "",
  email: "",
});

useSchemaForm(form);
const schema = ref({
  title: {
    component: ChFormCategoryTitle,
    title: "Ваши контактные данные",
    model: "",
  },
  fullName: {
    component: ChInput,
    type: "text",
    placeholder: "",
    label: "ФИО",
    id: "fullName",
    maxWidth: "420px",
    error: "",
  },
  phone: {
    component: ChInput,
    modelOriginal: "",
    modelHidden: "",
    type: "phone",
    placeholder: "",
    label: "Телефон *",
    id: "phone",
    maxWidth: "420px",
    tooltip:
      "Данный телефон является логином для входа на наш сайт и не может быть изменен самостоятельно.  Если вам необходимо сменить номер, пожалуйста, обратитесь в нашу поддержку.",
    disabled: true,
    eye: true,
    error: "",
  },
  email: {
    component: ChInput,
    modelOriginal: "",
    modelHidden: "",
    type: "email",
    placeholder: "",
    label: "Эл. почта *",
    id: "email",
    maxWidth: "420px",
    tooltip:
      "Данный эл. адрес является логином для входа на наш сайт и не может быть изменен самостоятельно.  Если вам необходимо сменить эл. почту, пожалуйста, обратитесь в нашу поддержку.",
    disabled: true,
    eye: true,
    error: "",
  },
});
const validationSchema = computed(() => {
  return object().shape({
    fullName: string().required(),
  });
});

let isPasswordReseted = ref(false);
let isLoadingBtn = ref(false);

async function changeFullName() {
  isLoadingBtn.value = false;
  try {
    const data = new FormData();
    if (form.value.fullName !== profileStore.nko_representative_name) {
      data.append("nko_representative_name", form.value.fullName);
    }
    await API.fill_profile.updateFund(profileStore.fundIdFromStorage, data);
    // this.isShowModal = true;
  } catch (e) {
    console.error(e);
  } finally {
    isLoadingBtn.value = false;
  }
}
onMounted(async () => {
  let values = unref(form);
  await profileStore.initDataFromLocalStorage();
  // todo mixin
  // await this.setMapFundInfo();
  values.fullName = profileStore.fund.name;
  let email = authStore.email;
  let phone = profileStore.fund.nko_representative_phone;
  values.email = email;
  schema.value.email.modelOriginal = email;
  schema.value.email.modelHidden =
    email.slice(0, 2) + "*****" + email.slice(email.indexOf("@") - 2, email.length);
  schema.value.phone.modelOriginal = values.phone =
    phone.slice(0, 2) +
    "  " +
    phone.slice(2, 5) +
    "-" +
    phone.slice(5, 8) +
    "-" +
    phone.slice(8, 10) +
    "-" +
    phone.slice(10, 12);
  schema.value.phone.modelHidden =
    values.phone.substr(0, 7) +
    "-" +
    "***" +
    "-" +
    "**" +
    "-" +
    values.phone.substr(8, 2);
  values.email = schema.value.email.modelHidden;
  values.phone = schema.value.phone.modelHidden;
});
</script>

<template>
  <section>
    <alert
      title="Управление безопасностью профиля"
      description="На этой странице вы можете установить двухфакторную аутентификацию, чтобы обеспечить дополнительную защиту для своего личного кабинета."
    ></alert>
    <div class="form_container" @keypress.enter="changeFullName">
      <SchemaFormWithPlugins
        :schema="schema"
        :validation-schema="validationSchema"
        @submit="changeFullName"
      >
        <template #afterForm="{ validation }">
          <ChButton
            style="max-width: 228px; margin-right: 0"
            @click="changeFullName"
            :loading="isLoadingBtn"
            :disabled="!validation.meta.valid"
            >Сохранить изменения</ChButton
          >
        </template>
      </SchemaFormWithPlugins>
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
