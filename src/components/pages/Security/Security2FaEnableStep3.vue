<template>
  <div class="app-modal">
    <el-dialog
      class="el-dialog__step-2"
      :model-value="modelValue"
      :before-close="handleClose"
    >
      <div class="app-modal__content">
        <h2>Введите шестизначный код с вашего телефона</h2>
        <div class="form-group">
          <ChInput
            style="margin-top: 20px; max-width: 328px"
            id="code"
            :maxLength="6"
            type="text"
            @update:modelValue="(e) => (code = e)"
            :error="error"
          ></ChInput>
          <!-- <div
            class="el-form-item__error"
            style="
              margin-top: 10px;
              margin-bottom: -15px;
              text-align: left !important;
              font-size: 13.23px !important;
            "
            v-if="isErrorRequest"
            v-timeout="{ time: 3500, varName: 'isErrorRequest' }"
          >
            Неверный код
          </div> -->
        </div>
        <ChButton
          :disabled="code.length !== 6"
          @click="showStep4"
          maxWidth="150px"
          style="max-width: fint-content"
        >
          Готово</ChButton
        >
        <!-- <el-button class="my-btn my-btn_modal" type="primary" @click="$emit('showStep3')"
          >Готово</el-button
        > -->
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, markRaw, inject, watch } from "vue";
import { useAuthStore } from "@/stores/modules/auth/auth";
import * as yup from "yup";
//components
import ChCheckbox from "@/components/ui/checkbox/checkbox.vue";
import ChButton from "@/components/ui/button/button.vue";
import ChInput from "@/components/ui/input/input.vue";
const authStore = useAuthStore();
const API = inject("API");
markRaw(ChButton);
markRaw(ChInput);
let emit = defineEmits(["close", "showEnableStep4"]);

let code = ref("");
let error = ref("");
let schema = yup.object().shape({
  code: yup.string().min(6).max(6).required(),
});
let isValid = ref(false);
watch(
  () => code,
  (nV) => {
    if (nV) {
      if (error.value) error.value = "";
      schema
        .isValid({
          code: nV,
        })
        .then(function (valid) {
          isValid.value = valid;
          valid; // => true
        });
    }
  },
  {
    deep: true,
  }
);

const dialogVisible = ref(false);
let props = defineProps({
  modelValue: {
    required: true,
    default: false,
    type: Boolean,
  },
});
const handleClose = (done: () => void) => {
  emit("close");
  done();
};
async function showStep4() {
  try {
    let fd = new FormData();
    fd.append("otp", code.value);
    await API.user.sendEmail2Fa(fd);
    emit("showEnableStep4");
  } catch (e) {
    error.value = "Неверный код";
    console.error(e);
  }
}
</script>
<style scoped lang="scss">
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
<style lang="scss" scoped>
@import "src/assets/scss/components/_app-modal.scss";
@import "src/assets/scss/components/_el-dialog.scss";
.app-modal:deep .el-dialog {
  font-size: 17px !important;
  max-width: 480px !important;
}
.app-modal__content {
  display: flex;
  flex-direction: column;
}
h2 {
  font-size: 16px !important;
}
.my-btn_modal {
  margin-top: 40px;
}

.my-btn {
  max-width: 270px !important;
}
.form-group {
  max-width: 328px;
  width: 100%;
}
</style>
