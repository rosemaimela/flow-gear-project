import React from 'react';

interface SaveIconProps {
    className?: string;
}

const CartIcon = ({ className }: SaveIconProps) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={className}
        >
            <circle cx='9' cy='21' r='1' />
            <circle cx='20' cy='21' r='1' />
            <path d='M1 1h4l2.5 6h13M6.5 7.5l-1 10h13' />
        </svg>
    );
};

export default CartIcon;
