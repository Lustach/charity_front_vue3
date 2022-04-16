<script setup lang="ts">
import { ref } from "vue";
import { useField } from "vee-validate";
import { Props } from "@/components/ui/input/interface.ts";
//* TODO: imported interfaces are not support official by Evan(nice joke) :) https://github.com/vuejs/vue-next/issues/4294
/* we need to use plugin https://github.com/wheatjs/vite-plugin-vue-type-imports
 */
// https://vee-validate.logaretm.com/v4/guide/composition-api/validation#handling-events

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  label: "Label",
  placeholder: "Placeholder",
});

const { value: modelValue, errorMessage, handleBlur, handleChange, meta } = useField(
  props.id,
  undefined,
  {
    initialValue: props.modelValue,
    validateOnValueUpdate: false,
  }
);
</script>

<template>
  <div
    class="vblg-input__container"
    :class="{ 'has-error': !!errorMessage, success: meta.valid && meta.dirty }"
  >
    <label :for="id">{{ label }}</label>
    <!-- (e: any)=>$emit('update:modelValue', e.target.value) -->
    <input
      :type="type"
      v-model.lazy="modelValue"
      @input="handleChange"
      @blur="handleBlur"
      :placeholder="placeholder"
      :id="id"
      :name="id"
      autocomplete="off"
      class="vblg-input"
      :class="{ 'is-error': errorMessage }"
    />
    <span class="error-message" v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/ui/input.scss";
</style>
