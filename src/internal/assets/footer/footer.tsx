import React from 'react';
import css from './footer.module.css';

const AppFooter = () => {
    return (
        <footer className={css.footer}>
            <p>This is the footer content.</p>
            <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </footer>
    );
};

export default AppFooter;