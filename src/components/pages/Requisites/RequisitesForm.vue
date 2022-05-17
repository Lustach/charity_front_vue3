<script setup lang="ts">
//vue
import { computed, markRaw, ref, watch, onMounted, unref, inject } from "vue";
// schema & validation
import { useForm } from "vee-validate";
import {
  schema,
  form,
  validationSchema,
  description,
} from "@/components/pages/Requisites/form";
import { useSchemaForm, SchemaFormFactory } from "formvuelate";
import LookupPlugin from "@formvuelate/plugin-lookup";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";
// Components
import ChButton from "@/components/ui/button/button.vue";
//store
import { useProfileStore } from "@/stores/modules/profile/profile";
//compositions
import { getRequisitesInfo } from "@/components/compositions/Requisites/useRequisites";
import {
  isDiscardBtnDisabled,
  isShowAlert,
  isBidStatusOpened,
  changeBidStatus,
} from "@/components/pages/Requisites/bids";
const API = inject("API");

markRaw(ChButton);
let profileStore = useProfileStore();

let copyLegalAddress = ref(undefined);
let copyActualAddress = ref(undefined);
let copyMailingAddress = ref(undefined);
let copyBankDetails = {}

let {
  actualAddressIdFromStorage,
  mailingAddressIdFromStorage,
  legalAddressIdFromStorage,
} = profileStore;
onMounted(async () => {
  try {
    await profileStore.initDataFromLocalStorage();
  } catch (e) {
    console.error(e);
  }
  let gen = await getRequisitesInfo();
  let {
    bankDetails,
    legalAddress,
    actualAddress,
    mailingAddress,
  } = await gen.next().then((e) => e.value);
  let myForm = unref(form);

  // for (const iterator in myForm) {
  //   console.log(iterator,myForm,legalAddress[iterator],legalAddress.city);
  //   myForm[iterator] = bankDetails[iterator];
  //   if (iterator === "city") myForm[iterator] = legalAddress[iterator];
  //   if (iterator === "city_actual") myForm[iterator] = actualAddress[iterator];
  //   if (iterator === "city_mailing") myForm[iterator] = mailingAddress[iterator];
  //   if (iterator === "actualAddress") break;
  // }

  copyBankDetails.inn = JSON.parse(JSON.stringify(myForm.inn = bankDetails.inn));
  copyBankDetails.kpp = JSON.parse(JSON.stringify(myForm.kpp = bankDetails.kpp));
  copyBankDetails.ogrn = JSON.parse(JSON.stringify(myForm.ogrn = bankDetails.ogrn));
  copyBankDetails.full_name = JSON.parse(JSON.stringify(myForm.fullNameBank = bankDetails.full_name));
  copyBankDetails.bik = JSON.parse(JSON.stringify(myForm.bik = bankDetails.bik));
  copyBankDetails.countScore = JSON.parse(JSON.stringify(myForm.countScore = bankDetails.checking_account));
  copyBankDetails.correspondentScore = JSON.parse(JSON.stringify(myForm.correspondentScore = bankDetails.correspondent_account));
  
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
});
async function saveRequisites() {
  let myForm = unref(form);
  const actualAddress = {
    bank_details: profileStore.bankDetailsIdFromStorage,
    city: myForm.city_actual,
    physical_address: myForm.address_actual,
    office: myForm.officeOrFlatActual,
    index: myForm.index,
  };
  const legalAddress = {
    bank_details: profileStore.bankDetailsIdFromStorage,
    city: myForm.city,
    physical_address: myForm.address,
    office: myForm.officeOrFlat,
    index: myForm.index,
  };
  const mailingAddress = {
    bank_details: profileStore.bankDetailsIdFromStorage,
    city: myForm.city_mailing,
    physical_address: myForm.address_mailing,
    office: myForm.officeOrFlatMailing,
    index: myForm.index_mailing,
  };
  const fd = new FormData();
  //   fd.set(myForm.inn);
  // fd.set(myForm.kpp);
  // fd.set(myForm.ogrn);
  // fd.set(myForm.fullNameBank);
  // fd.set(myForm.bik);
  // fd.set(myForm.countScore);
  // fd.set(myForm.correspondentScore);
  for (const dataKey of schema.value) {
    if (dataKey.id === "city") break;
    fd.set(dataKey.apiKey, form.value[dataKey.inn]);
  }

  await API.bid.updateActualAddress(actualAddressIdFromStorage, actualAddress);
  await API.bid.updateLegalAddress(legalAddressIdFromStorage, legalAddress);
  await API.bid.updateMailingAddress(mailingAddressIdFromStorage, mailingAddress);
  await profileStore.getBids();
}
//
let isLoadingBtn = ref(false);

//schema validation
const SchemaFormWithPlugins = SchemaFormFactory([LookupPlugin({}), VeeValidatePlugin()]);
useSchemaForm(form);
</script>
<template>
  <div class="profile_form_container">
    <alert
      title="Редактируйте реквизиты НКО"
      description="Здесь вы можете обновить или дополнить реквизиты вашего НКО. По ним мы будем отправлять вам собранные средства. Пожалуйста, проверьте корректность введенных
        данных перед обновлением."
    ></alert>
    <alert
      class="alert_error"
      v-if="isShowAlert"
      description="К сожалению, мы не смогли обновить информацию на странице вашего НКО. Пожалуйста, проверьте корректность введенных данных и отправьте заявку повторно."
    >
      <template v-slot:icon>
        <svg
          @click="changeBidStatus('archiveBidByName', 'archiveApiName')"
          class="alert-icon"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.884325 5.14722C-0.294775 3.96812 -0.294775 2.06342 0.884325 0.884325C2.06342 -0.294775 3.96812 -0.294775 5.14722 0.884325L20.022 15.6684L34.8061 0.884325C35.9852 -0.294775 37.8899 -0.294775 39.069 0.884325C40.2481 2.06342 40.3388 3.96812 39.1597 5.14722L24.2849 20.022L39.1597 34.8061C40.3388 35.9852 40.2481 37.8899 39.069 39.069C37.8899 40.2481 35.9852 40.3388 34.8061 39.1597L20.022 24.2849L5.14722 39.1597C3.96812 40.3388 2.06342 40.2481 0.884325 39.069C-0.294775 37.8899 -0.294775 35.9852 0.884325 34.8061L15.6684 20.022L0.884325 5.14722Z"
            fill="grey"
          />
        </svg>
      </template>
    </alert>
    <div class="profile_form_wrapper">
      <SchemaFormWithPlugins
        :schema="schema"
        :validation-schema="validationSchema"
        ref="form1"
        @submit="onSubmit"
      >
        <template #afterForm="{ validation }">
          <div class="btn_container">
            <ChButton
              :loading="isLoadingBtn"
              :class="{ 'my-btn-disabled': isLoadingBtn && isDiscardBtnDisabled }"
              maxWidth="228px"
              style="margin-right: 10px"
              v-if="isBidStatusOpened"
              @click="changeBidStatus('deleteBidByName', 'deleteApiName')"
              >Отменить изменения</ChButton
            >
            <ChButton
              :loading="isLoadingBtn"
              :disabled="!validation.meta.valid || isBidStatusOpened"
              maxWidth="228px"
              style="margin-right: 0"
              @click="saveRequisites"
              >Сохранить изменения</ChButton
            >
          </div>
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
  }
}
.drop-area {
  display: flex;
  flex-direction: column-reverse;
  color: var(--vblg-c-primary);
  width: 100%;
  margin: 0 auto;
  padding: 50px;
  background: #ffffff55;
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
