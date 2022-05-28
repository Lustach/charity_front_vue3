<script setup lang="ts">
//vue
import { computed, markRaw, ref,inject } from "vue";
// schema & validation
import * as yup from "yup";
import { SchemaForm, useSchemaForm, SchemaFormFactory } from "formvuelate";
import LookupPlugin from "@formvuelate/plugin-lookup";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";
import ChFormCategoryTitle from "@/components/pages/NkoInfo/ChFormCategoryTitle.vue";
// Components

import DropZone from "@/components/ui/file_loader/DropZone.vue";
import FilePreview from "@/components/ui/file_loader/FilePreview.vue";
import ChTextArea from "@/components/ui/textarea/textarea.vue";
import ChInput from "@/components/ui/input/input.vue";
import ChButton from "@/components/ui/button/button.vue";
import ChFileUpload from "@/components/ui/file_loader/FileUpload.vue";
import createUploader from "@/components/ui/file_loader/compositions/fileUploader";
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
const API = inject("API")
// Uploader
// const { uploadFiles } = createUploader(import.meta.env.VITE_APP_BACKEND_HOST + "/health/media/"); //YOUR URL HERE
const { uploadFiles } = createUploader(API.fill_profile.createMedia); //YOUR URL HERE

//schema validation

const SchemaFormWithPlugins = SchemaFormFactory([LookupPlugin({}), VeeValidatePlugin()]);
const urlPattern = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
const FILE_SIZE = 5242880;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "application/pdf",
  "image/svg+xml",
];
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
  files: [],
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
    label: "Телефон *",
    placeholder: "+7",
    id: "phone",
    error: "",
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
  files: {
    component: ChFileUpload,
    type: "file",
    label: "Логотип",
    placeholder: "www",
    id: "files",
    error: "",
    accept: SUPPORTED_FORMATS.join(","),
    uploadTextTip: "PNG, SVG, AI, PDF, JPG до 5 Мб",
    maxWidth: "366.11px",
    multiple: true,
  },
});

const validationSchema = computed(() => {
  return yup.object().shape({
    shortDescriptionActivity: yup.string().max(150).required("Заполните поле"),
    fullDescriptionActivity: yup.string().max(2000).required("Заполните поле"),
    site: yup.string().matches(
      // /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      urlPattern,
      "Неверный формат сайта"
    ),
    email: yup
      .string()
      .matches(/\S+@\S+\.+(com|ru|org|net|info|io)$/, "Неверный формат эл. почты")
      .required(),
    phone: yup
      .string()
      .matches(/^\+7[0-9]{10}$/, "Невалидный номер телефона")
      .required(),
    vk: yup.string().matches(urlPattern, "Неверный формат сайта"),
    classmates: yup.string().matches(urlPattern, "Неверный формат сайта"),
    facebook: yup.string().matches(urlPattern, "Неверный формат сайта"),
    insta: yup.string().matches(urlPattern, "Неверный формат сайта"),
    files: yup
      .mixed()
      .test("fileNameLength", "Слишком длинное название файла", (value) => {
        if (value.length) {
          for (const iterator of value) {
            if (iterator.file.name.length >= 100) {
              return false;
            }
          }
        }
        return true;
      })
      .test("fileSize", "Вы превысили допустимый размер файла", (value) => {
        if (value.length) {
          for (const iterator of value) {
            return iterator.file.size <= FILE_SIZE;
          }
        }
        return true;
      })
      .test(
        "fileType",
        "Unsupported File Format",
        (value) => {
          for (const iterator of value) {
            if (!SUPPORTED_FORMATS.includes(iterator?.file.type)) return false;
          }
          return true;
        }
        // SUPPORTED_FORMATS.includes(value[0]?.file.type)
      ),
  });
});

form.value.files = files.value;

async function saveChanges() {
  let fd = new FormData();
  for (const key of profileStore.fund.category) {
    fd.append("category", key);
  }
}
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
