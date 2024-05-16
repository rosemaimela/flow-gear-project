import React from 'react';
import css from './header.module.css';
import AppH1 from './h1/h1';

interface HeaderProps {
    title: string;
    children?: React.ReactNode;
}

const AppHeader = ({ title }: HeaderProps) => {
    return (
        <header className={css.header}>
            <img
                className={css.img}
                src={process.env.PUBLIC_URL + 'images/logo.png'}
            />
            <AppH1 className={css.h1} title={title} />
        </header>
    );
};

export default AppHeader;
