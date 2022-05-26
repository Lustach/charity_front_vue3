<template>
  <div class="form_container">
    <alert
      title="Получайте пожертвования в криптовалюте"
      description="На этой странице вы можете создать свой уникальный крипто виджет и добавить его к себе на сайт. Добавляйте описание и логотип, чтобы люди сразу понимали, кому
        пойдет пожертвование."
    ></alert>
    <div class="widget_form">
      <SchemaFormWithPlugins
        style="max-width: 420px; width: 100%"
        :schema="schema"
        :validation-schema="validationSchema"
        @submit="login"
      >
        <template #afterForm="{ validation }">
          <ChButton
            class="btn"
            @click="login"
            :loading="isLoadingBtn"
            :disabled="!validation.meta.valid"
            >Создать виджет</ChButton
          >
          <div class="form__link">
            <router-link class="vblg-link" to="/password?action=restore">
              Забыли пароль?
            </router-link>
          </div>
        </template>
      </SchemaFormWithPlugins>
      <CryptoWidgetPreview></CryptoWidgetPreview>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, markRaw, inject, unref, watch } from "vue";
import type { Ref } from "vue";
import Alert from "@/components/app/Alert.vue";
import CryptoWidgetPreview from "@/components/pages/CryptoWidget/CryptoWidgetPreview.vue";
//components
import ChTextArea from "@/components/ui/textarea/textarea.vue";
import ChInput from "@/components/ui/input/input.vue";
import ChButton from "@/components/ui/button/button.vue";
import ChFileUpload from "@/components/ui/file_loader/FileUpload.vue";
//validation
import LookupPlugin from "@formvuelate/plugin-lookup";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";
import { useSchemaForm, SchemaFormFactory } from "formvuelate";
import { object } from "yup";
import * as yup from "yup";
import { rules } from "@/compositions/validation_rules";

markRaw(ChInput);
markRaw(ChTextArea);
markRaw(ChFileUpload);
const SchemaFormWithPlugins = SchemaFormFactory([LookupPlugin({}), VeeValidatePlugin()]);

type TForm = {
  shortDescriptionActivity: string;
  isShowCodeField: boolean;
  fullNameNko: string;
  password: string;
  code_2fa: string;
};
const form: Ref<TForm> = ref({
  shortDescriptionActivity: "",
  isShowCodeField: false,
  fullNameNko: "",
  password: "",
  code_2fa: "",
});
useSchemaForm(form);
const FILE_SIZE = 5242880;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "application/pdf",
  "image/svg+xml",
];
const schema = ref({
  fullNameNko: {
    component: ChInput,
    type: "text",
    placeholder: "",
    label: "Полное наименование НКО *",
    id: "fullNameNko",
    error: "",
    maxWidth: "420px",
    condition: (model: TForm) => !model.isShowCodeField,
  },
  shortDescriptionActivity: {
    component: ChTextArea,
    label: "Краткое описание деятельности *",
    placeholder: "",
    id: "shortDescriptionActivity",
    error: "",
    maxWidth: "420px",
    maxLength: 150,
    fullSize: false,
  },
  logo: {
    component: ChFileUpload,
    type: "file",
    label: "Логотип",
    placeholder: "www",
    id: "files",
    error: "",
    accept: SUPPORTED_FORMATS.join(","),
    uploadTextTip: "PNG, SVG, AI, PDF, JPG до 5 Мб",
  },
});
const validationSchema = computed(() => {
  return yup.object().shape({
    shortDescriptionActivity: yup.string().max(150).required("Заполните поле"),
    fullNameNko: yup.string(),
    logo: yup
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
// import { onMounted } from "vue";
</script>
<style lang="scss" scoped>
.form {
  &_container {
    max-width: 1000px;
    margin: 100px auto 100px auto;
  }
}
.widget_form {
  display: flex;
  width: 100%;
  justify-content: space-between;
  max-width: 1000px;
}
.btn {
  max-width: 220px;
  margin-left: 0;
}
.file__container {
  flex-direction: column !important;
}
</style>
