import React from 'react';
import css from './product-card.module.css';
import AppH2 from '../header/h2/h2';

interface HeaderProps {
    title: string;
    flex: 'row' | 'column';
    className?: string;
}

const AppProductCard = ({ title, flex = 'column', className }: HeaderProps) => {
    const classes = ` ${className ?? ''}`;
    return (
        <div
            className={
                css.wrapper +
                ` ${flex === 'row' ? css.row : css.column}` +
                classes
            }
        >
            <img
                className={css.card_image}
                src={process.env.PUBLIC_URL + 'images/stock.png'}
            />
            <div className={css.card_details}>
                <AppH2 className={css.card_name} title='Stock Name'></AppH2>
                <p className={css.card_price}>Price</p>
            </div>
        </div>
    );
};

export default AppProductCard;
