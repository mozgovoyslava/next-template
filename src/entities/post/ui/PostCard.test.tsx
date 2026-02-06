import { render, screen } from '@testing-library/react';
import type { Post } from '../model/types';
import { PostCard } from './PostCard';

const post: Post = {
    userId: 1,
    id: 1,
    title: 'post title',
    body: 'post body',
};

describe('PostCard', () => {
    it('renders post content', () => {
        render(<PostCard post={post} />);

        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.body)).toBeInTheDocument();
        expect(screen.getByText('Author: 1')).toBeInTheDocument();
    });
});
