<template>
  <div class="app-modal">
    <el-dialog
        :visible="true"
        :before-close="close">
      <div class="app-modal__content">
        <h2>Введите шестизначный код с вашего телефона</h2>
        <div class="form-group" >
          <el-input class="my-input my-input_profile" v-model="code" maxLength="6"></el-input>
          <div class="el-form-item__error" style="margin-top: 10px;margin-bottom: -15px;text-align: left !important;font-size: 13.23px !important;" v-if="isErrorRequest" v-timeout="{time: 3500,varName:'isErrorRequest'}">
            Неверный код
          </div>
        </div>
        <el-button class="my-btn my-btn_modal" type="primary" @click="showStep4">Отключить</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {Button, Dialog, Input} from 'element-ui';
import {mapActions} from 'vuex';

export default {
  name: 'Step1',
  components: {
    'ElDialog': Dialog,
    'el-button': Button,
    'el-input': Input,

  },
  data: () => ({
    code: '',
    isErrorRequest: false,
  }),
  methods: {
    close: function () {
      this.$emit('close');
    },
    async showStep4() {
      try {
        let fd = new FormData();
        fd.append('otp', this.code);
        await this.$API.user.deleteEmail2Fa(fd);
        this.$emit('showStep2');
      } catch (e) {
        this.isErrorRequest = true;
        console.error(e);
      }
    },
  },
};
</script>

<style lang="scss">
@import "src/assets/scss/components/_app-modal.scss";
@import "src/assets/scss/components/_el-dialog.scss";
</style>
<style lang="scss" scoped>
.my-btn {
  max-width: 270px !important;
}
.my-input_profile{
  max-width: 514px;
}
.app-modal__content{
  padding-left: 70px;
  padding-right: 70px;
}
</style>
