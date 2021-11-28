import './Button.scss';

import * as b_ from 'b_';
import React from 'react';

const b = b_.with('button');

export enum ButtonVariants {
    Action = 'action',
    Info = 'info',
    Expand = 'expand',
}

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    size: 's';
    variant: ButtonVariants;
}

export default function Button({
    disabled = false,
    size,
    variant,
    children,
}: IProps) {
    return (
        <div className={b({
            disabled,
            size,
            variant,
        })}>
            {children}
        </div>
    );
}
