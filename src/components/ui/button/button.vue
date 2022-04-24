<script lang="ts" setup>
import { ElButton } from "element-plus";
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <el-button type="primary" class="vblg-btn" :loading="isLoading">
    <slot></slot>
  </el-button>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/ui/button/button.scss";
</style>
