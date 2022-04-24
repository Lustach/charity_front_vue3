<script setup lang="ts">
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

markRaw(ChInput);
markRaw(ChTextArea);
markRaw(ChButton);
// File Management
import useFileList from "@/components/ui/file_loader/compositions/fileList";
const { files, addFiles, removeFile } = useFileList();
function onInputChange(e) {
  addFiles(e.target.files);
  e.target.value = null; // reset so that selecting the same file again will still cause it to fire this change
}
// Uploader
import createUploader from "@/components/ui/file_loader/compositions/fileUploader";
const { uploadFiles } = createUploader("YOUR URL HERE");
//schema validation

const SchemaFormWithPlugins = SchemaFormFactory([LookupPlugin({}), VeeValidatePlugin()]);

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
});

yup.setLocale({
  mixed: {
    required: "Обязательное поле",
  },
  string: {
    email: "Невалидный e-mail",
    min: "Минимальная длина ${min} символов",
    max: "Максимальная длина ${max} символов",
  },
});

const urlPattern = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
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
  });
});
</script>
<template>
  <div class="profile_form_container">
    <div class="profile_form_wrapper">
      <SchemaFormWithPlugins :schema="schema" :validation-schema="validationSchema">
        <template #afterForm="{ validation }">
          <ChButton :loading="isLoadingBtn" :disabled="!validation.meta.valid"
            >Продолжить</ChButton
          >
        </template>
      </SchemaFormWithPlugins>
      <DropZone class="drop-area" @files-dropped="addFiles" #default="{ dropZoneActive }">
        <label for="file-input">
          <span v-if="dropZoneActive">
            <span>Перетащите или загрузите файлы</span>
            <span class="smaller">Добавьте</span>
          </span>
          <p class="action" v-else>
            <span>Перетащите </span>
            <span class="smaller">
              <strong>или <em>загрузите файлы</em></strong>
            </span>
          </p>
          <input type="file" id="file-input" multiple @change="onInputChange" />
        </label>
        <ul class="image-list" v-show="files.length">
          <FilePreview
            v-for="file of files"
            :key="file.id"
            :file="file"
            tag="li"
            @remove="removeFile"
          />
        </ul>
      </DropZone>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile_form_wrapper {
  max-width: 720px;
  &::v-deep {
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
