import React from 'react';
import css from './header.module.css';

interface HeaderProps {
    title: string;
    children?: React.ReactNode;
}

const AppHeader = ({ title }: HeaderProps) => {
    return (
        <header className={css.header}>
            <img className={css.img} />
            <h1>{title}</h1>
        </header>
    );
};

export default AppHeader;