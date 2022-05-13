<script setup lang="ts">
//vue
import { computed, markRaw, ref, watch } from "vue";
// schema & validation
import { useForm } from 'vee-validate';
import { schema, form, validationSchema } from "@/components/pages/Requisites/form";
import { SchemaForm, useSchemaForm, SchemaFormFactory } from "formvuelate";
import LookupPlugin from "@formvuelate/plugin-lookup";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";
// Components
import ChButton from "@/components/ui/button/button.vue";
markRaw(ChButton);



watch(
  () => form.value.actualAddress,
  (nV) => {
    console.log(nV, "nVVVVVVV");
  },
  {
    deep: true,
  }
);

//schema validation
const SchemaFormWithPlugins = SchemaFormFactory([LookupPlugin({}), VeeValidatePlugin()]);
let isLoadingBtn = ref(false);
useSchemaForm(form);
</script>
<template>
  <div class="profile_form_container">
    <div class="profile_form_wrapper">
      <SchemaFormWithPlugins :schema="schema" :validation-schema="validationSchema" ref="form1" @submit="onSubmit">
        <template #afterForm="{ validation }">
          <ChButton
            :loading="isLoadingBtn"
            :disabled="!validation.meta.valid"
            maxWidth="228px"
            style="margin-right: 0"
            >Сохранить изменения</ChButton
          >
        </template>
      </SchemaFormWithPlugins>
    </div>
  </div>
</template>

<style lang="scss">
.schema-row {
  display: flex;
}
.action {
  display: flex;
  white-space: break-spaces;
  * {
    font-weight: 600 !important;
  }
  em {
    border-bottom: 1px solid var(--vblg-c-primary);
  }
}
.drop-area {
  display: flex;
  flex-direction: column-reverse;
  color: var(--vblg-c-primary);
  width: 100%;
  margin: 0 auto;
  padding: 50px;
  background: #ffffff55;
  transition: 0.2s ease;
  min-height: 76px;
  padding: 22px 78px;
  max-width: 420px;
  border: 2px solid #b0ceec;
  border-radius: 10px;
  &[data-active="true"] {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background: #ffffffcc;
  }
}
label {
  font-size: 36px;
  cursor: pointer;
  display: block;
  span {
    display: block;
  }
  input[type="file"]:not(:focus-visible) {
    // Visually Hidden Styles taken from Bootstrap 5
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }
  input[type="file"] {
    &::file-selector-button,
    &::-webkit-file-upload-button {
      display: none;
    }
  }
}
.image-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  padding: 0;
}
.upload-button {
  display: block;
  appearance: none;
  border: 0;
  border-radius: 50px;
  padding: 0.75rem 3rem;
  margin: 1rem auto;
  font-size: 1.25rem;
  font-weight: bold;
  background: #369;
  color: #fff;
  text-transform: uppercase;
}
button {
  cursor: pointer;
}
</style>
