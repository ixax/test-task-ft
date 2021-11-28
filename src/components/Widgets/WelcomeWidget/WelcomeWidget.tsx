import './WelcomeWidget.scss';

import * as b_ from 'b_';
import React from 'react';

const b = b_.with('welcome-widget');

interface IProps {
    welcome: {
        title: string;
        text: any;
    };
}

export default function WelcomeWidget({
    welcome: {
        title,
        text,
    },
}: IProps) {
    return (
        <div className={b()}>
            <h3>{title}</h3>
            <div className={b('content')}>
                {text}
            </div>
        </div>
    );
}
