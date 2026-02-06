'use client';

import { useCallback, useState } from 'react';
import { CommentCard, useGetCommentsByPostQuery } from '@/entities/comment';
import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import css from './CommentsList.module.scss';

const PAGE_SIZE = 10;

interface CommentsListProps {
    postId: number;
}

export const CommentsList = ({ postId }: CommentsListProps) => {
    const [page, setPage] = useState(1);

    const { data, isLoading, isFetching, isError } = useGetCommentsByPostQuery({
        postId,
        page,
        limit: PAGE_SIZE,
    });

    const comments = data ?? [];
    const hasMore = comments.length >= page * PAGE_SIZE;

    const handleLoadMore = useCallback(() => {
        if (isFetching || isLoading || !hasMore) {
            return;
        }

        setPage((prev) => prev + 1);
    }, [hasMore, isFetching, isLoading]);

    const sentinelRef = useInfiniteScroll({
        onLoadMore: handleLoadMore,
        isEnabled: hasMore,
    });

    return (
        <section className={css.root} aria-label="Comments">
            {comments.length === 0 && isLoading ? <div className={css.state}>Loading comments...</div> : null}

            {isError ? <div className={css.state}>Failed to load comments.</div> : null}

            <div className={css.list}>
                {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </div>

            {isFetching && comments.length > 0 ? <div className={css.state}>Loading more...</div> : null}

            {hasMore ? (
                <div className={css.sentinel} ref={sentinelRef} />
            ) : (
                <div className={css.state}>No more comments.</div>
            )}
        </section>
    );
};
