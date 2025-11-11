// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { createRequire } from "node:module";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const webpack = require('webpack');
const path = require('path');

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: [
    '../src/**/*.mdx',
    '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  features: {
    experimentalRSC: true,
  },
  docs: {},
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    // Use NormalModuleReplacementPlugin to replace API modules with mocks
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^@\/api\/episodes$/,
        path.resolve(__dirname, '../src/api/__mocks__/episodes.js')
      )
    );
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^@\/api\/patrons$/,
        path.resolve(__dirname, '../src/api/__mocks__/patrons.js')
      )
    );

    return config
  },
}
export default config
