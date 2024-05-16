import React from 'react';
import css from './h1.module.css';

interface HeaderProps {
    title: string;
    className?: string;
}

const AppH1 = ({ title, className }: HeaderProps) => {
    const classes = ` ${className ?? ''}`;
    return <h1 className={css.h1 + classes}>{title}</h1>;
};

export default AppH1;
