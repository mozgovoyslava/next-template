import nextJest from 'next/jest';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/config/jest/jest.setup.ts'],
};

const getJestConfig = async () => {
    const nextConfig = await createJestConfig(customJestConfig)();

    return {
        rootDir: '../../',
        ...nextConfig,
        moduleNameMapper: {
            '^.+\\.svg$': '<rootDir>/config/jest/jestSvgMock.tsx',
            ...(nextConfig.moduleNameMapper ?? {}),
            '^@/(.*)$': '<rootDir>/src/$1',
        },
    };
};

export default getJestConfig;
