import { render, screen } from '@testing-library/react';
import type { Comment } from '../model/types';
import { CommentCard } from './CommentCard';

const comment: Comment = {
    postId: 1,
    id: 1,
    name: 'Comment title',
    email: 'test@example.com',
    body: 'Comment body',
};

describe('CommentCard', () => {
    it('renders comment content', () => {
        render(<CommentCard comment={comment} />);

        expect(screen.getByText(comment.name)).toBeInTheDocument();
        expect(screen.getByText(comment.email)).toBeInTheDocument();
        expect(screen.getByText(comment.body)).toBeInTheDocument();
    });
});
