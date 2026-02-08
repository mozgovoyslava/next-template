import type { Meta, StoryObj } from '@storybook/react';
import { withStore } from '@/shared/lib/storybook';
import { UsersList } from './UsersList';

const meta = {
    title: 'widgets/UsersList',
    component: UsersList,
    decorators: [withStore()],
    tags: ['autodocs'],
} satisfies Meta<typeof UsersList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
