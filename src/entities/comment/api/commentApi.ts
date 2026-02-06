import { baseApi } from '@/shared/api';
import type { Comment } from '../model/types';

export interface GetCommentsParams {
    postId: number;
    page?: number;
    limit?: number;
}

export const commentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCommentsByPost: build.query<Comment[], GetCommentsParams>({
            query: ({ postId, page = 1, limit = 10 }) => ({
                url: '/comments',
                params: {
                    postId,
                    _page: page,
                    _limit: limit,
                },
            }),
            serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName}-${queryArgs.postId}`,
            merge: (currentCache, newItems) => {
                const existingIds = new Set(currentCache.map((comment) => comment.id));
                newItems.forEach((comment) => {
                    if (!existingIds.has(comment.id)) {
                        currentCache.push(comment);
                    }
                });
            },
            forceRefetch: ({ currentArg, previousArg }) =>
                currentArg?.page !== previousArg?.page ||
                currentArg?.limit !== previousArg?.limit ||
                currentArg?.postId !== previousArg?.postId,
            providesTags: (result, _error, arg) =>
                result
                    ? [
                          { type: 'Comment', id: `LIST-${arg.postId}` },
                          ...result.map((comment) => ({ type: 'Comment' as const, id: comment.id })),
                      ]
                    : [{ type: 'Comment', id: `LIST-${arg.postId}` }],
        }),
    }),
    overrideExisting: false,
});

export const { useGetCommentsByPostQuery } = commentApi;
