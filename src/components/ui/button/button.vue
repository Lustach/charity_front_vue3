<script lang="ts" setup>
import { ElButton } from "element-plus";
interface Props {
  loading: boolean;
  maxWidth?: string;
}
const props = withDefaults(defineProps<Props>(), {
  loading: false,
});
// let {isLoading=false, maxWidth} = toRefs(defineProps<Props>());
// const props = defineProps<{
//   isLoading: boolean;
//   maxWidth?: string;
// }>();
</script>
<template>
  <el-button
    type="primary"
    class="vblg-btn"
    :loading="loading"
    :style="{ maxWidth: maxWidth }"
  >
    <slot></slot>
  </el-button>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/ui/button/button.scss";
</style>
