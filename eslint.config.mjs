import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "no-console": "warn",
      "no-undef": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
    },
    languageOptions: {
      globals: {
        process: "readonly",
      },
    },
  },

  {
    ignores: [".node_modules/*"],
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
];
