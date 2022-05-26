<template>
  <div class="app-modal">
    <el-dialog
      class="el-dialog__step-2"
      :model-value="modelValue"
      :before-close="handleClose"
    >
      <div class="app-modal__content">
        <h2>Отсканируйте QR код</h2>
        <div class="qr-info_container">
          <img :src="qrCode" alt="" width="210px" />
          <div class="qr-info_container_about">
            <p>Или добавьте вручную:</p>
            <p class="qr_about-row">
              <span>Имя</span>
              <span>{{ authStore.email }}</span>
            </p>
            <p class="qr_about-row">
              <span>Личный ключ</span>
              <span>{{ code2Fa }}</span>
            </p>
          </div>
        </div>
        <div style="text-align: left" class="links_container">
          <p>
            Скачайте Google Auth для
            <a
              class="vblg-link"
              href="https://apps.apple.com/ru/app/google-authenticator/id388497605"
              >Apple
            </a>
            и
            <a
              class="vblg-link"
              href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=ru&gl=US"
              >Android
            </a>
          </p>
          <p style="margin-top: 6px">
            Остались вопросы? Инструкция
            <a
              class="vblg-link"
              href="https://support.google.com/accounts/answer/1066447?co=GENIE.Platform%3DAndroid&hl=ru"
              target="_blank"
              >здесь.
            </a>
          </p>
        </div>
        <ChButton> Готово</ChButton>
        <!-- <el-button class="my-btn my-btn_modal" type="primary" @click="$emit('showStep3')"
          >Готово</el-button
        > -->
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, markRaw, onMounted } from "vue";
import { useAuthStore } from "@/stores/modules/auth/auth";
//components
import ChCheckbox from "@/components/ui/checkbox/checkbox.vue";
import ChButton from "@/components/ui/button/button.vue";
const authStore = useAuthStore();

markRaw(ChCheckbox);
markRaw(ChButton);

let emit = defineEmits(["close"]);
const dialogVisible = ref(false);
let props = defineProps({
  modelValue: {
    required: true,
    default: false,
    type: Boolean,
  },
  qrCode: {
    required: true,
  },
  code2Fa: {
    required: true,
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
h2 {
  font-size: 16px !important;
}
.my-btn_modal {
  margin-top: 40px;
}

.my-btn {
  max-width: 270px !important;
}

.links_container {
  width: 100%;
  margin-left: 32px;
  p {
    font-size: 16px !important;
  }
  a {
    color: #0f75bd;
    font-size: 16px !important;
  }
}

.qr-info_container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 12px;

  img {
    width: 100% !important;
    max-width: 210px;
    margin-right: 8.92px;
  }

  p {
    margin: 0;
    text-align: left;
  }
  &_about {
    margin-top: 11px;
  }
}

.qr_about {
  &-row {
    display: flex;
    flex-direction: column;
    margin-top: 28px !important;

    span:nth-child(1) {
      color: #0f75bd;
    }
  }
}
</style>
