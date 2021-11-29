import './Toolbar.scss';

import {
    IUser,
    IWorkspace,
} from 'src/index.types';

import * as b_ from 'b_';
import React from 'react';

import Avatar from 'src/components/Avatar/Avatar';

const b = b_.with('toolbar');

interface IProps {
    user: Partial<IUser>;
    workspaces: IWorkspace[];
}

export default function Toolbar({
    user,
    workspaces,
}: IProps) {
    return (
        <div className={b()}>
            <div className={b('workspaces')}>
                {workspaces.map(workspace => (
                    <div
                        key={workspace.id}
                        className={b('workspace-item', {
                            active: workspace.isActive,
                            'has-notifications': workspace.notifications?.count > 0,
                        })}
                    >
                        <div className={b('workspace-item-inner')}
                             style={{
                                 backgroundImage: `url(${workspace.logo.url})`,
                             }}
                        />
                    </div>
                ))}
                <div className={b('workspace-item', {
                    action: 'add',
                })}>
                    <div className={b('workspace-item-inner')} />
                </div>
            </div>
            <div className={b('menu')}>
                <div className={b('menu-item', {type: 'search'})} />
                <div className={b('menu-item', {type: 'profile'})}>
                    <Avatar
                        avatar={user.avatar}
                        size={'s'}
                    />
                </div>
            </div>
        </div>
    );
}
