<template>
  <div class="form_container" v-loading="loading">
    <alert
      title="Сгенерируйте QR-код для вашего НКО"
      description="Используйте QR-коды в своих рекламных материалах, на ящиках для пожертвований или в любом другом месте. Генерируйте QR на перевод пожертвования или на страницу
        вашего НКО на сайте “воБлаго”."
    >
    </alert>
    <div class="profile_form_container">
      <div class="qr__actions">
        <h2>Сгенерировать QR-код</h2>
        <h3>Выберите, куда будет вести ваш QR-код:</h3>
        <div class="radio_container">
          <el-radio v-model="radio1" label="2">Код на страницу НКО</el-radio>
          <ChButton
            class="my-btn my-btn_modal"
            type="primary"
            @click="generateQr()"
            :loading="btnLoading"
            >Создать QR-код</ChButton
          >
        </div>
      </div>
      <div class="qr__container">
        <div class="qr__container-empty" v-if="!qr">
          <p><span>Здесь будет ваш QR-код</span></p>
        </div>
        <img :src="qr" alt="" v-else style="" />
        <div v-show="qr" style="display: flex">
          <a :href="qr" download="Мой_QR-Код.svg" style="margin-right: 18px">
            <ChButton class="my-btn my-btn_modal my-btn_upload" type="primary">
              <div style="display: flex; justify-content: center; align-items: center">
                <img
                  src="@/assets/images/icons/upload-icon.svg"
                  style="margin-right: 8px; width: 20px"
                  alt=""
                />SVG
              </div>
            </ChButton>
          </a>
          <a :href="qrJpg" download="Мой_QR-Код.jpg" id="QrJpg">
            <ChButton class="my-btn my-btn_modal my-btn_upload" type="primary">
              <div style="display: flex; justify-content: center; align-items: center">
                <img
                  src="@/assets/images/icons/upload-icon.svg"
                  style="margin-right: 8px; width: 20px"
                  alt=""
                />JPG
              </div>
            </ChButton>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, onMounted } from "vue";
import { ElRadio } from "element-plus";
import ChButton from "@/components/ui/button/button.vue";
import Alert from "@/components/app/Alert.vue";
import { useProfileStore } from "@/stores/modules/profile.ts";
const profileStore = useProfileStore();
const API = inject("API");
let loading = ref(true);
let radio1 = ref("2");
let btnLoading = ref(false);
let qr = ref("");
let qrJpg = ref("");
onMounted(async () => {
  await profileStore.initDataFromLocalStorage();
  const generatedQrId = await API.user.getGeneratedQrList();

  if (generatedQrId?.NKO_PAGE_QR) {
    const result = await API.user.getGeneratedQr(generatedQrId?.NKO_PAGE_QR);
    qr.value = result.qr_svg;
    qrJpg.value = result.qr_jpeg;
  }
  loading.value = false;
});
async function generateQr() {
  btnLoading.value = true;
  try {
    const result = await API.user.generateQr({
      category: "NKO_PAGE_QR",
      qr_extension: "SVG",
    });
    qr.value = result.qr_svg;
    qrJpg.value = result.qr_jpeg;
  } catch (e) {
    btnLoading.value = false;
    console.error(e);
  }
  btnLoading.value = false;
}
</script>
<style lang="scss">
.el-radio__input.is-checked .el-radio__inner::after {
  transform: translate(-50%, -50%) scale(0.7) !important;
}

.el-radio {
  &__inner {
    width: 26px !important;
    height: 26px !important;
    background: #ffffff !important;
    border: 2px solid #b0ceec !important;
    box-sizing: border-box !important;
  }
}

.el-radio__inner {
  &::after {
    width: 26px !important;
    height: 25px !important;
    background-color: #b0ceec !important;
  }
}

.el-radio__label {
  font-weight: normal;
  font-size: 13.23px !important;
  line-height: 30px;
  color: #333333;
}
</style>
<style scoped lang="scss">
@import "src/assets/scss/components/alert";

.my-btn {
  width: 276px;
  margin: 36px 0 0 0;

  &_upload {
    width: 95px;
    height: 38px;
    margin-top: 0;

    &:first-child {
      margin-right: 5px;
    }
  }
}

.profile_form_container {
  justify-content: space-between;
  max-width: 1000px;
  h2,
  h3 {
    margin: 16px 0;
  }
  h3{
    font-weight: 700;
  }
}


.qr__actions{
  margin-left: 56px;
}
.qr__container {
  width: 100%;
  max-width: 280px;
  height: 280px;
  display: flex;
  //justify-content: center;
  align-items: center;
  flex-direction: column;

  > img {
    max-width: 200px;
    height: 200px;
    margin-top: 10px;
    @media (max-width: 555px) {
      margin-right: 0px;
    }
  }

  &-empty {
    width: 200px;
    height: 200px;
    background: #ffffff;
    border: 2px solid #b0ceec;
    box-sizing: border-box;
    border-radius: 35px;
    margin-right: 100px;
    margin-top: 15px;

    p {
      width: 100%;
      height: 100%;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      font-size: 13.23px;
      line-height: 30px;
      text-align: center;
      color: #b0ceec;

      span {
        width: 193px;
      }
    }
  }
}

.radio_container {
  display: flex;
  flex-direction: column;
  text-align: left;

  label {
    margin-bottom: 4px;
  }
}

h2 {
  font-weight: 600;
  font-size: 18px;
  color: #5f9dd8;
  text-align: left;
}

h3 {
  font-size: 16px;
  color: #0f75bd;
  text-align: left;
}

.qr {
  &__wrapper {
    display: flex;
  }
}

@media (max-width: 610px) {
  .profile_form_container {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }
  .qr__actions {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
      display: flex;
      align-items: center;
    }
  }
}
</style>
