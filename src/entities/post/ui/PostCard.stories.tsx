import type { Meta, StoryObj } from '@storybook/react';
import { PostCard } from './PostCard';

const meta = {
    title: 'entities/PostCard',
    component: PostCard,
    tags: ['autodocs'],
    args: {
        post: {
            userId: 1,
            id: 1,
            title: 'Post title',
            body: 'Post body preview text.',
        },
    },
} satisfies Meta<typeof PostCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
