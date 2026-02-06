import type { Comment } from '../model/types';
import css from './CommentCard.module.scss';

interface CommentCardProps {
    comment: Comment;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
    return (
        <article className={css.root}>
            <div className={css.header}>
                <h3 className={css.name}>{comment.name}</h3>
                <span className={css.email}>{comment.email}</span>
            </div>
            <p className={css.body}>{comment.body}</p>
        </article>
    );
};
