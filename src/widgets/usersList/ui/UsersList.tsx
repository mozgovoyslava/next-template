'use client';

import { UserCard, useGetUsersQuery } from '@/entities/user';
import css from './UsersList.module.scss';

export const UsersList = () => {
    const { data, isLoading, isError } = useGetUsersQuery();

    if (isLoading) {
        return <div className={css.state}>Loading users...</div>;
    }

    if (isError) {
        return <div className={css.state}>Failed to load users.</div>;
    }

    if (!data || data.length === 0) {
        return <div className={css.state}>No users found.</div>;
    }

    return (
        <section className={css.root} aria-label="Users">
            <h2 className={css.title}>Users</h2>
            <div className={css.list}>
                {data.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </section>
    );
};
