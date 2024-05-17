import React from 'react';
import css from './search-input.module.css';
import 'font-awesome/css/font-awesome.min.css';

interface HeaderProps {
    placeholder?: string;
    className?: string;
}

const AppSearchInput = ({
    placeholder = 'Search...',
    className,
}: HeaderProps) => {
    const classes = ` ${className ?? ''}`;
    return (
        <div className={css.wrapper + classes}>
            <input
                className={css.input}
                type='input'
                placeholder={placeholder}
            ></input>
            <svg className={css.icon} viewBox='0 0 20 20'>
                <path
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='0.75'
                    d='M 8 8 L 11 11'
                ></path>
                <circle
                    cx='6'
                    cy='6'
                    r='2.5'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='0.5'
                ></circle>
            </svg>
        </div>
    );
};

export default AppSearchInput;
