import React from 'react';
import css from './h2.module.css';

interface HeaderProps {
    title: string;
    className?: string;
}

const AppH2 = ({ title, className }: HeaderProps) => {
    const classes = ` ${className ?? ''}`;
    return <h2 className={css.h2 + classes}>{title}</h2>;
};

export default AppH2;
