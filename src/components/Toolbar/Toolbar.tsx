import './Toolbar.scss';

import {
    IUser,
    IWorkspace,
} from "../../index.types";

import * as b_ from 'b_';
import React from 'react';

import Avatar from "src/components/Avatar/Avatar";
import SearchButton from "src/components/SearchButton/SearchButton";
import Workspaces from "src/components/Workspaces/Workspaces";

const b = b_.with('toolbar');

interface IProps {
    user: IUser;
    workspaces: IWorkspace[];
}

export default function Toolbar({
    user,
    workspaces,
}: IProps) {
    return (
        <div className={b()}>
            <div className={b('workspaces')}>
                <Workspaces workspaces={workspaces} />
            </div>
            <div className={b('menu')}>
                <div className={b('profile')}>
                    <Avatar
                        avatar={user.avatar}
                        size={'s'}
                    />
                </div>
                <div className={b('search-button')}>
                    <SearchButton />
                </div>
            </div>
        </div>
    );
}
