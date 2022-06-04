<script setup lang="ts">
import { computed, ref, unref, markRaw, inject, onMounted, nextTick, watch } from "vue";
import type { Ref } from "vue";
import {
  schema,
  form,
  helpCategoryList,
  validationSchema,
} from "@/components/pages/FillProfile/form";
import { backStep, steps, setActiveStep } from "@/components/pages/FillProfile/useStep";
import { useRouter, useRoute } from "vue-router";
import { useSchemaForm, SchemaFormFactory } from "formvuelate";
import LookupPlugin from "@formvuelate/plugin-lookup";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";
import useFileList from "@/components/ui/file_loader/compositions/fileList";
import { getRequisitesInfo } from "@/components/compositions/Requisites/useRequisites";
//components
import ChButton from "@/components/ui/button/button.vue";
// page parts
import ProfileStepView from "@/components/pages/FillProfile/ProfileStepView.vue";
import { useAuthStore } from "@/stores/modules/auth/auth";
import { useProfileStore } from "@/stores/modules/profile/profile";
const authStore = useAuthStore();
const profileStore = useProfileStore();
const API = inject("API");
const SchemaFormWithPlugins = SchemaFormFactory([LookupPlugin({}), VeeValidatePlugin()]);
const { files, addFiles, setFilePreview, removeFile } = useFileList();
const eventBus = inject("eventBus");
useSchemaForm(form);
markRaw(ChButton);
// markRaw(ChMultiselect);
const mapFormStep1ToApi = {
  //key: form key-value: apiKey
  fullNameNko: "name",
  shortDescriptionActivity: "short_description",
  fullDescriptionActivity: "long_description",
  helpCategory: "category",
  charter: "nko_statute",
  certificateRecord: "nko_taxes_certificate",
  certificateRegistration: "nko_register_certificate",
  logo: "upload_image",
};
const mapFormStep3ToApi = {
  fullNameDirector: "nko_director_name",
  workPost: "nko_director_position",
  fullNameContactPerson: "nko_representative_name",
  phoneContactPerson: "nko_representative_phone",
  emailContactPerson: "nko_representative_email",
  site: "nko_reference",
  phone: "nko_phone",
  email: "nko_email",
  vk: "vk_ref",
  classmates: "ok_ref",
  facebook: "facebook_ref",
  insta: "instagram_ref",
};
watch(
  () => form.value.isShowStep1,
  (nV) => {
    if (nV) {
      console.log(nV, "nV");
      setTimeout(() => {
        getStep1();
      }, 1);
    }
  },
  {
    deep: true,
  }
);
onMounted(() => {
  console.log(schema, "schema");
  setActiveStep(
    form.value.isShowStep1
      ? 0
      : form.value.isShowStep2
      ? 1
      : form.value.isShowStep3
      ? 2
      : 0
  );
  getStep1();
  getStep2();
  getStep3();
});
async function setFundStep1(fd) {
  try {
    if (
      profileStore.stepFromStorage === "step2" ||
      profileStore.stepFromStorage === "step3"
    ) {
      return await API.fill_profile.updateFund(profileStore.fundIdFromStorage, fd);
    } else {
      return await API.fill_profile.createFund(fd);
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}
async function setStepInfo() {
  console.log("1245");

  let fd = new FormData();
  for (const key in mapFormStep1ToApi) {
    if (Object.prototype.hasOwnProperty.call(mapFormStep1ToApi, key)) {
      if (key === "helpCategory") {
        // console.log(form.value[key].map((e) => e.id));
        form.value[key].map((e) => fd.append(mapFormStep1ToApi[key], e.id));
        // fd.append(mapFormStep1ToApi[key], form.value[key].map((e) => e.id).join(","));
      } else if (
        key === "charter" ||
        key === "certificateRecord" ||
        key === "certificateRegistration" ||
        key === "logo"
      ) {
        fd.append(mapFormStep1ToApi[key], form.value[key][0].file);
      } else {
        fd.append(mapFormStep1ToApi[key], form.value[key]);
      }
    }
  }
  let resultFund,
    resultProfile = {};
  resultFund = await setFundStep1(fd);
  if (!resultFund) return;
  profileStore.$patch((state) => {
    state.fundIdFromStorage = resultFund.id;
    state.isLogo = true;
  });
  if (!authStore.isAuthenticatedprofileId) {
    try {
      resultProfile = await API.user.createProfileModel({
        user: authStore.userId,
        fund: resultFund.id,
      });
    } catch (e) {
      console.error(e);
    }
    authStore.$patch((state) => {
      state.profileId = resultProfile.id;
    });
    // this.$store.state.user.profileId = resultProfile.id;
  }
}
function getStep1() {
  console.dir("dir");
  nextTick();
  // if(profileStore.fund)
  for (const iterator in mapFormStep1ToApi) {
    if (iterator === "helpCategory") {
      form.value.helpCategory = helpCategoryList.filter(
        (e) => profileStore.fund.category.findIndex((e1) => e.id === e1) !== -1
      );
      schema.value[3].modelValue = form.value.helpCategory;
    } else if (iterator === "charter") {
      form.value.charter = createFile("nko_statute");
      files.value = form.value.charter;
      eventBus.emit("updateFiles", { fileList: files.value, componentId: "charter" });
    } else if (iterator === "certificateRecord") {
      form.value.certificateRecord = createFile("nko_taxes_certificate");
      files.value = form.value.certificateRecord;
      eventBus.emit("updateFiles", {
        fileList: files.value,
        componentId: "certificateRecord",
      });
    } else if (iterator === "certificateRegistration") {
      form.value.certificateRegistration = createFile("nko_register_certificate");
      files.value = form.value.certificateRegistration;
      eventBus.emit("updateFiles", {
        fileList: files.value,
        componentId: "certificateRegistration",
      });
    } else if (iterator === "logo") {
      let logoObject = profileStore.fund.media_files.filter((e) => e.is_logo);
      form.value.logo = [
        {
          file: new File([`logo`], `logo.jpeg`, { type: "image/jpeg" }),
          status: null,
          id: "1",
          url: import.meta.env.VITE_APP_BACKEND_HOST + logoObject[0].upload_image,
        },
      ];
      files.value = form.value.logo;
      eventBus.emit("updateFiles", {
        fileList: files.value,
        componentId: "logo",
      });
    } else {
      form.value[iterator] = profileStore.fund[mapFormStep1ToApi[iterator]];
      nextTick();
    }
    // console.log(iterator, profileStore.fund);
  }
  if (profileStore.fund?.name) {
    form.value.fullNameNko = profileStore.fund.name;
  }
  nextTick();
}
let {
  actualAddressIdFromStorage,
  mailingAddressIdFromStorage,
  legalAddressIdFromStorage,
} = profileStore;
async function getStep2() {
  // try {
  //   await profileStore.initDataFromLocalStorage();
  // } catch (e) {
  //   console.error(e);
  // }
  let gen = await getRequisitesInfo();
  let {
    bankDetails,
    legalAddress,
    actualAddress,
    mailingAddress,
  } = await gen.next().then((e) => e.value);
  let myForm = unref(form);
  console.log(bankDetails, "bankDetails");

  myForm.inn = bankDetails.inn;
  myForm.kpp = bankDetails.kpp;
  myForm.ogrn = bankDetails.ogrn;
  myForm.fullNameBank = bankDetails.full_name;
  myForm.bik = bankDetails.bik;
  myForm.countScore = bankDetails.checking_account;
  myForm.correspondentScore = bankDetails.correspondent_account;
  myForm.city = legalAddress.city;
  myForm.address = legalAddress.physical_address;
  myForm.officeOrFlat = legalAddress.office;
  myForm.index = legalAddress.index;
  if (actualAddressIdFromStorage) {
    myForm.address_actual = actualAddress.physical_address;
    myForm.officeOrFlatActual = actualAddress.office;
    myForm.index_actual = actualAddress.index;
    myForm.city_actual = actualAddress.city;
    myForm.actualAddress = false;
  }
  if (mailingAddressIdFromStorage) {
    myForm.address_mailing = mailingAddress.physical_address;
    myForm.officeOrFlatMailing = mailingAddress.office;
    myForm.index_mailing = mailingAddress.index;
    myForm.city_mailing = mailingAddress.city;
    myForm.mailingAddress = false;
  }
}
function getStep3() {
  for (const iterator in mapFormStep3ToApi) {
    console.log(iterator, profileStore.fund[mapFormStep3ToApi[iterator]]);
    form.value[iterator] = profileStore.fund[mapFormStep3ToApi[iterator]];
  }
}
function createFile(name) {
  return [
    {
      file: new File([`${name}`], `${name}.jpeg`, { type: "image/jpeg" }),
      status: null,
      id: "1",
      url: import.meta.env.VITE_APP_BACKEND_HOST + profileStore.fund[name],
    },
  ];
}
const router = useRouter();
const route = useRoute();

let showNextStep = ref(false);
let isEmailError = ref(false);
let isPasswordError = ref(false);
let isCodeError = ref(false);
// let isShowCodeField = ref(false);
let isLoadingBtn = ref(false);
</script>
<template>
  <section>
    <div class="form_container" @keypress.enter="setStepInfo()">
      <h1 class="form_title">Заполнение профиля</h1>
      <p class="form_subtitle">
        Для получения доступа ко всем возможностям нашей платформы, необходимо заполнить
        профиль вашего НКО. После успешной верификации, вы сможете запустить сбор
        пожертвований, отправить заявку на установку терминалов, получите доступ к CRM для
        НКО, а также попадете в каталог фондов на нашем сайте и многое другое.
      </p>
      <div style="display: flex; justify-content: center">
        <ProfileStepView :steps="steps"></ProfileStepView>
        <SchemaFormWithPlugins
          style="max-width: 420px; width: 100%"
          :schema="schema"
          :validation-schema="validationSchema"
          @submit="setStepInfo"
        >
          <template #afterForm="{ validation }">
            <div class="btn__container">
              <p
                class="step-back vblg-link"
                v-show="!form.isShowStep1"
                @click="backStep()"
              >
                Назад
              </p>
              <ChButton
                class="btn"
                @click="setStepInfo()"
                :loading="isLoadingBtn"
                :disabled="!validation.meta.valid"
                >Сохранить и продолжить</ChButton
              >
            </div>
          </template>
        </SchemaFormWithPlugins>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
.step-back {
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 600;
  text-decoration-line: none;
  color: #0f75bd;
  margin: 0 22px 0 0;
  height: fit-content;
  cursor: pointer;
}
.btn {
  max-width: fit-content !important;
  margin: 0;
  &__container {
    margin-top: 25px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .btn {
      margin-left: 0;
    }
  }
}
.form {
  &_container {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  &__link {
    max-width: 328px;
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
  &_subtitle {
    position: relative;
    float: left;
    text-align: left !important;
    max-width: 100%;
    margin-top: 0;
    margin-bottom: 35px;
    font-family: Montserrat, sans-serif;
    font-style: normal;
    font-weight: normal;
    color: #333333;
  }
}
</style>
