<template>
  <div class="form_container">
    <alert
      title="Получайте пожертвования в криптовалюте"
      description="На этой странице вы можете создать свой уникальный крипто виджет и добавить его к себе на сайт. Добавляйте описание и логотип, чтобы люди сразу понимали, кому
        пойдет пожертвование."
    ></alert>
    <div class="container__wrapper">
      <div class="widget_form" v-show="!showIframeForm">
        <SchemaFormWithPlugins
          style="max-width: 420px; width: 100%"
          :schema="schema"
          :validation-schema="validationSchema"
          @submit="login"
        >
          <template #afterForm="{ validation }">
            <div
              class="form-group form-group_profile"
              style="margin: 20px 0 35px 0 !important"
            >
              <span class="form-group_label"> Адрес вашего кошелька * </span>
            </div>
            <div class="form-group form-group_profile">
              <span class="form-group_label" style="font-weight: 400">
                Выберите валюту, в которой хотите получать средства. Затем вставьте адрес
                вашего кошелька, соответствующего данной криптовалюте.
              </span>
            </div>
            <div
              class="form-group form-group_profile"
              style="margin-top: 30px; margin-bottom: 26px !important"
            >
              <a class="form-group_label" style="font-weight: 500">
                Посмотреть инструкцию по созданию кошелька.</a
              >
            </div>
            <!-- @vnodeMounted="test1()" -->
            <CryptoWidgetPurseAddress
              :selectValue="selectValue"
              :purseModel="purseModel"
              ref="purseRef"
              @update:purse-model="updatePurseModel"
              @update:select-value="updateSelectValue"
            ></CryptoWidgetPurseAddress>
            <ChButton
              class="btn"
              @click="setWidgetInfo"
              :loading="isLoadingBtn"
              :disabled="!validation.meta.valid"
              >Создать виджет</ChButton
            >
          </template>
        </SchemaFormWithPlugins>
      </div>
      <CryptoWidgetIframe
        v-if="purseModel"
        :selectValue="selectValue"
        :purseModel="purseModel"
        :cryptoWidgetId="profileStore.fundIdFromStorage"
        v-show="showIframeForm"
        @editCryptoWidget="showIframeForm = !showIframeForm"
      />
      <CryptoWidgetPreview></CryptoWidgetPreview>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, markRaw, inject, onMounted, watch, nextTick } from "vue";
import type { Ref } from "vue";
//view parts
import Alert from "@/components/app/Alert.vue";
import CryptoWidgetPreview from "@/components/pages/CryptoWidget/CryptoWidgetPreview.vue";
import CryptoWidgetPurseAddress from "@/components/pages/CryptoWidget/CryptoWidgetPurseAddress.vue";
import CryptoWidgetIframe from "@/components/pages/CryptoWidget/CryptoWidgetIframe.vue";

//components
import ChTextArea from "@/components/ui/textarea/textarea.vue";
import ChInput from "@/components/ui/input/input.vue";
import ChButton from "@/components/ui/button/button.vue";
import ChFileUpload from "@/components/ui/file_loader/FileUpload.vue";

//validation
import LookupPlugin from "@formvuelate/plugin-lookup";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";
import { useSchemaForm, SchemaFormFactory } from "formvuelate";
import * as yup from "yup";
//files
import useFileList from "@/components/ui/file_loader/compositions/fileList";

import { useProfileStore } from "@/stores/modules/profile/profile";
const profileStore = useProfileStore();
// const purseRef = ref<InstanceType<typeof CryptoWidgetPurseAddress> | null>(null);

markRaw(ChInput);
markRaw(ChTextArea);
markRaw(ChFileUpload);
const SchemaFormWithPlugins = SchemaFormFactory([LookupPlugin({}), VeeValidatePlugin()]);
const { files, addFiles, setFilePreview, removeFile } = useFileList();
type TForm = {
  shortDescriptionActivity: string;
  fullNameNko: string;
  logo: any;
};
let selectValue = ref("BTC");
let purseModel = ref(undefined);
function updatePurseModel(value: string) {
  purseModel.value = value;
}
function updateSelectValue(value: string) {
  selectValue.value = value;
}
const eventBus = inject("eventBus");

