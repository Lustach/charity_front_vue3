<script setup lang="ts">
import { computed, ref, markRaw, inject, onMounted } from "vue";
import type { Ref } from "vue";
import { schema, form, validationSchema } from "@/components/pages/FillProfile/form";
import { backStep, steps } from "@/components/pages/FillProfile/useStep";
import { useRouter, useRoute } from "vue-router";
import { useSchemaForm, SchemaFormFactory } from "formvuelate";
import LookupPlugin from "@formvuelate/plugin-lookup";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";
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
useSchemaForm(form);
markRaw(ChButton);
// markRaw(ChMultiselect);
const mapFormStep1ToApi = {
  fullNameNko: "name",
  shortDescriptionActivity: "short_description",
  fullDescriptionActivity: "long_description",
  helpCategory: "category",
  charter: "nko_statute",
  certificateRecord: "nko_taxes_certificate",
  certificateRegistration: "nko_register_certificate",
  logo: "upload_image",
};
onMounted(()=>{
  getStep1()
})
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
  console.log(profileStore.fund,"getSTep1");
}
const router = useRouter();
const route = useRoute();

let showNextStep = ref(false);
let isEmailError = ref(false);
let isPasswordError = ref(false);
let isCodeError = ref(false);
// let isShowCodeField = ref(false);
let isLoadingBtn = ref(false);
function updateTest() {
  console.log("updateTest");
}
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
                v-show="form.isShowStep1"
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
