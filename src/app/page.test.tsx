import { screen } from '@testing-library/react';
import HomePage from './page';
import { renderWithProviders } from '@/shared/lib/tests';

jest.mock('@/entities/user', () => {
    const actual = jest.requireActual('@/entities/user');

    return {
        __esModule: true,
        ...actual,
        useGetUsersQuery: () => ({
            data: [],
            isLoading: false,
            isError: false,
        }),
    };
});

describe('Page', () => {
    it('renders a heading', () => {
        renderWithProviders(<HomePage />);
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
});
