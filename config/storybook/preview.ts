import type { Preview } from '@storybook/nextjs-vite';

import '@/shared/styles/globals/globals.scss';
import { htmlFontVariablesClassName } from '@/shared/styles/fonts.ts';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: 'todo',
        },
    },
    decorators: [
        (Story) => {
            if (typeof document !== 'undefined') {
                document.documentElement.classList.add(...htmlFontVariablesClassName.split(' ').filter(Boolean));
            }
            return Story();
        },
    ],
};

export default preview;
