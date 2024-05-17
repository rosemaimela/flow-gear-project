import React from 'react';

interface SaveIconProps {
    className?: string;
}

const SaveIcon: React.FC = ({ className }: SaveIconProps) => {
    return (
        <svg
            className={className ?? ''}
            width='24'
            xmlns='http://www.w3.org/2000/svg'
            height='24'
            fill='none'
        >
            <g className='fills'>
                <rect
                    rx='0'
                    ry='0'
                    width='24'
                    height='24'
                    className='frame-background'
                />
            </g>
            <g className='frame-children'>
                <path
                    d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z'
                    style={{ fill: 'none' }}
                    className='fills'
                />
                <g
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='strokes'
                >
                    <path
                        d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z'
                        style={{
                            fill: 'none',
                            stroke: 'rgb(0, 0, 0)',
                            strokeOpacity: 1,
                            strokeWidth: 2,
                        }}
                        className='stroke-shape'
                    />
                </g>
                <path
                    d='M17 21v-8H7v8'
                    style={{ fill: 'none' }}
                    className='fills'
                />
                <g
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='strokes'
                >
                    <path
                        d='M17 21v-8H7v8'
                        style={{
                            fill: 'none',
                            stroke: 'rgb(0, 0, 0)',
                            strokeOpacity: 1,
                            strokeWidth: 2,
                        }}
                        className='stroke-shape'
                    />
                </g>
                <path d='M7 3v5h8' style={{ fill: 'none' }} className='fills' />
                <g
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='strokes'
                >
                    <path
                        d='M7 3v5h8'
                        style={{
                            fill: 'none',
                            stroke: 'rgb(0, 0, 0)',
                            strokeOpacity: 1,
                            strokeWidth: 2,
                        }}
                        className='stroke-shape'
                    />
                </g>
            </g>
        </svg>
    );
};

export default SaveIcon;
