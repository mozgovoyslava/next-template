import type { StorybookConfig } from '@storybook/nextjs-vite';
import { PUBLIC_DIR, SRC_DIR } from '../shared/paths.ts';

const config: StorybookConfig = {
    // Paths are relative to config/storybook.
    stories: ['../../src/**/*.mdx', '../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

    addons: ['@chromatic-com/storybook', '@storybook/addon-a11y', '@storybook/addon-docs'],

    framework: {
        name: '@storybook/nextjs-vite',
        options: {},
    },

    staticDirs: [PUBLIC_DIR],

    async viteFinal(viteConfig) {
        // alias '@' -> <root>/src
        viteConfig.resolve = viteConfig.resolve ?? {};

        viteConfig.resolve.alias = {
            ...(viteConfig.resolve.alias ?? {}),
            '@': SRC_DIR,
        };

        // Sass loadPaths -> to support: @use 'shared/styles'
        viteConfig.css = viteConfig.css ?? {};
        viteConfig.css.preprocessorOptions = viteConfig.css.preprocessorOptions ?? {};
        viteConfig.css.preprocessorOptions.scss = viteConfig.css.preprocessorOptions.scss ?? {};

        const scss = viteConfig.css.preprocessorOptions.scss;
        scss.loadPaths = [...(scss.loadPaths ?? []), SRC_DIR];

        return viteConfig;
    },
};

export default config;
