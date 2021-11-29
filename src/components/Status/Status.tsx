import './Status.scss';

import {
    IStatus,
} from 'src/index.types';

import * as b_ from 'b_';
import React from 'react';

const b = b_.with('status');

interface IProps {
    status: IStatus;
}

export default function Status({
    status,
}: IProps) {
    return (
        <div className={b({
            category: status.category,
        })}>
            {status.name}
        </div>
    );
}
