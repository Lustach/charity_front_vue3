<template>
  <div>
    <el-form-item class="form-group form-group_profile">
      <div class="form_profile-category">
        <img class="line" src="@/assets/images/icons/step_line-horizontal.svg" alt="" />
        <h2>{{ addressLabel }}</h2>
      </div>
    </el-form-item>
    <!--    Компонент для почтового или актуального адреса-->
    <el-form
      :ref="addressInfo.formRef"
      :model="addressInfo.addressListName"
      :rules="rules"
    >
      <div v-for="(e, key) in addressInfo.addressListName" :key="key">
        <el-form-item
          class="form-group form-group_profile"
          v-if="e.apiKey !== 'office' && e.apiKey !== 'index'"
          :prop="key"
          :ref="key"
        >
          <label :for="key">{{ e.label }}</label>
          <el-input
            class="my-input my-input_profile"
            v-model="e.model"
            @change.native="validateAddressField(key, false, addressInfo.formRef)"
            @input="validateAddressField(key, true, addressInfo.formRef)"
            :ref="key"
            :id="key"
          ></el-input>
        </el-form-item>
      </div>
      <div class="form-group_flex-container">
        <el-form-item class="form-group form-group_profile" :prop="addressFieldByI(2)">
          <label>{{ addressInfo.addressListName[addressFieldByI(2)].label }}</label>
          <el-input
            class="my-input my-input_profile"
            v-model="addressInfo.addressListName[addressFieldByI(2)].model"
            @change.native="
              validateAddressField(addressFieldByI(2), false, addressInfo.formRef)
            "
            @input="validateAddressField(addressFieldByI(2), true, addressInfo.formRef)"
            :ref="addressFieldByI(2)"
          ></el-input>
        </el-form-item>
        <el-form-item class="form-group form-group_profile" :prop="addressFieldByI(3)">
          <label>{{ addressInfo.addressListName[addressFieldByI(3)].label }}</label>
          <el-input
            class="my-input my-input_profile"
            v-model="addressInfo.addressListName[addressFieldByI(3)].model"
            @change.native="
              validateAddressField(addressFieldByI(3), false, addressInfo.formRef)
            "
            @input="validateAddressField(addressFieldByI(3), true, addressInfo.formRef)"
            @input.native="
              validateFieldByType(
                addressInfo.addressListName[addressFieldByI(3)],
                addressFieldByI(3),
                $event
              )
            "
            :maxlength="addressInfo.addressListName[addressFieldByI(3)].lengthForErrorMsg"
            type="text"
            :ref="addressFieldByI(3)"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import profileData from "../../authentication/profile/profileData";
import rules from "@/mixins/rules";
import profile from "@/mixins/profile/profile/profile";
import { Form, FormItem, Input } from "element-ui";

export default {
  name: "Address",
  components: {
    "el-form": Form,
    "el-form-item": FormItem,
    "el-input": Input,
  },
  mixins: [rules, profileData, profile],
  props: {
    addressInfo: {
      required: true,
      default: {
        addressListName: undefined, //объект actualAddress || mailAddress
        addressNameInCheckbox: undefined, // чекбоксы на 2 шаге || в реквизитах находятся в массиве legalAddressCheckBoxes
      },
    },
    addressLabel: {
      required: true,
    },
  },
  methods: {
    addressFieldByI(i) {
      //возвращаем поле формы по индексу в объекте формы
      return Object.keys(this.addressInfo.addressListName)[i];
    },
  },
};
</script>

<style scoped lang="scss">
.form-group_flex-container {
  margin-top: 25px;
}
</style>
