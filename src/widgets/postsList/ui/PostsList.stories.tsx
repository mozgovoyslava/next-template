import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/shared/lib/store';
import { PostsList } from './PostsList';

const meta = {
    title: 'widgets/PostsList',
    component: PostsList,
    decorators: [
        (Story) => {
            const store = makeStore();
            return (
                <Provider store={store}>
                    <Story />
                </Provider>
            );
        },
    ],
    tags: ['autodocs'],
} satisfies Meta<typeof PostsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
