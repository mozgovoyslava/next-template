import type { Meta, StoryObj } from '@storybook/react';
import { withStore } from '@/shared/lib/storybook';
import { PostDetails } from './PostDetails';

const meta = {
    title: 'widgets/PostDetails',
    component: PostDetails,
    decorators: [withStore()],
    tags: ['autodocs'],
    args: {
        postId: 1,
    },
} satisfies Meta<typeof PostDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
