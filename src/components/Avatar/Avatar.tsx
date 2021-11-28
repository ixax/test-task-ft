import './Avatar.scss';

import {
    IUser,
} from "../../index.types";

import * as b_ from 'b_';
import React from 'react';

const b = b_.with('avatar');

interface IProps {
    avatar: IUser['avatar'];
    size: 's' | 'm';
}

export default function Avatar({
    avatar,
    size = 's',
}: IProps) {
    return (
        <div className={b({
            size,
        })}>
            <img
                className={b('image')}
                src={avatar.url}
                alt=""
            />
        </div>
    );
}
