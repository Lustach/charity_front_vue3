<template>
  <div class="checkbox coloured">
    <label>
      <input
        class="vblg-checkbox"
        type="checkbox"
        :name="name"
        :value="value"
        v-model="modelValue"
        @change="onChange(modelValue)"
      />
      <span class="checkbox-material"><span class="check"></span></span>
      <slot class="vblg-checkbox-text" name="text"></slot>
      <div class="vblg-checkbox-text" v-html="slot"></div>
      <!-- </slot> -->
    </label>
    <span class="error-message" v-if="errorMessage">{{ errorMessage }}</span>
    <slot name="my-error-message" v-html="slot"></slot>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import type { Props } from "@/components/ui/checkbox/interface";

const emit = defineEmits(["update:modelValue"]);

// eslint-disable-next-line vue/no-setup-props-destructure
let { name, value, modelValue } = defineProps<Props>();
let { meta, checked, handleChange, errorMessage } = useField(name, undefined, {
  type: "checkbox",
  checkedValue: false,
  valueProp: modelValue,
  validateOnValueUpdate: false,
});
let onChange = (value: boolean) => {
  handleChange(value);
  emit("update:modelValue", value);
};
</script>

<style lang="scss">
@import "@/assets/scss/ui/checkbox.scss";
</style>
