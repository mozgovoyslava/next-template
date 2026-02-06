import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/shared/lib/store';
import { PostDetails } from './PostDetails';

const meta = {
    title: 'widgets/PostDetails',
    component: PostDetails,
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
} satisfies Meta<typeof PostDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
