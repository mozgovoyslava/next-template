import { baseApi } from '@/shared/api';
import type { User } from '../model/types';

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<User[], void>({
            query: () => '/users',
            providesTags: ['User'],
        }),
    }),
    overrideExisting: false,
});

export const { useGetUsersQuery } = userApi;
