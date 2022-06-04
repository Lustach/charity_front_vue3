<script setup lang="ts">
//vue
import { computed, markRaw, ref, inject, onMounted } from "vue";
// schema & validation
import * as yup from "yup";
import { SchemaForm, useSchemaForm, SchemaFormFactory } from "formvuelate";
import LookupPlugin from "@formvuelate/plugin-lookup";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";
import ChFormCategoryTitle from "@/components/pages/NkoInfo/ChFormCategoryTitle.vue";
// Components

import ChTextArea from "@/components/ui/textarea/textarea.vue";
import ChInput from "@/components/ui/input/input.vue";
import ChButton from "@/components/ui/button/button.vue";
import ChFileUpload from "@/components/ui/file_loader/FileUpload.vue";
import createUploader from "@/components/ui/file_loader/compositions/fileUploader";
import { SUPPORTED_FORMATS_DEFAULT, rules } from "@/compositions/validation_rules";
// File Management
import useFileList from "@/components/ui/file_loader/compositions/fileList";
//store
import { useProfileStore } from "@/stores/modules/profile/profile";
const profileStore = useProfileStore();

markRaw(ChInput);
markRaw(ChTextArea);
markRaw(ChButton);
markRaw(ChFileUpload);
const { files, addFiles, removeFile } = useFileList();
const API = inject("API");
// Uploader
// const { uploadFiles } = createUploader(import.meta.env.VITE_APP_BACKEND_HOST + "/health/media/"); //YOUR URL HERE
const { uploadFiles } = createUploader(API.fill_profile.createMedia); //YOUR URL HERE

//schema validation

const SchemaFormWithPlugins = SchemaFormFactory([LookupPlugin({}), VeeValidatePlugin()]);
const formToApi = {
  //key: form key-value: apiKey
  site: "nko_reference",
  phone: "nko_phone",
  email: "nko_email",
  vk: "vk_ref",
  classmates: "ok_ref",
  facebook: "facebook_ref",
  insta: "instagram_ref",
  fullNameNko: "name",
  shortDescriptionActivity: "short_description",
  fullDescriptionActivity: "long_description",
  // logo: "upload_image",
  // mediaFiles: 'upload_media',
};
const form = ref({
  shortDescriptionActivity: "",
  fullDescriptionActivity: "",
  site: "",
  phone: "",
  email: "",
  vk: "",
  classmates: "",
  facebook: "",
  insta: "",
  logo: [],
  mediaFiles: [],
});
useSchemaForm(form);
const schema = ref({
  textDescription: {
    component: ChFormCategoryTitle,
    title: "Описание НКО",
  },
  shortDescriptionActivity: {
    component: ChTextArea,
    label: "Краткое описание деятельности *",
    placeholder: "",
    id: "shortDescriptionActivity",
    error: "",
    maxLength: 150,
    fullSize: false,
  },
  fullDescriptionActivity: {
    component: ChTextArea,
    type: "text",
    label: "Полное описание деятельности *",
    placeholder: "",
    id: "fullDescriptionActivity",
    error: "",
    maxLength: 2000,
    fullSize: true,
  },
  textContacts: {
    component: ChFormCategoryTitle,
    title: "Контакты НКО",
  },
  site: {
    component: ChInput,
    type: "url",
    label: "Сайт",
    placeholder: "www",
    id: "site",
    error: "",
  },
  phone: {
    component: ChInput,
    type: "phone",
    placeholder: "Введите номер телефона",
    label: "Телефон *",
    id: "phone",
    error: "",
    maxLength: 12,
  },
  email: {
    component: ChInput,
    type: "email",
    label: "Эл. почта *",
    placeholder: "email@email.ru",
    id: "email",
    error: "",
  },
  textSocialWebs: {
    component: ChFormCategoryTitle,
    title: "Социальные сети",
  },
  vk: {
    component: ChInput,
    type: "url",
    label: "Вконтакте",
    placeholder: "www",
    id: "vk",
    error: "",
  },
  classmates: {
    component: ChInput,
    type: "url",
    label: "Одноклассники",
    placeholder: "www",
    id: "classmates",
    error: "",
  },
  facebook: {
    component: ChInput,
    type: "url",
    label: "Фейсбук",
    placeholder: "www",
    id: "facebook",
    error: "",
  },
  insta: {
    component: ChInput,
    type: "url",
    label: "Инстаграм",
    placeholder: "www",
    id: "insta",
    error: "",
  },
  textMediaFiles: {
    component: ChFormCategoryTitle,
    title: "Медиа файлы",
  },
  logo: {
    component: ChFileUpload,
    type: "file",
    label: "Логотип",
    id: "logo",
    error: "",
    accept: SUPPORTED_FORMATS_DEFAULT.join(","),
    uploadTextTip: "PNG, SVG, AI, PDF, JPG до 5 Мб",
    maxWidth: "366.11px",
    multiple: false,
  },
  mediaFiles: {
    component: ChFileUpload,
    type: "file",
    label: "Фото и видео",
    tooltip: "Фото и видео будут отражаться на странице вашего НКО на нашем сайте.",
    id: "mediaFiles",
    error: "",
    accept: SUPPORTED_FORMATS_DEFAULT.join(","),
    uploadTextTip: "PNG, SVG, AI, PDF, JPG до 5 Мб",
    maxWidth: "366.11px",
    multiple: true,
    apiKey: "upload_media",
  },
});

const validationSchema = computed(() => {
  return yup.object().shape({
    shortDescriptionActivity: yup.string().max(150).required("Заполните поле"),
    fullDescriptionActivity: yup.string().max(2000).required("Заполните поле"),
    site: rules.site,
    email: rules.email,
    phone: rules.phone,
    vk: rules.site,
    classmates: rules.site,
    facebook: rules.site,
    insta: rules.site,
    logo: rules.files(undefined, undefined, false),
    mediaFiles: rules.files(undefined, undefined, false),
  });
});

form.value.logo = files.value;

async function saveChanges() {
  let fd = new FormData();
  for (const key of profileStore.fund.category) {
    fd.append("category", key);
  }
}
onMounted(() => {
  for (const iterator in formToApi) {
    form.value[iterator] = profileStore.fund[formToApi[iterator]];
  }
});
</script>
<template>
  <div class="profile_form_container">
    <!-- <Form @submit="onSubmit" v-slot="{ errors }">
      <Field name="field" type="file" multiple :rules="imageValidator" />
      <span>{{ errors.field }}</span>
    </Form> -->
    <div class="profile_form_wrapper">
      <SchemaFormWithPlugins :schema="schema" :validation-schema="validationSchema">
        <template #afterForm="{ validation }">
          <ChButton
            :maxWidth="'fit-content'"
            :loading="isLoadingBtn"
            :disabled="!validation.meta.valid"
            style="margin-right: 0"
            >Сохранить изменения</ChButton
          >
        </template>
      </SchemaFormWithPlugins>
      <button @click="uploadFiles(form.files)">dwn</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile_form_wrapper {
  max-width: 720px;
  &:deep {
    .schema-col {
      flex-direction: row !important;
    }
  }
}
button {
  cursor: pointer;
}
</style>
