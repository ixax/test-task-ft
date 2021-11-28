import './Workspaces.scss';

import {
    IWorkspace,
} from "../../index.types";

import * as b_ from 'b_';
import React from 'react';

const b = b_.with('workspaces');

interface IProps {
    workspaces: IWorkspace[];
}

export default function Workspaces({
    workspaces,
}: IProps) {
    return (
        <div className={b()}>
            {workspaces.map(workspace => (
                <div
                    key={workspace.id}
                    className={b('item', {active: workspace.isActive})}
                >
                    <div className={b('item-inner')}
                         style={{
                             backgroundImage: `url(${workspace.logo.url})`,
                         }}
                    >
                        {workspace.notifications.count > 0 && (
                            <div className={b('item-notification-mark')} />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
