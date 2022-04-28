<template>
  <form @submit.prevent="formSubmit">
    <SchemaFormWithPlugins
      :schema="schema"
      :debug="true"
      :validation-schema="validationSchema"
    />

    <ChButton>Submit</ChButton>
  </form>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import * as yup from "yup";
import ChInput from "@/components/ui/input/input.vue";
import ChButton from "@/components/ui/button/button.vue";
import LookupPlugin from "@formvuelate/plugin-lookup";
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";
import { SchemaForm, useSchemaForm, SchemaFormFactory } from "formvuelate";
const SchemaFormWithPlugins = SchemaFormFactory([VeeValidatePlugin()]);
// const factory = SchemaFormFactory([], { FormText });
const SCHEMA = [
  [
    {
      component: ChInput,
      type: "password",
      placeholder: "Введите пароль",
      label: "Пароль",
      id: "password",
      model: "password",
      maxWidth: "328px",
      error: "",
      // validations: (value) => value && value.length > 6,
    },
    {
      component: ChInput,
      type: "email",
      placeholder: "E-mail или телефон",
      label: "E-mail или телефон",
      id: "emailOrPhone",
      model: "emailOrPhone",
      error: "",
      maxWidth: "328px",
    },
  ],
];

console.log(SchemaForm, SchemaFormWithPlugins, SchemaFormFactory(), "schema_form");

export default {
  components: { ChButton, SchemaFormWithPlugins, SchemaForm },
  setup() {
    let form = ref({});
    useSchemaForm(form);

    // const schema = computed(() => {
    //   return SCHEMA;
    // });

    const schema = computed(() => [
      [
        {
          component: ChInput,
          type: "password",
          placeholder: "Введите пароль",
          label: "Пароль",
          id: "password",
          model: "password",
          maxWidth: "328px",
          error: "",
          // validations: (value) => value && value.length > 6,
        },
        {
          component: ChInput,
          type: "email",
          placeholder: "E-mail или телефон",
          label: "E-mail или телефон",
          id: "emailOrPhone",
          model: "emailOrPhone",
          error: "",
          maxWidth: "328px",
        },
      ],
    ]);

    let isShowCodeField = ref(false);
    const validationSchema = computed(() => {
      if (isShowCodeField.value === false) {
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
          password: yup.string().min(8).required("Обязательное поле"),
        });
      } else if (isShowCodeField.value === true) {
        return yup.object().shape({
          code_2fa: yup.string().min(6).max(6).required(),
        });
      }
      return undefined;
    });
    const formSubmit = () => {
      alert("Form submitted!");
    };

    return {
      form,
      schema,
      formSubmit,
      validationSchema,
    };
  },
};
</script>

<style lang="scss">
label {
  font-weight: bold;
  font-size: 0.9rem;
  display: block;
}

input {
  padding: 8px 10px;
  border-radius: 3px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  font-size: 1rem;
}

input[type="checkbox"] {
  width: auto;
}

select {
  min-width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px 10px;
  font-size: 1rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: white;
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 0px),
    calc(100% - 15px) calc(1em + 0px), calc(100% - 2.5em) 0.4em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
}

.schema-row {
  display: flex;
}
</style>
