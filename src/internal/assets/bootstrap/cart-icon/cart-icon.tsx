import React from 'react';
import css from './cart-icon.module.css';
import CartIcon from 'assets/images/icons/save/check-success copy';

interface AppCartIconProps {
    count: number;
    onClick?: () => void;
}

const AppCartIcon: React.FC<AppCartIconProps> = ({ count, onClick }) => {
    return (
        <div className='cart_icon' onClick={onClick}>
            <CartIcon className={css.cart_icon} />
            <span
                className={
                    css.cart_count +
                    ` ${
                        count === 0
                            ? css.cart_count_empty
                            : css.cart_count_not_empty
                    }`
                }
            >
                {count}
            </span>
        </div>
    );
};

export default AppCartIcon;
