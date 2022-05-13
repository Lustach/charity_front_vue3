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

<script>
import { toRefs } from "vue";
import { useField } from "vee-validate";

export default {
  props: {
    modelValue: {
      type: Boolean,
    },
    name: String,
    value: {
      type: String,
    },
    slot: {
      type: String,
    },
  },
  setup(props, ctx) {
    // we are using toRefs to create reactive references to `name` and `value` props
    // this is important because vee-validte needs to know if any of these props change
    // https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
    let { name, value, modelValue } = toRefs(props);
    let { meta, checked, handleChange, errorMessage } = useField(name, undefined, {
      type: "checkbox",
      checkedValue: false,
      valueProp: modelValue,
      validateOnValueUpdate: false,
    });
    let onChange = (value) => {
      handleChange(value);
      ctx.emit("update:modelValue", value);
    };
    return {
      checked,
      handleChange,
      errorMessage,
      onChange,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/ui/checkbox.scss";
</style>
