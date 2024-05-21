import React, { useEffect, useState } from 'react';
import css from './header.module.css';

import { useNavigate, useLocation } from 'react-router-dom';
import AppH1 from './h1/h1';

interface HeaderProps {
    title: string;
    children?: React.ReactNode;
}

const AppHeader = ({ title }: HeaderProps) => {
    const navigate = useNavigate();
    const currentPath = useLocation();
    const [canClickHome, setCanClickHome] = useState(false);
    const [home_anchor_css, setHomeAnchorCss] = useState('');

    const onClickHandler = () => {
        onUpdate();
        if (canClickHome) {
            navigate('/');
        }
    };
    useEffect(() => {
        onUpdate();
    }, [currentPath]);

    const onUpdate = () => {
        const result = !['/', '/home'].includes(
            currentPath.pathname.toString()
        );
        setCanClickHome(result);
        setHomeAnchorCss(
            ` ${result ? css.home_anchor_enabled : css.home_anchor_disabled}`
        );
    };

    return (
        <header className={css.header}>
            <img
                className={css.img}
                src={process.env.PUBLIC_URL + 'images/logo.png'}
            />
            <a
                className={css.home_anchor + home_anchor_css}
                onClick={onClickHandler}
            >
                <AppH1 className={css.h1} title={title} />
            </a>
        </header>
    );
};

export default AppHeader;
