import type { Meta, StoryObj } from '@storybook/react';
import { withStore } from '@/shared/lib/storybook';
import { PostsList } from './PostsList';

const meta = {
    title: 'widgets/PostsList',
    component: PostsList,
    decorators: [withStore()],
    tags: ['autodocs'],
} satisfies Meta<typeof PostsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
