<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import type { Props } from "@/components/ui/textarea/interface";
import { fieldHandlerMaxLength } from "@/components/compositions/useInputHandlers";
import { fixCrlf, handleInputChange } from "@/components/compositions/useInputHandlers";
const emit = defineEmits(["update:modelValue"]);
//* TODO: imported interfaces are not support official by Evan(nice joke) :) https://github.com/vuejs/vue-next/issues/4294
/* we need to use plugin https://github.com/wheatjs/vite-plugin-vue-type-imports
 */
// https://vee-validate.logaretm.com/v4/guide/composition-api/validation#handling-events

//data
const props = withDefaults(defineProps<Props>(), {
  type: "text",
  maxLength: 150,
});
let { value: modelValue, errorMessage, meta } = useField(props.id, undefined, {
  initialValue: props.modelValue,
  validateOnValueUpdate: false,
});
let field = ref<HTMLInputElement | null>(null);
//methods
function update(value: string) {
  if (props.maxLength) {
    let fixedValue = fixCrlf(value);
    let handledValue = fieldHandlerMaxLength({
      value: fixedValue,
      maxLength: props.maxLength,
    });
    if (field.value) {
      field.value.value = handledValue;
      return emit("update:modelValue", field.value.value);
    }
  }
  let fixedValue = fixCrlf(value);
  emit("update:modelValue", fixedValue);
}
</script>

<template>
  <div
    class="vblg-textarea__container"
    :class="{ 'has-error': !!errorMessage, success: meta.valid && meta.dirty }"
  >
    <label :for="id">{{ label }} </label>
    <textarea
      ref="field"
      :class="[
        errorMessage ? 'is-error' : '',
        fullSize ? 'vblg-textarea-full' : 'vblg-textarea-short',
      ]"
      :type="type"
      :value="modelValue"
      @input="update(handleInputChange($event))"
      :placeholder="placeholder"
      :id="id"
      :name="id"
      autocomplete="off"
      class="vblg-textarea"
    />
    <span class="vblg-textarea-count">{{ modelValue?.length || 0 }}/{{ maxLength }}</span>
    <span class="error-message" v-if="errorMessage">{{ errorMessage }}</span>
    <slot name="my-error-message"></slot>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/ui/textarea.scss";
.vblg-textarea__container {
  max-width: 100%;
}
</style>
