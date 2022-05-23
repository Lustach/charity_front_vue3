<template>
  <div class="app-modal">
    <el-dialog
      class="el-dialog__step-1"
      :model-value="modelValue"
      :before-close="handleClose"
    >
      <div class="app-modal__content">
        <h2>Запишите и сохраните резервный код:</h2>
        <p style="color: #0f75bd; margin: 30px auto; font-size: 17px" cy="reserve_code">
          {{ code }}fasdfasdf
        </p>
        <p
          style="
            max-width: 360px;
            text-align: center;
            word-break: break-word;
            margin-bottom: 40px;
          "
        >
          Если у вас не будет доступа к телефону, вы сможете войти в свой профиль
          <span style="font-weight: 600">только по этому резервному коду.</span>
        </p>
        <ChCheckbox id="confirm" v-model.native="isConfirm">
          <template #text><p>Я сохранил резервный код</p></template>
        </ChCheckbox>
        <ChButton
          maxWidth="150px"
          :loading="isLoadingBtn"
          :disabled="!isConfirm"
          @click="emit('showEnableStep2')"
          >Подтвердить</ChButton
        >
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, markRaw } from "vue";
import { object, bool } from "yup";
//components
import ChCheckbox from "@/components/ui/checkbox/checkbox.vue";
import ChButton from "@/components/ui/button/button.vue";
markRaw(ChCheckbox);
markRaw(ChButton);
// const validationSchema = object({
//   confirm: bool().oneOf([true], ""),
// });
// const form = ref({
//   confirm: false,
// });
let isConfirm = ref(false);
let emit = defineEmits(["close", "showEnableStep2"]);
const dialogVisible = ref(false);
let props = defineProps({
  modelValue: {
    required: true,
    default: false,
    type: Boolean,
  },
  code: {
    required: true,
    type: String,
  },
});
const handleClose = (done: () => void) => {
  emit("close");
  done();
};
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

.my-btn {
  max-width: 270px !important;
}

.app-modal__content {
  flex-direction: column;
  display: flex;
  font-size: 17px !important;
}
</style>
