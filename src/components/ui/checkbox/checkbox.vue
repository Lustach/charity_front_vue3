<template>
  <div class="checkbox coloured">
    <label>
      <input
        class="vblg-checkbox"
        type="checkbox"
        :name="name"
        :value="value"
        @change="handleChange(value)"
      />
      <span class="checkbox-material"><span class="check"></span></span>
      <slot class="vblg-checkbox-text" name="text"></slot>
    </label>
    <span class="error-message" v-if="errorMessage">{{ errorMessage }}</span>
    <slot name="my-error-message"></slot>
  </div>
</template>

<script>
import { toRefs } from "vue";
import { useField } from "vee-validate";

export default {
  props: {
    modelValue: {
      type: null,
    },
    name: String,
    value: {
      type: Boolean,
    },
  },
  setup(props) {
    // we are using toRefs to create reactive references to `name` and `value` props
    // this is important because vee-validte needs to know if any of these props change
    // https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
    let { name, value } = toRefs(props);
    let { meta, checked, handleChange, errorMessage } = useField(name, undefined, {
      type: "checkbox",
      checkedValue: value,
    });

    return {
      checked,
      handleChange,
      errorMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
button {
  background: none;
  border: none;
  font-size: 22px;
}
</style>
