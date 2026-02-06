import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/shared/lib/store';
import { UsersList } from './UsersList';

const meta = {
    title: 'widgets/UsersList',
    component: UsersList,
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
} satisfies Meta<typeof UsersList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
