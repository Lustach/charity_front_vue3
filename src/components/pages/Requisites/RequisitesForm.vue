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
import ChInput from "@/components/ui/input/input.vue";
import ChButton from "@/components/ui/button/button.vue";

markRaw(ChInput);
markRaw(ChButton);
//schema validation

const SchemaFormWithPlugins = SchemaFormFactory([LookupPlugin({}), VeeValidatePlugin()]);

const form = ref({
  // shortDescriptionActivity: "",
  // fullDescriptionActivity: "",
  // site: "",
  // phone: "",
  // email: "",
  // vk: "",
  // classmates: "",
  // facebook: "",
  // insta: "",
});
useSchemaForm(form);
const schema = computed(() => [
  {
    component: ChInput,
    type: "url",
    label: "ИНН *",
    placeholder: "www",
    id: "inn",
    model: "inn",
    apiKey: "inn",
    error: "",
  },
  {
    component: ChInput,
    type: "text",
    label: "КПП *",
    placeholder: "+7",
    id: "kpp",
    apiKey: "kpp",
    model: "kpp",
    error: "",
  },
  {
    component: ChInput,
    type: "text",
    label: "ОГРН *",
    placeholder: "",
    id: "ogrn",
    apiKey: "ogrn",
    model: "ogrn",
    error: "",
  },
  {
    component: ChFormCategoryTitle,
    title: "Банковские реквизиты",
    model: "",
  },
  {
    component: ChInput,
    type: "text",
    label: "Полное наименование банка *",
    placeholder: "",
    id: "fullNameBank",
    apiKey: "full_name",
    model: "fullNameBank",
    error: "",
  },
  {
    component: ChInput,
    type: "url",
    label: "БИК *",
    placeholder: "",
    id: "bik",
    apiKey: "bik",
    model: "bik",
    error: "",
  },
  {
    component: ChInput,
    type: "url",
    label: "Расчетный счет *",
    placeholder: "",
    id: "countScore",
    apiKey: "checking_account",
    model: "countScore",
    error: "",
  },
  {
    component: ChInput,
    type: "url",
    label: "Корреспондентский счет *",
    placeholder: "",
    id: "insta",
    apiKey: "correspondent_account",
    model: "insta",
    error: "",
  },
  {
    component: ChFormCategoryTitle,
    title: "Юридический адрес",
    model: "",
  },
  {
    component: ChInput,
    type: "url",
    label: "Город или населенный пункт *",
    placeholder: "",
    id: "city",
    apiKey: "city",
    model: "city",
    error: "",
  },
  {
    component: ChInput,
    type: "url",
    label: "Адрес *",
    placeholder: "",
    id: "address",
    apiKey: "address",
    model: "address",
    error: "",
  },
  [
    {
      component: ChInput,
      type: "url",
      label: "Офис/квартира *",
      placeholder: "",
      id: "officeOrFlat",
      apiKey: "office",
      model: "officeOrFlat",
      error: "",
    },
    {
      component: ChInput,
      type: "url",
      label: "Индекс *",
      placeholder: "",
      id: "index",
      apiKey: "index",
      model: "index",
      error: "",
    },
  ],
  // acutal address
  {
    component: ChFormCategoryTitle,
    title: "Фактический адрес",
    model: "",
  },
  {
    component: ChInput,
    type: "url",
    label: "Город или населенный пункт *",
    placeholder: "",
    id: "city_actual",
    apiKey: "city",
    model: "city_actual",
    error: "",
  },
  {
    component: ChInput,
    type: "url",
    label: "Адрес *",
    placeholder: "",
    id: "address_actual",
    apiKey: "address",
    model: "address_actual",
    error: "",
  },
  [
    {
      component: ChInput,
      type: "url",
      label: "Офис/квартира *",
      placeholder: "",
      id: "officeOrFlat_actual",
      apiKey: "office",
      model: "officeOrFlat_actual",
      error: "",
    },
    {
      component: ChInput,
      type: "url",
      label: "Индекс *",
      placeholder: "",
      id: "index_actual",
      apiKey: "index",
      model: "index_actual",
      error: "",
    },
  ],

  //mailing address
  {
    component: ChFormCategoryTitle,
    title: "Почтовый адрес",
    model: "",
  },
  {
    component: ChInput,
    type: "url",
    label: "Город или населенный пункт *",
    placeholder: "",
    id: "city_mailing",
    apiKey: "city",
    model: "city_mailing",
    error: "",
  },
  {
    component: ChInput,
    type: "url",
    label: "Адрес *",
    placeholder: "",
    id: "address_mailing",
    apiKey: "address",
    model: "address_mailing",
    error: "",
  },
  [
    {
      component: ChInput,
      type: "url",
      label: "Офис/квартира *",
      placeholder: "",
      id: "officeOrFlat_mailing",
      apiKey: "office",
      model: "officeOrFlat_mailing",
      error: "",
    },
    {
      component: ChInput,
      type: "url",
      label: "Индекс *",
      placeholder: "",
      id: "index_mailing",
      apiKey: "index",
      model: "index_mailing",
      error: "",
    },
  ],
]);

const urlPattern = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
const validationSchema = computed(() => {
  return yup.object().shape({
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
    </div>
  </div>
</template>

<style lang="scss">
.schema-row {
  display: flex;
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
