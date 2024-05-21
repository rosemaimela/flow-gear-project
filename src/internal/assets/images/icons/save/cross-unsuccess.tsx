import React from 'react';

interface SaveIconProps {
    className?: string;
}

const CrossUnsuccess: React.FC = ({ className }: SaveIconProps) => {
    return (
        <svg viewBox='0 0 24 24' className={className}>
            <circle cx='12' cy='12' r='10' fill='currentColor' />
            <path d='M8 8 L16 16 M8 16 L16 8' stroke='white' strokeWidth='2' />
        </svg>
    );
};

export default CrossUnsuccess;
