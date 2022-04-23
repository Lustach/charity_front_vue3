<template>
  <!-- <form> -->
  <SchemaFormWithPlugins
    :schema="schema"
    :validation-schema="validationSchema"
    @submit="onSubmit"
  >
    <template #afterForm="{ validation }">
      <ChButton @click="onSubmit" :disabled="!validation.meta.valid">fasd</ChButton>
    </template>
  </SchemaFormWithPlugins>
  <!-- <button type="submit">fasd</button> -->
  <!-- </form> -->
</template>

<script>
import * as yup from "yup";
import { SchemaForm, useSchemaForm, SchemaFormFactory } from "formvuelate";

import LookupPlugin from "@formvuelate/plugin-lookup";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";

import ChInput from "@/components/ui/input/input.vue";
import ChButton from "@/components/ui/button/button.vue";
import { ref, markRaw, computed } from "vue";

markRaw(ChInput);

const SchemaFormWithPlugins = SchemaFormFactory([
  LookupPlugin({
    mapComponents: {
      string: "ChInput",
      array: "ChInput",
    },
  }),
  VeeValidatePlugin(),
]);

export default {
  components: { SchemaForm, ChButton, ChInput, SchemaFormWithPlugins },
  setup() {
    function onSubmit() {
      console.log(form.value);
      form.value.type = "B";
      delete validationSchema.value.fields.emailOrPhone;
    }

    const form = ref({
      type: "A",
      password: "",
      code_2fa: "",
    });

    useSchemaForm(form);
    const schema = ref({
      emailOrPhone: {
        component: ChInput,
        type: "email",
        placeholder: "E-mail или телефон",
        label: "E-mail или телефон",
        id: "emailOrPhone",
        error: "",
        condition: (model) => model.type === "A",
      },
      password: {
        component: ChInput,
        type: "password",
        placeholder: "Введите пароль",
        label: "Пароль",
        id: "password",
        error: "",
        condition: (model) => model.type === "B",
      },
      code_2fa: {
        component: ChInput,
        type: "text",
        placeholder: "Код",
        label: "Код",
        id: "code_2fa",
        error: "",
        condition(model) {
          return model.type === "B";
        },
      },
    });
    const validationSchema = computed(() => {
      if (form.value.type === "A") {
        return yup.object().shape({
          emailOrPhone: yup
            .string()
            .required("Заполните поле")
            .test("test-name", "Неверный e-mail или телефон", function (value) {
              if (value === "") {
                return false;
              } else {
                if (
                  value &&
                  (new RegExp(/\S+@\S+\.+(com|ru|org|net|info|io)$/).test(value) ||
                    new RegExp(/^\+7[0-9]{10}$/).test(value))
                ) {
                  return true;
                } else {
                  return false;
                }
              }
            }),
        });
      } else if (form.value.type === "B") {
        return yup.object().shape({
          password: yup.string().min(8).required(),
          code_2fa: yup.string().min(6).max(6).required(),
        });
      }
    });
    // const formData = ref({});
    // useSchemaForm(formData);

    return {
      schema,
      onSubmit,
      validationSchema,
    };
  },
};
</script>
