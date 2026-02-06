import type { Meta, StoryObj } from '@storybook/react';
import { CommentCard } from './CommentCard';

const meta = {
    title: 'entities/CommentCard',
    component: CommentCard,
    tags: ['autodocs'],
    args: {
        comment: {
            postId: 1,
            id: 1,
            name: 'Comment title',
            email: 'test@example.com',
            body: 'Comment body text.',
        },
    },
} satisfies Meta<typeof CommentCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
