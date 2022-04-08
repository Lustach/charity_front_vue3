require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,

    extends: [
        "plugin:vue/vue3-essential",
        "plugin:prettier/recommended",
        "@vue/eslint-config-typescript/recommended",
    ],

    env: {
        "vue/setup-compiler-macros": true,
        node: true,
        browser: true,
        commonJs: true,
    },

    overrides: [{
        files: ["cypress/integration/**.spec.{js,ts,jsx,tsx}"],
        extends: ["plugin:cypress/recommended"],
    },],

    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 8,
    },

    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        // "no-console": [2, {allow: ["warn", "error", "table",],},],
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        semi: [1, "always"],
        "comma-dangle": [
            1,
            {
                arrays: "always",
                objects: "always",
            },
        ],
        "no-unused-vars": "off",
        quotes: [1, "single", "avoid-escape"],
        "quote-props": [1, "consistent-as-needed"],
        "comma-spacing:": [1, { before: "false", after: "false" }]
        // 'vue/no-unused-properties': ['error', {
        //     groups: ['methods',],
        //     deepData: false,
        //     ignorePublicMembers: false,
        // },],
    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)",
            ],
            env: {
                jest: true,
            },
        },
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)",
            ],
            env: {
                jest: true,
            },
        },
    ],
};