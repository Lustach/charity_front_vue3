<script lang="ts" setup>
import Multiselect from "vue-multiselect";
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
    type: Array,
    default: [],
  },
  options: {
    type: Array,
    default: [],
  },
  multiselectLabel: {
    type: String,
  },
  trackBy: {
    type: String,
  },
  maxWidth:{
    type: String
  }
});

// const value = ref([]);
// let options = [
//   { name: "Vue.js", language: "JavaScript" },
//   { name: "Adonis", language: "JavaScript" },
//   { name: "Rails", language: "Ruby" },
//   { name: "Sinatra", language: "Ruby" },
//   { name: "Laravel", language: "PHP" },
//   { name: "Phoenix", language: "Elixir" },
// ];
const { value, handleChange, errorMessage, meta } = useField(props.name, undefined, {
  initialValue: props.value,
});

const onChange = (event) => {
  value.push(event.target.value);
  handleChange(value);
  emit("update:modelValue", value);
};
</script>
<template>
  <!-- <div style="display: inline-block; margin-left: 20px"> -->
  <div
    class="vblg-select__container"
    :class="{ 'has-error': !!errorMessage || error, success: meta.valid && meta.dirty }"
    :style="{ 'max-width': maxWidth }"
  >
    <label :for="id">{{ label }}</label>
    <Multiselect
      :searchable="true"
      :multiple="true"
      class="vblg-select"
      :id="id"
      v-model="value"
      @change="onChange"
      :options="options"
      :placeholder="placeholder"
      searchable
      :limit="4"
      :limitText="(count) => `+ ещё ${count}`"
      :label="multiselectLabel"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      :track-by="trackBy"
    />
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss">
@import "@/assets/scss/ui/text-field";
.vblg-select {
  &__container {
    label {
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      color: var(--vblg-c-primary);
      width: 100%;
    }
    // @extend .text-field;
  }
}
.vblg-select {
  border-radius: 25px !important;
  min-height: 38px !important;

  &__tags {
    transition: all 0.15s ease-in 0.05s;
    background-color: red;
  }

  &__content-wrapper {
    transition: all 0.15s ease-in 0.05s;
    //animation: test .3s;
  }

  &--active {
    & .multiselect__tags {
      border-radius: 18px 18px 0 0 !important;
    }
  }

  span {
    font-family: Montserrat, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
  }

  & .multiselect {
    &__input {
      margin-bottom: 0;
      border-radius: 18px !important;
    }
    &__option {
      background-color: white;
      color: inherit;

      &--selected {
        background-color: #f2f7fd;
        color: inherit;

        &:hover {
          background-color: #cae2ff !important;
        }
      }

      &--highlight {
        &:hover {
          background-color: #cae2ff !important;
        }
      }
      &:after {
        display: none !important;
      }
    }

    &--active {
      border-radius: 25px 25px 0 0 !important;
    }

    &__select {
      display: none !important;
      &::before {
        border-width: 5px 7px 0 !important;
        top: 24% !important;
      }
    }

    &__tags {
      min-height: 38px !important;
      background: #ffffff;
      border: 2px solid #b0ceec;
      box-sizing: border-box;
      border-radius: 25px;
      display: flex;
      align-items: center;
      padding: 0 3px;
      &:focus:not(.is-error) {
        border-color: #409eff;
        box-shadow: 1px 1px 10px -4px rgba(64, 158, 255, 0.5);
      }

      &:hover {
        border-color: var(--vblg-c-primary) !important;
        cursor: pointer;
      }

      &::placeholder {
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        width: 230px;
        height: 70px;
        color: #b0ceec;
        position: absolute;
        top: 10px;
        left: 18px;
      }
    }

    &__content {
      color: #0f75bd;

      &-wrapper {
        margin-top: -3px !important;
        border-radius: 0 0 25px 25px;
        border: 2px solid #b0ceec;
        border-top: none;
        max-height: fit-content !important;
        max-height: 300px !important;
        border-top: 2px solid #b0ceec;

        &:hover {
          border-color: var(--vblg-c-primary) !important;
          cursor: pointer;
          border-top: 2px solid var(--vblg-c-primary);
        }
        &::-webkit-scrollbar {
          width: 5px;
        }

        &::-webkit-scrollbar-track {
          border-radius: 5px;
          // margin-top: 25px !important;
          margin-bottom: 15px !important;
        }

        &::-webkit-scrollbar-thumb {
          scroll-padding: 1px;
          background-clip: padding-box;
          border-radius: 5px;
          background-color: #0f75bd;
        }
        //overflow-y: auto !important;
      }

      li {
        span {
          padding-left: 15px;
        }
      }
    }

    &__tags-wrap {
      display: flex;
    }
    &__strong {
      width: 100%;
      font-size: 14px;
    }
    &__tag {
      padding: 7px !important;
      //min-width: 121px !important;
      height: 28px !important;
      background: #b0ceec !important;
      border-radius: 25px !important;
      color: white !important;
      border: none !important;
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      margin: 3px 3px 3px 0 !important;
      &-icon {
        display: none !important;
      }
    }
  }

  input {
    border: none !important;
  }
}
</style>
