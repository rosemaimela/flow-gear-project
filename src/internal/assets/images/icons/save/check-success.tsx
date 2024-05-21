import React from 'react';

interface SaveIconProps {
    className?: string;
}

const CheckSuccess: React.FC = ({ className }: SaveIconProps) => {
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
            <circle cx='12' cy='12' r='10' stroke='none' fill='currentColor' />
            <path d='M9 12l2 2 4-4' stroke='white' />
        </svg>
    );
};

export default CheckSuccess;
