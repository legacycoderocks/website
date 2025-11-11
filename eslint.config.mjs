import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'node_modules/**',
      'storybook-static/**',
      '.storybook/public/**',
    ],
  },
  ...compat.config({
    extends: ['next/core-web-vitals', 'plugin:storybook/recommended'],
  }),
];

export default eslintConfig;
