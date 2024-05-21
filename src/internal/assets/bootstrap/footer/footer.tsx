import React from 'react';
import css from './footer.module.css';

const AppFooter = () => {
    return (
        <footer className={css.footer}>
            <div>
                <p>This is the footer content.</p>
            </div>
            <div>
                <p>
                    &copy; {new Date().getFullYear()} Your Company Name. All
                    rights reserved.
                </p>
                <nav>
                    <ul>
                        <li>
                            <a href='/'>Home</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default AppFooter;
