/**
 * THIS FILE WAS AUTO-GENERATED.
 * PLEASE DO NOT EDIT IT MANUALLY.
 * ===============================
 * IF YOU'RE COPYING THIS INTO AN ESLINT CONFIG, REMOVE THIS COMMENT BLOCK.
 */

import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import tseslintConfigs from 'typescript-eslint';
import { configs, plugins, rules } from 'eslint-config-airbnb-extended';
import { rules as prettierConfigRules } from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const gitignorePath = path.resolve('.', '.gitignore');

// ดึง Parser ออกมาสำหรับการตั้งค่า TypeScript/React ใช้การเข้าถึงแบบยืดหยุ่นเพื่อหา parser
const parser = tseslintConfigs.parser || tseslintConfigs.default?.parser;

if (!parser) {
  // หากยังหา parser ไม่เจอ จะแสดง error ใน console แทนที่จะเป็น runtime error
  console.error(
    "Critical Error: '@typescript-eslint/parser' could not be loaded via 'typescript-eslint'."
  );
}

const jsConfig = [
  // ESLint Recommended Rules
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  // Stylistic Plugin
  plugins.stylistic,
  // Import X Plugin
  plugins.importX,
  // Airbnb Base Recommended Config
  ...configs.base.recommended,
];

const reactConfig = [
  // React Plugin
  plugins.react,
  // React Hooks Plugin
  plugins.reactHooks,
  // React JSX A11y Plugin
  plugins.reactA11y,
  // Airbnb React Recommended Config
  ...configs.react.recommended,
];

const typescriptConfig = [
  // TypeScript ESLint Plugin
  plugins.typescriptEslint,
  // Airbnb Base TypeScript Config
  ...configs.base.typescript,
  // Strict TypeScript Config
  rules.typescript.typescriptEslintStrict,
  // Airbnb React TypeScript Config
  ...configs.react.typescript,
];

const prettierConfig = [
  // Prettier Plugin
  {
    name: 'prettier/plugin/config',
    plugins: {
      prettier: prettierPlugin,
    },
  },
  // Prettier Config
  {
    name: 'prettier/config',
    rules: {
      ...prettierConfigRules,
      'prettier/prettier': 'error',
    },
  },
];

export default [
  // Ignore .gitignore files/folder in eslint
  includeIgnoreFile(gitignorePath),
  // Javascript Config
  ...jsConfig,
  // React Config
  ...reactConfig,
  // TypeScript Config
  ...typescriptConfig,
  // Prettier Config
  ...prettierConfig,
  {
    ignores: [
      '*/dist',
      '*/node_modules',
      '**/*.config.mjs',
      '**/*.config.js',
      '**/*.config.ts',
    ],
  },
  {
    languageOptions: {
      parser,
      parserOptions: {
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }], // ให้ <>{code}</> ได้
      '@typescript-eslint/explicit-module-boundary-types': 'off', // ปิดกฎที่บังคับระบุ Return Type
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'object-curly-newline': 'off', // กัน conflict กับ Prettier
      'no-restricted-exports': 'off', // ต้องการ export ด้วยชื่อใดก็ได้
      'no-plusplus': 'off',
      'no-nested-ternary': 'off',
      // -----> บังคับให้ใช้ Path Import สำหรับ MUI [นำออกได้ถ้าไม่ต้องการลดขนาด bundle]
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@mui/icons-material',
              message:
                'Please import icons directly from their path, e.g. import Icon from "@mui/icons-material/Icon";',
            },
            {
              name: '@mui/material',
              message:
                'Please import components directly from their path, e.g. import Button from "@mui/material/Button";',
            },
            {
              name: '@mui/lab',
              message:
                'Please import components directly from their path, e.g. import Timeline from "@mui/lab/Timeline";',
            },
          ],
        },
      ],
    },
  },
];
