<script setup lang="ts">
import { Form, Field, defineRule } from "vee-validate";
//vue
import { computed, markRaw, ref } from "vue";
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

// function isEmpty(value) {
//   if (value === null || value === undefined || value === "") {
//     return true;
//   }
//   if (Array.isArray(value) && value.length === 0) {
//     return true;
//   }
//   return false;
// }
// const imageValidator = (files) => {
//   if (!files) {
//     console.log("isEmpty");

//     return false;
//   }
//   const regex = /\.(jpg|svg|jpeg|png|bmp|gif|webp)$/i;
//   if (Array.isArray(files[0])) {
//     return files[0].every((file) => regex.test(file.name));
//   }
//   return regex.test(files[0].name);
// };
const { files, addFiles, removeFile } = useFileList();
// function onInputChange(e) {
//   addFiles(e.target.files);
//   e.target.value = null; // reset so that selecting the same file again will still cause it to fire this change
//   form.value.files = files;
// }
// Uploader
const { uploadFiles } = createUploader("/health/media/"); //YOUR URL HERE
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
.action {
  display: flex;
  white-space: break-spaces;
  * {
    font-weight: 600 !important;
  }
  em {
    border-bottom: 1px solid var(--vblg-c-primary);
    //   text-decoration: underline;
  }
}
.drop-area {
  display: flex;
  flex-direction: column-reverse;
  color: var(--vblg-c-primary);
  width: 100%;
  //   max-width: 800px;
  margin: 0 auto;
  padding: 50px;
  background: #ffffff55;
  //   box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: 0.2s ease;
  min-height: 76px;
  padding: 22px 78px;
  max-width: 420px;
  border: 2px solid #b0ceec;
  border-radius: 10px;
  &[data-active="true"] {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background: #ffffffcc;
  }
}
label {
  font-size: 36px;
  cursor: pointer;
  display: block;
  span {
    display: block;
  }
  input[type="file"]:not(:focus-visible) {
    // Visually Hidden Styles taken from Bootstrap 5
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }
  input[type="file"] {
    &::file-selector-button,
    &::-webkit-file-upload-button {
      display: none;
    }
  }
}
.image-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  padding: 0;
}
.upload-button {
  display: block;
  appearance: none;
  border: 0;
  border-radius: 50px;
  padding: 0.75rem 3rem;
  margin: 1rem auto;
  font-size: 1.25rem;
  font-weight: bold;
  background: #369;
  color: #fff;
  text-transform: uppercase;
}
button {
  cursor: pointer;
}
</style>
