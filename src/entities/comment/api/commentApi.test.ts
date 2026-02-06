import type { Comment } from '../model/types';
import { commentApi } from './commentApi';
import { makeStore } from '@/shared/lib/store';

describe('commentApi', () => {
    const originalFetch = global.fetch;

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it('fetches comments by post id', async () => {
        const comments: Comment[] = [
            {
                postId: 1,
                id: 1,
                name: 'Comment title',
                email: 'test@example.com',
                body: 'Comment body',
            },
        ];

        global.fetch = jest.fn().mockResolvedValue(
            new Response(JSON.stringify(comments), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }),
        ) as typeof fetch;

        const store = makeStore();
        const result = await store.dispatch(
            commentApi.endpoints.getCommentsByPost.initiate({
                postId: 1,
                page: 1,
                limit: 1,
            }),
        );

        expect(result.data).toEqual(comments);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});