onMounted(async () => {
  const result = await getCryptoWidgetInfo();
  form.value.fullNameNko = result.name;
  form.value.shortDescriptionActivity = result.short_description;
  form.value.logo = [
    {
      file: new File(["Billy"], "Billy.jpeg", { type: "image/jpeg" }),
      status: null,
      id: "1",
      url: import.meta.env.VITE_APP_BACKEND_HOST + result.logo,
    },
  ];
  files.value = form.value.logo;
  eventBus.emit("updateFiles", files.value);
  purseModel.value = result.address;
  selectValue.value = result.cryptocurrency.toUpperCase() || "BTC";
  nextTick();
  if (result.status === "ENABLED") {
    showIframeForm.value = true;
  }
});

const form: Ref<TForm> = ref({
  shortDescriptionActivity: "",
  fullNameNko: "",
  logo: "",
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
    tooltip: "Наименование организации согласно Уставу",
  },
  shortDescriptionActivity: {
    component: ChTextArea,
    label: "Краткое описание деятельности",
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
    id: "logo",
    error: "",
    multiple: false,
    accept: SUPPORTED_FORMATS.join(","),
    uploadTextTip: "PNG, SVG, AI, PDF, JPG до 5 Мб",
  },
});
watch(
  () => form.value.fullNameNko,
  (n) => {
    let test = document.getElementsByClassName("w_blg-fund__header");
    if (test.length) {
      if (test[0].children.length === 2) {
        test[0].children[1].innerHTML = n;
      } else {
        test[0].children[0].innerHTML = n;
      }
    }
  },
  {
    deep: true,
  }
);

watch(
  () => form.value.shortDescriptionActivity,
  (n) => {
    let test = document.getElementsByClassName("w_blg-step_1__fund-description");
    if (test[0]?.childNodes[0]) test[0].childNodes[0].data = n;
    else if (test.length) test[0].innerHTML = n;
  },
  {
    deep: true,
  }
);
watch(
  () => form.value.logo[0],
  (n) => {
    nextTick();
    console.log(n);
    let test = document.getElementsByClassName("w_blg-fund__header");
    if (n) {
      if (test.length) {
        if (test[0].children.length === 2) {
          test[0].removeChild(test[0].children[0]);
        }
        let img = document.createElement("img");
        img.setAttribute("src", n.url);
        console.log(test[0], "test");
        test[0].prepend(img);
      }
    }
  },
  {
    deep: true,
  }
);
const validationSchema = computed(() => {
  return yup.object().shape({
    shortDescriptionActivity: yup.string().max(150),
    fullNameNko: yup.string().required("Обязательное поле"),
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
            if (!SUPPORTED_FORMATS.includes(iterator?.file?.type)) return false;
          }
          return true;
        }
        // SUPPORTED_FORMATS.includes(value[0]?.file.type)
      ),
  });
});
const API = inject("API");
const isLoadingBtn = ref();
let showIframeForm = ref(false);
let widgetInfo = ref(undefined);
async function getCryptoWidgetInfo() {
  return (widgetInfo.value = await API.crypto.getInfo(profileStore.fundIdFromStorage));
}
async function setWidgetInfo() {
  isLoadingBtn.value = true;
  let data = {
    address: purseModel.value,
    cryptocurrency: selectValue.value.toLowerCase(),
    name: form.value.fullNameNko,
    short_description: form.value.shortDescriptionActivity,
    logo: form.value.logo[0].file,
  };
  // if (
  //   this.mapForm.step1.logo.model.length &&
  //   JSON.stringify(this.copyStep1.logo.model[0]?.name) !==
  //     JSON.stringify(this.mapForm.step1.logo.model[0]?.name)
  // ) {
  //   data.logo = this.mapForm.step1.logo.model[0];
  // }
  let fd = new FormData();
  for (const dataKey in data) {
    fd.set(dataKey, data[dataKey]);
  }
  try {
    await API.crypto.updateWidgetInfo(fd, widgetInfo.value.id);
    isLoadingBtn.value = false;
    showIframeForm.value = true;
  } catch (e) {
    console.log(e);
  }
  isLoadingBtn.value = false;
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style lang="scss" scoped>
.container__wrapper {
  display: flex;
  justify-content: space-between;
}

.form {
  &_container {
    max-width: 1000px;
    margin: 39px auto 39px auto;
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

//
</style>
