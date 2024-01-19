<template>
  <div class="app-modal">
    <el-dialog
      class="app-modal"
      :model-value="modelValue"
      :before-close="handleClose"
      :close-on-click-modal="closeOnClickMask"
    >
      <div class="app-modal__content">
        <img :src="image" alt="" :style="{ width: imgSize + 'px' }" />
        <div class="app-modal__content--message">
          <p class="content" v-for="(message, key) in messages" :key="key">
            <span v-if="key === 0" style="font-weight: 600">{{ message }}</span>
            <span v-else style="font-weight: 400">{{ message }}</span>
          </p>
        </div>
      </div>
      <el-button
        v-if="propFn"
        @click="propFn"
        class="my-btn my-btn_modal"
        type="primary"
        style="margin-top: 20px"
        >Выйти из кабинета</el-button
      >
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
let emit = defineEmits(["close"]);
defineProps({
  closeOnClickMask: {
    default: true,
    type: Boolean,
  },
  modelValue: {
    required: true,
    default: false,
    type: Boolean,
  },
  image: {
    type: String,
  },
  messages: {
    type: Array,
  },
  propFn: Function,
  imgSize: {
    type: Number,
  },
  customClass: {
    type: String,
  },
});
const handleClose = (done: () => void) => {
  emit("close");
  done();
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
<style lang="scss">
@import "src/assets/scss/components/_app-modal.scss";
@import "src/assets/scss/components/_el-dialog.scss";
</style>
