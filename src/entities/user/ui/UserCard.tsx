import type { User } from '../model/types';
import css from './UserCard.module.scss';

interface UserCardProps {
    user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
    return (
        <article className={css.root}>
            <div className={css.header}>
                <h3 className={css.name}>{user.name}</h3>
                <span className={css.username}>@{user.username}</span>
            </div>
            <div className={css.meta}>
                <span>{user.email}</span>
                <span>{user.phone}</span>
            </div>
            <div className={css.meta}>
                <span>{user.website}</span>
                <span>{user.company.name}</span>
            </div>
            <div className={css.address}>
                {user.address.city}, {user.address.street}
            </div>
        </article>
    );
};
