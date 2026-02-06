'use client';

import { PostCard, useGetPostByIdQuery } from '@/entities/post';
import css from './PostDetails.module.scss';

interface PostDetailsProps {
    postId: number;
}

export const PostDetails = ({ postId }: PostDetailsProps) => {
    const { data, isLoading, isError } = useGetPostByIdQuery(postId);

    if (isLoading) {
        return <div className={css.state}>Loading post...</div>;
    }

    if (isError || !data) {
        return <div className={css.state}>Failed to load post.</div>;
    }

    return (
        <section className={css.root} aria-label="Post">
            <PostCard post={data} />
        </section>
    );
};
