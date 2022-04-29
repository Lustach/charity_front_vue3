<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import { Props } from "@/components/ui/input/interface.ts";
import useInputHandlers from "@/components/compositions/useInputHandlers.ts";
let inputHandlers = useInputHandlers;
// console.log(inputHandlers);

const emit = defineEmits(["update:modelValue"]);
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
function update(value) {
  emit("update:modelValue", value);
}
</script>

<template>
  <div
    class="vblg-input__container"
    :class="{ 'has-error': !!errorMessage || error, success: meta.valid && meta.dirty }"
    :style="{ 'max-width': maxWidth }"
  >
    <label :for="id">{{ label }}</label>
    <input
      :class="{ 'is-error': errorMessage || error }"
      :type="type"
      :value="modelValue"
      @input="update($event.target.value)"
      :placeholder="placeholder"
      :id="id"
      :name="id"
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
</style>
