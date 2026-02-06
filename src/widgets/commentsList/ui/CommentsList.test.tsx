import { screen } from '@testing-library/react';
import type { Comment } from '@/entities/comment';
import { useGetCommentsByPostQuery } from '@/entities/comment';
import { renderWithProviders } from '@/shared/lib/tests';
import { CommentsList } from './CommentsList';

jest.mock('@/entities/comment', () => {
    const actual = jest.requireActual('@/entities/comment');

    return {
        __esModule: true,
        ...actual,
        useGetCommentsByPostQuery: jest.fn(),
    };
});

const mockUseGetCommentsByPostQuery = useGetCommentsByPostQuery as jest.Mock;

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

describe('CommentsList', () => {
    beforeEach(() => {
        mockUseGetCommentsByPostQuery.mockReset();
    });

    it('renders comments', () => {
        const comments: Comment[] = [
            {
                postId: 1,
                id: 1,
                name: 'Comment title',
                email: 'test@example.com',
                body: 'Comment body',
            },
        ];

        mockUseGetCommentsByPostQuery.mockReturnValue({
            data: comments,
            isLoading: false,
            isFetching: false,
            isError: false,
        });

        renderWithProviders(<CommentsList postId={1} />);

        expect(screen.getByText(comments[0].name)).toBeInTheDocument();
        expect(screen.getByText(comments[0].email)).toBeInTheDocument();
        expect(screen.getByText(comments[0].body)).toBeInTheDocument();
    });

    it('shows loading state', () => {
        mockUseGetCommentsByPostQuery.mockReturnValue({
            data: undefined,
            isLoading: true,
            isFetching: true,
            isError: false,
        });

        renderWithProviders(<CommentsList postId={1} />);

        expect(screen.getByText('Loading comments...')).toBeInTheDocument();
    });
});
