<script lang="ts" setup>
import { ElButton } from "element-plus";
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  maxWidth:{
    type: String,
  }
});
</script>
<template>
  <el-button type="primary" class="vblg-btn" :loading="isLoading" :style="{maxWidth:maxWidth}">
    <slot></slot>
  </el-button>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/ui/button/button.scss";
</style>
