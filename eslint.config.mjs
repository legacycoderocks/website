import nextConfig from 'eslint-config-next/core-web-vitals';
import storybookPlugin from 'eslint-plugin-storybook';

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
  ...nextConfig,
  ...storybookPlugin.configs['flat/recommended'],
];

export default eslintConfig;
