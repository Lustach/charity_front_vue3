<script setup lang="ts">
import { ref, toRef } from "vue";
import { useField } from "vee-validate";
import { Props } from "@/components/ui/checkbox/interface.ts";

const props = withDefaults(defineProps<Props>(), {
  label: "label",
});
const { checked, handleChange } = useField(props.name, props.rules, {
  // 👇 These are important
  type: "checkbox",
  checkedValue: props.modelValue,
});
handleChange(props.value);
</script>
<template>
  <el-checkbox
    class="vblg-checkbox"
    :name="props.name"
    :label="props.name"
    @click="handleChange(props.modelValue)"
    v-model:modelValue="modelValue"
  >
    <slot></slot>
  </el-checkbox>
</template>
<style scoped lang="scss">
@import "@/assets/scss/ui/checkbox.scss";
</style>
