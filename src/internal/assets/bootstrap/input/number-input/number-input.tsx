import React from 'react';
import css from './number-input.module.css';

interface HeaderProps {
    placeholder?: string;
    className?: string;
}

const AppNumberInput = ({
    placeholder = 'Enter a value',
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
        </div>
    );
};

export default AppNumberInput;
