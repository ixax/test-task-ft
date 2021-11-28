import './Progressbar.scss';

import * as b_ from 'b_';
import React, {
    useEffect,
    useState,
} from 'react';

const b = b_.with('progressbar')

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
    color: string;
    percentage: number;
    size: number;
}

export default function Progressbar({
    color,
    percentage,
    size,
    children,
}: IProps) {
    const strokeWidth = 6;

    const [
        progress,
        setProgress,
    ] = useState(0);

    useEffect(() => {
        setProgress(percentage);
    }, [percentage]);

    const viewBox = `0 0 ${size} ${size}`;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * Math.PI * 2;
    const dash = (progress * circumference) / 100;

    return (
        <div
            className={b()}
            style={{
                width: size,
                height: size,
            }}
        >
            <svg
                className={b('figure')}
                viewBox={viewBox}
            >
                <circle
                    className={b('circle', {type: 'bg'})}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                />
                <circle
                    className={b('circle', {type: 'line'})}
                    stroke={color}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    strokeDasharray={[dash, circumference - dash].join(' ')}
                />
            </svg>
            {children}
        </div>
    );
}
