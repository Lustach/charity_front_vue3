<script lang="ts" setup>
interface ButtonProps {
  loading: boolean;
  maxWidth?: string;
  text?: string;
}
withDefaults(defineProps<ButtonProps>(), {
  loading: false,
});
// let {isLoading=false, maxWidth} = toRefs(defineProps<Props>());
// const props = defineProps<{
//   isLoading: boolean;
//   maxWidth?: string;
// }>();
</script>
<template>
  <button
    class="vblg-btn"
    :loading="loading"
    :style="{ maxWidth: maxWidth }"
  >
    <slot>{{ text }}</slot>
  </button>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/ui/button/button.scss";
</style>
