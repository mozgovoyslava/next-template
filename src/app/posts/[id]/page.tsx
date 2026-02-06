import { notFound } from 'next/navigation';
import { PostDetails } from '@/widgets/postDetails';
import { CommentsList } from '@/widgets/commentsList';
import css from './page.module.scss';

interface PostPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PostPage({ params }: PostPageProps) {
    const { id } = await params;
    const postId = Number(id);

    if (!Number.isFinite(postId)) {
        notFound();
    }

    return (
        <main className={css.root}>
            <PostDetails postId={postId} />
            <h2 className={css.heading}>Комментарии</h2>
            <CommentsList postId={postId} />
        </main>
    );
}
