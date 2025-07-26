import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js,
      prettier: prettierPlugin,
    },
    languageOptions: { globals: globals.browser },
    extends: [
      'js/recommended',
      ...tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
      prettierConfig,
    ],
    rules: {
      'react/react-in-jsx-scope': 'off',
      indent: ['error', 2, { SwitchCase: 1 }],
      semi: ['error', 'always'],
      'max-len': [
        'error',
        {
          code: 80,
          ignoreUrls: true,
          ignoreStrings: false,
          ignoreTemplateLiterals: false,
          ignoreRegExpLiterals: true,
        },
      ],
      'object-property-newline': [
        'error',
        { allowAllPropertiesOnSameLine: false },
      ],
      'function-paren-newline': ['error', 'multiline-arguments'],
      'array-element-newline': ['error', 'consistent'],
      'function-call-argument-newline': ['error', 'consistent'],
      'prettier/prettier': 'error',
    },
  },

  globalIgnores(['./docs', './public/sw*']),
]);
