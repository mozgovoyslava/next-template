import React, { ButtonHTMLAttributes, FC } from 'react';
import css from './Button.module.scss';
import { classNames } from '@/shared/lib/classNames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
}

export const Button: FC<ButtonProps> = ({ children, className, ...otherProps }) => {
    return (
        <button className={classNames(css.root, className)} {...otherProps}>
            {children}
        </button>
    );
};
