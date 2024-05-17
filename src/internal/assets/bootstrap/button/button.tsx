import React, { Children } from 'react';
import css from './button.module.css';
import SaveIcon from 'assets/images/icons/save/save';

interface HeaderProps {
    icon?: string;
    label?: string;
    placeholder?: string;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
}

const AppButton = ({
    placeholder: string = 'Quantity',
    onClick = () => {},
    className,
    children,
}: HeaderProps) => {
    const classes = ` ${className ?? ''}`;
    return (
        <div className={css.wrapper + classes}>
            <button
                className={css.button + ` ${className ?? ''}`}
                type='button'
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    );
};

export default AppButton;
