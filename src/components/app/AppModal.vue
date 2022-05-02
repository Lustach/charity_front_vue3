<template>
  <!-- <el-button type="text" @click="dialogVisible = true"
    >click to open the Dialog</el-button
  > -->
  <div class="app-modal">
    <el-dialog class="app-modal" :model-value="modelValue" :before-close="handleClose">
      <div class="app-modal__content">
        <!-- <div> -->
        <img :src="image" alt="" :style="{ width: imgSize + 'px' }" />
        <div class="app-modal__content--message">
          <p class="content" v-for="(message, key) in messages" :key="key">
            <span v-if="key === 0" style="font-weight: 600">{{ message }}</span>
            <span v-else style="font-weight: 400">{{ message }}</span>
          </p>
        </div>
        <!-- </div> -->
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
  <!-- <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </template>
  </el-dialog> -->
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";
import { ElMessageBox } from "element-plus";
let emit = defineEmits(["close"]);
const dialogVisible = ref(false);
let props = defineProps({
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
  // ElMessageBox.confirm("Are you sure to close this dialog?")
  //   .then(() => {
  //     done();
  //   })
  //   .catch(() => {
  //   });
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
