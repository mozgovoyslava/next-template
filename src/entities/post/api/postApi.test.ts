import type { Post } from '../model/types';
import { postApi } from './postApi';
import { makeStore } from '@/shared/lib/store';

describe('postApi', () => {
    const originalFetch = global.fetch;

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it('fetches posts list', async () => {
        const posts: Post[] = [
            {
                userId: 1,
                id: 1,
                title: 'post title',
                body: 'post body',
            },
        ];

        global.fetch = jest.fn().mockResolvedValue(
            new Response(JSON.stringify(posts), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }),
        ) as typeof fetch;

        const store = makeStore();
        const result = await store.dispatch(postApi.endpoints.getPosts.initiate({ page: 1, limit: 1 }));

        expect(result.data).toEqual(posts);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('fetches post by id', async () => {
        const post: Post = {
            userId: 1,
            id: 1,
            title: 'single post',
            body: 'post body',
        };

        global.fetch = jest.fn().mockResolvedValue(
            new Response(JSON.stringify(post), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }),
        ) as typeof fetch;

        const store = makeStore();
        const result = await store.dispatch(postApi.endpoints.getPostById.initiate(1));

        expect(result.data).toEqual(post);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});
