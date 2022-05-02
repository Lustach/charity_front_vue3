<script setup lang="ts">
import { ref, unref } from "vue";
import { useField } from "vee-validate";
import { Props } from "@/components/ui/input/interface.ts";
import useInputHandlers from "@/components/compositions/useInputHandlers.ts";
import { useMouseInElement } from "@vueuse/core";

let inputHandlers = useInputHandlers;
// console.log(inputHandlers);

const emit = defineEmits(["update:modelValue", "toggleEye"]);
//* TODO: imported interfaces are not support official by Evan(nice joke) :) https://github.com/vuejs/vue-next/issues/4294
/* we need to use plugin https://github.com/wheatjs/vite-plugin-vue-type-imports
 */
// https://vee-validate.logaretm.com/v4/guide/composition-api/validation#handling-events

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  label: "Label",
  placeholder: "Placeholder",
});

let { value: modelValue, errorMessage, handleBlur, handleChange, meta } = useField(
  props.id,
  undefined,
  {
    initialValue: props.modelValue,
    validateOnValueUpdate: false,
  }
);
const target = ref(null);

const { x, y, isOutside } = useMouseInElement(target);
function update(value) {
  emit("update:modelValue", value);
}
function showInfoByKey(id) {
  let values = unref(props);
  if (modelValue.value === values.modelOriginal) {
    modelValue.value = values.modelHidden;
  } else {
    modelValue.value = values.modelOriginal;
  }
  // emit("toggleEye",id)
}
</script>

<template>
  <div
    class="vblg-input__container"
    :class="{ 'has-error': !!errorMessage || error, success: meta.valid && meta.dirty }"
    :style="{ 'max-width': maxWidth }"
  >
    <label :for="id">{{ label }}</label>
    <img
      v-if="tooltip"
      class="question_mark"
      src="@/assets/images/icons/question_mark.svg"
      alt="tooltip"
      :data-tooltip="tooltip"
      ref="target"
    />
    <img
      src="@/assets/images/icons/eye.svg"
      alt=""
      class="eye"
      v-if="eye"
      @click="showInfoByKey(id)"
    />

    <input
      :class="{ 'is-error': errorMessage || error }"
      :type="type"
      :value="modelValue"
      @input="update($event.target.value)"
      :placeholder="placeholder"
      :id="id"
      :name="id"
      :disabled="disabled"
      autocomplete="off"
      class="vblg-input"
    />
    <span class="error-message" v-if="errorMessage || error">{{
      error || errorMessage
    }}</span>
    <slot name="my-error-message"></slot>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/ui/input.scss";
.eye {
  display: block;
  position: absolute;
  top: calc(0% + 30px);
  left: calc(100% - 33px);
  cursor: pointer;
  width: 22px;
  height: 22px;
  z-index: 1;
}
</style>
