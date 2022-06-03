<template>
  <div class="app-modal">
    <el-dialog
      class="el-dialog__step-1"
      :model-value="modelValue"
      :before-close="handleClose"
    >
      <div class="app-modal__content">
        <h2>Подтвердите {{isEnable ?"подключение" : 'отключение'}} Google Auth по почте</h2>
        <p style="max-width: 380px;
    text-align: center;
    margin-top: 10px;">Мы отправили письмо со ссылкой на подтверждение {{isEnable ?"включения" : 'отключения'}} двухфакторной аутентификации. Пожалуйста, проверьте свой почтовый ящик, чтобы завершить настройку.</p>
        <ChButton
          maxWidth="150px"
          @click="emit('close')"
          >Хорошо</ChButton
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

let emit = defineEmits(["close", "showEnableStep"]);
let props = defineProps({
  modelValue: {
    required: true,
    default: false,
    type: Boolean,
  },
  isEnable: {
    required: true,
    type: Boolean,
  }
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

h2{
    max-width: 400px;
}
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
