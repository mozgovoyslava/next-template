import type { Meta, StoryObj } from '@storybook/react';
import { withStore } from '@/shared/lib/storybook';
import { CommentsList } from './CommentsList';

const meta = {
    title: 'widgets/CommentsList',
    component: CommentsList,
    decorators: [withStore()],
    tags: ['autodocs'],
    args: {
        postId: 1,
    },
} satisfies Meta<typeof CommentsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
