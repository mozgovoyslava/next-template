'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { PostCard, useGetPostsQuery } from '@/entities/post';
import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import css from './PostsList.module.scss';

const PAGE_SIZE = 10;

export const PostsList = () => {
    const [page, setPage] = useState(1);

    const { data, isLoading, isFetching, isError } = useGetPostsQuery({
        page,
        limit: PAGE_SIZE,
    });

    const posts = data ?? [];
    const hasMore = posts.length >= page * PAGE_SIZE;

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
        <section className={css.root} aria-label="Posts">
            <h2 className={css.title}>Posts</h2>

            {posts.length === 0 && isLoading ? <div className={css.state}>Loading posts...</div> : null}

            {isError ? <div className={css.state}>Failed to load posts.</div> : null}

            <div className={css.list}>
                {posts.map((post) => (
                    <Link key={post.id} className={css.link} href={`/posts/${post.id}`}>
                        <PostCard post={post} />
                    </Link>
                ))}
            </div>

            {isFetching && posts.length > 0 ? <div className={css.state}>Loading more...</div> : null}

            {hasMore ? (
                <div className={css.sentinel} ref={sentinelRef} />
            ) : (
                <div className={css.state}>No more posts.</div>
            )}
        </section>
    );
};
