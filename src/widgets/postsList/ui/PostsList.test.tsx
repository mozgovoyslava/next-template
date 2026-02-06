import { screen } from '@testing-library/react';
import type { Post } from '@/entities/post';
import { useGetPostsQuery } from '@/entities/post';
import { renderWithProviders } from '@/shared/lib/tests';
import { PostsList } from './PostsList';

jest.mock('@/entities/post', () => {
    const actual = jest.requireActual('@/entities/post');

    return {
        __esModule: true,
        ...actual,
        useGetPostsQuery: jest.fn(),
    };
});

const mockUseGetPostsQuery = useGetPostsQuery as jest.Mock;

beforeAll(() => {
    class IntersectionObserverMock {
        observe() {}
        disconnect() {}
        unobserve() {}
        takeRecords() {
            return [];
        }
    }

    Object.defineProperty(global, 'IntersectionObserver', {
        writable: true,
        value: IntersectionObserverMock,
    });
});

describe('PostsList', () => {
    beforeEach(() => {
        mockUseGetPostsQuery.mockReset();
    });

    it('renders posts with links', () => {
        const posts: Post[] = [
            { userId: 1, id: 1, title: 'post title', body: 'post body' },
            { userId: 2, id: 2, title: 'second post', body: 'second body' },
        ];

        mockUseGetPostsQuery.mockReturnValue({
            data: posts,
            isLoading: false,
            isFetching: false,
            isError: false,
        });

        renderWithProviders(<PostsList />);

        expect(screen.getByText(posts[0].title)).toBeInTheDocument();
        expect(screen.getByText(posts[1].title)).toBeInTheDocument();

        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', '/posts/1');
        expect(links[1]).toHaveAttribute('href', '/posts/2');
    });

    it('shows loading state', () => {
        mockUseGetPostsQuery.mockReturnValue({
            data: undefined,
            isLoading: true,
            isFetching: true,
            isError: false,
        });

        renderWithProviders(<PostsList />);

        expect(screen.getByText('Loading posts...')).toBeInTheDocument();
    });
});
