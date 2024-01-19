/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended"
  ],
  "env": {
    "vue/setup-compiler-macros": true,
    jest: true
  },
  "overrides": [
    {
      "files": [
        "cypress/integration/**.spec.{js,ts,jsx,tsx}",
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
        "src/**/*.{j,t}s?(x)"
      ],
      "extends": [
        "plugin:cypress/recommended"
      ]
    }
  ],
  "rules": {
    "vue/multi-word-component-names": "off",
  }
}
