import type { Meta, StoryObj } from '@storybook/react';
import { withStore } from '@/shared/lib/storybook';
import { Counter } from './Counter';

const meta = {
    title: 'features/Counter',
    component: Counter,
    decorators: [withStore({ counter: { value: 5 } })],
    tags: ['autodocs'],
} satisfies Meta<typeof Counter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
