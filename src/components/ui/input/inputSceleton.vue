<script setup lang="ts">
const props = defineProps({
    tooltip: {
        type: String
    }
//   type: "text",
//   label: "",
//   placeholder: "",
});
</script>
<template>
  <!-- <label :for="id">{{ label }}</label> -->
  <!-- <img
      v-if="tooltip"
      class="question_mark"
      src="@/assets/images/icons/question_mark.svg"
      alt="tooltip"
      :data-tooltip="tooltip"
      ref="target"
    /> -->
  <div class="vblg-input__container">
    <div class="sceleton-tooltip" v-if="tooltip"></div>
    <div autocomplete="off" class="vblg-input sceleton" />
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/scss/ui/input.scss";

.sceleton {
  background: rgba(0, 0, 0, 0.12) !important;
  border: none !important;
  &:focus {
    box-shadow: none !important;
  }
  &:after {
    background: linear-gradient(
      90deg,
      hsla(0, 0%, 100%, 0),
      hsla(0, 0%, 100%, 0.3),
      hsla(0, 0%, 100%, 0)
    );
    animation: loading 2.5s infinite;
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(-100%);
    z-index: 1;
  }
  &-tooltip {
    background: rgba(0, 0, 0, 0.12) !important;
    border-radius: 8px;
    top: -12px;
    position: absolute;
    right: -8px;
    width: 16px;
    height: 16px;
    z-index: 1;
    &:after {
      background: linear-gradient(
        90deg,
        hsla(0, 0%, 100%, 0),
        hsla(0, 0%, 100%, 0.3),
        hsla(0, 0%, 100%, 0)
      );
      animation: loading-tooltip 2.5s infinite;
      content: "";
      height: 100%;
      left: 10px;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(-100%);
      z-index: 1;
    }
  }
}
@keyframes loading {
  from {
    left: 0;
    opacity: 1;
  }
  to {
    left: 328px;
    opacity: 0;
  }
}
@keyframes loading-tooltip {
  from {
    left: 8px;
    opacity: 1;
  }
  to {
    left: 26px;
    opacity: 0;
  }
}
</style>
