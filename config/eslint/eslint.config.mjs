import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import importPlugin from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';

const layerBoundaries = {
    'import/no-restricted-paths': [
        'error',
        {
            basePath: process.cwd(),
            zones: [
                // shared (lowest) must not import from upper layers
                { target: 'src/shared', from: 'src/entities', message: 'Shared must not import from entities.' },
                { target: 'src/shared', from: 'src/features', message: 'Shared must not import from features.' },
                { target: 'src/shared', from: 'src/widgets', message: 'Shared must not import from widgets.' },
                { target: 'src/shared', from: 'src/app', message: 'Shared must not import from app.' },

                // entities must not import from upper layers
                { target: 'src/entities', from: 'src/features', message: 'Entities must not import from features.' },
                { target: 'src/entities', from: 'src/widgets', message: 'Entities must not import from widgets.' },
                { target: 'src/entities', from: 'src/app', message: 'Entities must not import from app.' },

                // features must not import from upper layers
                { target: 'src/features', from: 'src/widgets', message: 'Features must not import from widgets.' },
                { target: 'src/features', from: 'src/app', message: 'Features must not import from app.' },

                // widgets must not import from app
                { target: 'src/widgets', from: 'src/app', message: 'Widgets must not import from app.' },
            ],
        },
    ],
};

export default defineConfig([
    // --- ignores (single source of truth) ---
    globalIgnores(['.next/**', 'out/**', 'build/**', 'coverage/**', 'node_modules/**', 'next-env.d.ts']),

    // --- Next recommended ---
    ...nextVitals,
    ...nextTs,

    // --- Layer boundaries (FSD-style) ---
    {
        plugins: {
            import: importPlugin,
        },
        rules: {
            ...layerBoundaries,
        },
    },

    // --- Jest + Testing Library rules for tests only ---
    {
        files: ['**/*.{test,spec}.{js,jsx,ts,tsx}', '**/__tests__/**/*.{js,jsx,ts,tsx}'],
        plugins: {
            jest,
            'testing-library': testingLibrary,
            'jest-dom': jestDom,
        },
        languageOptions: {
            globals: {
                ...jest.environments.globals.globals, // describe/it/expect/jest
            },
        },
        rules: {
            // Jest
            'jest/no-disabled-tests': 'warn',
            'jest/no-focused-tests': 'error',
            'jest/no-identical-title': 'error',
            'jest/valid-expect': 'error',

            // Testing Library
            'testing-library/no-node-access': 'error',
            'testing-library/no-container': 'error',
            'testing-library/no-debugging-utils': 'warn',

            // jest-dom
            'jest-dom/prefer-checked': 'warn',
            'jest-dom/prefer-enabled-disabled': 'warn',
            'jest-dom/prefer-required': 'warn',
            'jest-dom/prefer-to-have-attribute': 'warn',
        },
    },

    // --- Optional: scripts/configs (Node env) ---
    {
        files: ['**/*.config.{js,cjs,mjs,ts}', 'config/**/*.{js,cjs,mjs,ts}'],
        plugins: {
            import: importPlugin,
        },
        rules: {
            // Often too noisy in config files.
            'import/no-anonymous-default-export': 'off',
        },
    },
]);
