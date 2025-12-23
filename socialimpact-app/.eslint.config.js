import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['node_modules/**', 'dist/**'] },  // Ignore common dirs
  {
    languageOptions: {
      globals: {
        ...globals.browser,  // For RN/Expo (window, etc.)
        ...globals.node,     // For Node (process, etc.)
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    files: ['**/*.{js,ts,tsx}'],
  },
  js.configs.recommended,  // Base JS rules
  ...tseslint.configs.recommended,  // TS rules
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',  // Use your TS config
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // Enforce best practices
      'semi': ['error', 'always'],
      'no-unused-vars': 'off',  // Handled by TS
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'react/react-in-jsx-scope': 'off',  // RN auto-imports
      '@typescript-eslint/no-explicit-any': 'warn',  // Softer on 'any'
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',  // Hooks compliance
      'react-hooks/exhaustive-deps': 'warn',
    },
  }
);