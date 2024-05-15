import React from 'react';
import css from './not-found.module.css';

const NotFoundView = () => (
  <main className={css.main}>
  <div className={css.content}>
    <h1 className={css.title}>404</h1>
    <span className={css.delimiter}>{""}</span>
    <p className={css.body}>Sorry! The page you are looking for does not exist</p>
    <p className={css.icon}>{":("}</p>
  </div>
  </main>
);

export default NotFoundView;