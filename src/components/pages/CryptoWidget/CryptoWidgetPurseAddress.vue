<script setup lang="ts">
import { ref, inject } from "vue";
import Multiselect from "vue-multiselect";
import ChButton from "@/components/ui/button/button.vue";
const API = inject("API");
let selectValue = ref("BTC");
let purseModel = ref(undefined);
let isLoadingBtn = ref(false);
let isValidAddress = ref(undefined);
async function validatePurseAddress() {
  isLoadingBtn.value = true;
  try {
    let result = await API.crypto.checkCryptoAddress({
      currency: selectValue.value.toLowerCase(),
      address: purseModel.value,
    });
    isValidAddress.value = result.is_valid;
  } catch (e) {
    console.error(e);
  } finally {
    isLoadingBtn.value = false;
  }
}
</script>

<template>
  <div class="purse_container">
    <div>
      <div class="purse-address_container">
        <div style="display: flex; align-items: center">
          <div
            class="multiselect_container form-group form-group_profile"
            style="width: 100%"
          >
            <multiselect
              :options="['BTC', 'ETH']"
              class="my-input my-input_profile"
              :limit="4"
              v-model="selectValue"
              placeholder=""
              :searchable="false"
              open-direction="bottom"
              selectLabel=""
              selectGroupLabel=""
              deselectLabel=""
              selectedLabel=""
              :hideSelected="true"
            ></multiselect>
          </div>
          <div class="purse-address_border"></div>
        </div>
        <div
          class="form-group form-group_profile form-group_profile-lk"
          style="position: relative"
        >
          <img
            class="question_mark question_mark-lk"
            src="@/assets/images/icons/question_mark.svg"
            alt=""
            :data-show="'show'"
            style="width: 21px; height: 21px"
            :data-tooltip="'Убедитесь, что указанный адрес относится к выбранной валюте. Если вы укажите неверный адрес, деньги не будут поступать вам на счет.'"
          />
          <input class="crypto_form-input" v-model="purseModel" />
        </div>
      </div>
      <div
        class="el-form-item__error"
        style="margin-top: 4px; margin-bottom: -44px; top: auto; text-align: left"
        v-if="isValidAddress === false"
      >
        Адрес кошелька не соответствует валюте
      </div>
    </div>
    <ChButton
      class="btn"
      @click="validatePurseAddress()"
      :loading="isLoadingBtn"
      :disabled="isLoadingBtn"
      >Проверить адрес</ChButton
    >
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss" scoped>
@import "@/assets/scss/components/vue-multiselect";

.btn {
  width: fit-content;
  margin: 0;
}

.purse {
  &_container {
    display: flex;
  }
}

.purse-address_border {
  width: 2px;
  background-color: #5f9dd8;
  height: 34px;
  margin-left: -39px;
}

.purse-address_container {
  width: 420px;
  height: 38px;
  background: #ffffff;
  border: 2px solid #b0ceec;
  box-sizing: content-box;
  border-radius: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 19px;

  .form-group_profile {
    width: 497px;
    font-style: normal;
    font-weight: normal;
    font-size: 13.23px;
    color: #000000;

    &:deep input,
    &:deep {
      border-radius: 35px;
      height: 100% !important;
      border: none;
      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 13.23px;
      color: #000000;
    }
  }
}

.multiselect {
  display: flex;
  align-items: center;

  &__content-wrapper {
  }

  &--active {
    &:deep .multiselect__select {
      transform: rotate(0) !important;
    }
  }

  &:deep &__select {
    right: 35px;
    display: flex !important;
    align-self: center;
    z-index: 1;

    &::before {
      border-width: 10px 10px 0;
      border-color: #5f9dd8 transparent transparent;
    }
  }

  &:deep &__tags {
    border: none;
    padding: 0;
    min-height: 25px !important;
  }

  &:deep &__content-wrapper {
    margin: 0;
    box-sizing: content-box;
    left: -1 px;
    top: 49px;
    border: none;
    margin-top: -22px !important;
    max-width: 82px;
    height: 28px;
    overflow: hidden;
  }

  &:deep &__content {
    //& ul {
    //}
    & li span {
      padding: 0 !important;
    }

    & li > span:first-child {
      padding-top: 5px !important;
      padding-left: 14px !important;
    }

    //padding: 0 0 0 14px !important;
  }

  //&__option{
  //  padding: 0 !important;
  //}
  &:deep &__single {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    border-radius: 35px;
    width: 55px;
    color: #0f75bd;
  }

  &_container {
    width: 121px !important;

    &:deep input {
      border: none;
    }
  }
}

.crypto_form-input {
  border-radius: 35px;
  height: 100%;
  width: 100%;
  padding: 0 15px;
}

.question_mark {
  top: -14px;
  right: -10px;
  width: 16px !important;
  height: 16px !important;
}
</style>
