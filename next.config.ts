//TODO: decomposite build cfg

import type { NextConfig } from 'next';
import { SRC_DIR } from './config/shared/paths';

type AppMode = 'dev' | 'prod' | 'test';

const APP_MODE = (process.env.APP_MODE ?? 'dev') as AppMode;

const isProd = APP_MODE === 'prod';
// const isDev = APP_MODE === 'dev';

const nextConfig: NextConfig = {
    reactCompiler: true,

    compiler: {
        reactRemoveProperties: isProd ? { properties: ['^data-testid$'] } : false,
    },

    sassOptions: {
        loadPaths: [SRC_DIR],
    },

    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.ts',
            },
        },
    },
};

export default nextConfig;
