import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/shared/lib/store';
import { CommentsList } from './CommentsList';

const meta = {
    title: 'widgets/CommentsList',
    component: CommentsList,
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
    args: {
        postId: 1,
    },
} satisfies Meta<typeof CommentsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
