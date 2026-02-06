import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/shared/lib/store';
import { Counter } from './Counter';

const meta = {
    title: 'features/Counter',
    component: Counter,
    decorators: [
        (Story) => {
            const store = makeStore({ counter: { value: 5 } });
            return (
                <Provider store={store}>
                    <Story />
                </Provider>
            );
        },
    ],
    tags: ['autodocs'],
} satisfies Meta<typeof Counter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
