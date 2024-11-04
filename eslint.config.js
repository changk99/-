import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintrcAutoImport from './.wxt/eslintrc-auto-import.json' assert { type: 'json' };
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

// console.log(tseslint.configs.recommended);
/** @type {import('eslint').Linter.Config[]} */
export default [
  // ignores 只有单独设置时,才会作用到所有的配置对象中
  // 全局的 ignores 可以匹配目录,非全局的 ignores 只能匹配文件名称。全局 ignores 的配置追加在 ["**/node_modules/", ".git/"] 后面
  // files 没有设置时,会匹配所有的其他配置对象匹配的文件
  // files 以 **/*.extension 的模式进行匹配,不会匹配 *, /*, /** 这些模式。!(*.*) 匹配没有扩展名称的文件
  {
    ignores: ['.output/', '.wxt/'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.webextensions,
        ...eslintrcAutoImport.globals,
        module: false,
      },
    },
  },
  {
    ...pluginJs.configs.recommended,
    ...eslintPluginPrettierRecommended,
    plugins: {
      ...eslintPluginPrettierRecommended.plugins,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
];
