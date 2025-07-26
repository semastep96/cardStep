import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import {defineConfig, globalIgnores} from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";


export default defineConfig([
  {files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], plugins: {js}, extends: ["js/recommended"]},
  {files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], languageOptions: {globals: globals.browser}},
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      indent: ["error", 2, {SwitchCase: 1}],
      semi: ["error", "always"]
    },
  },
  globalIgnores(["./docs", "./public/sw*"])
]);
