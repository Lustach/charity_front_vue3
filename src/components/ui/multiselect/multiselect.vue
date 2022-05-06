<script lang="ts" setup>
import { ref } from "vue";
const initials = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
import { useField } from "vee-validate";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Elija...",
  },
  items: {
    type: Array,
    default: [],
  },
  value: {
    type: String,
    default: "",
  },
});

// const value = ref([]);
const value2 = ref([]);
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}));
const { value, handleChange, errorMessage } = useField(
  props.name,
  undefined,
  {
    initialValue: props.value,
  }
);

const onChange = (event) => {
  const value = event.target.value;
  handleChange(value);
  emit("update:modelValue", value);
};
</script>
<template>
  <div style="display: inline-block; margin-left: 20px">
    <p style="margin: 10px">use collapse-tags-tooltip</p>
    <el-select-v2
      v-model="value"
      @change="onChange"
      :options="options"
      placeholder="Please select"
      style="width: 240px"
      multiple
      collapse-tags
      collapse-tags-tooltip
    />
  </div>
</template>
