'use client';

import { Button } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { decrement, increment, selectCount } from '../model/counterSlice';
import css from './Counter.module.scss';

export const Counter = () => {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();

    return (
        <section className={css.root} aria-label="Counter">
            <div className={css.value}>{count}</div>
            <div className={css.actions}>
                <Button type="button" onClick={() => dispatch(decrement())}>
                    -1
                </Button>
                <Button type="button" onClick={() => dispatch(increment())}>
                    +1
                </Button>
            </div>
        </section>
    );
};
