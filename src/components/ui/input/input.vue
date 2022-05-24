<script setup lang="ts">
import { ref, unref } from "vue";
import { useField } from "vee-validate";
import type { Props } from "@/components/ui/input/interface";
import { fieldHandlerMaxLength } from "@/components/compositions/useInputHandlers";
import { handleInputChange } from "@/components/compositions/useInputHandlers";

const emit = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  label: "",
  placeholder: "",
});

//data
let { value: modelValue, errorMessage, meta } = useField(props.id, undefined, {
  initialValue: props.modelValue,
  validateOnValueUpdate: false,
});
const target = ref(null);
let field = ref<HTMLInputElement | null>(null);
//methods

function update(value: string) {
  if (props.maxLength) {
    let handledValue = fieldHandlerMaxLength({ value, maxLength: props.maxLength });
    if (field.value) {
      field.value.value = handledValue;
      return emit("update:modelValue", field.value.value);
    }
  }
  if (field.value) emit("update:modelValue", field.value.value);
}
function showInfoByKey() {
  let values = unref(props);
  if (modelValue.value === values.modelOriginal) {
    modelValue.value = values.modelHidden || "";
  } else {
    modelValue.value = values.modelOriginal || "";
  }
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
      @click="showInfoByKey()"
    />
    <div style="width: 100%">
      <input
        ref="field"
        :class="{ 'is-error': errorMessage || error }"
        :type="type"
        :value="modelValue"
        @input="update(handleInputChange($event))"
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
