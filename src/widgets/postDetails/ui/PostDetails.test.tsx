import { screen } from '@testing-library/react';
import type { Post } from '@/entities/post';
import { useGetPostByIdQuery } from '@/entities/post';
import { renderWithProviders } from '@/shared/lib/tests';
import { PostDetails } from './PostDetails';

jest.mock('@/entities/post', () => {
    const actual = jest.requireActual('@/entities/post');

    return {
        __esModule: true,
        ...actual,
        useGetPostByIdQuery: jest.fn(),
    };
});

const mockUseGetPostByIdQuery = useGetPostByIdQuery as jest.Mock;

describe('PostDetails', () => {
    beforeEach(() => {
        mockUseGetPostByIdQuery.mockReset();
    });

    it('renders post details', () => {
        const post: Post = {
            userId: 1,
            id: 1,
            title: 'post title',
            body: 'post body',
        };

        mockUseGetPostByIdQuery.mockReturnValue({
            data: post,
            isLoading: false,
            isError: false,
        });

        renderWithProviders(<PostDetails postId={1} />);

        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.body)).toBeInTheDocument();
    });

    it('shows error state', () => {
        mockUseGetPostByIdQuery.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
        });

        renderWithProviders(<PostDetails postId={1} />);

        expect(screen.getByText('Failed to load post.')).toBeInTheDocument();
    });
});
