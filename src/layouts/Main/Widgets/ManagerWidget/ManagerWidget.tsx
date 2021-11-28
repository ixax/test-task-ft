import './ManagerWidget.scss';

import {
    IUser,
    UserContactTypes,
} from 'src/index.types';

import * as b_ from 'b_';
import React from 'react';

import Avatar from 'src/components/Avatar/Avatar';
import Button, {
    ButtonVariants,
} from 'src/components/Button/Button';

const b = b_.with('manager-widget');

interface IProps {
    user: IUser;
}

const CONTACTS_BUTTON_TEXT = {
    [UserContactTypes.Slack]: 'Slack',
    [UserContactTypes.Email]: 'Email',
};

export default function ManagerWidget({
    user,
}: IProps) {
    return (
        <div className={b()}>
            <div className={b('title')}>
                Account Manager
            </div>
            <div className={b('user-meta')}>
                <div className={b('user-avatar')}>
                    <Avatar
                        avatar={user.avatar}
                        size={'m'}
                    />
                </div>
                <div className={b('user-name')}>
                    {user.name}
                </div>
            </div>
            <div className={b('user-contacts')}>
                {user.contacts.map(contact => (
                    <div
                        key={contact.type}
                        className={b('user-contact-item')}
                    >
                        <Button
                            size={'s'}
                            variant={ButtonVariants.Action}
                        >
                            {CONTACTS_BUTTON_TEXT[contact.type]}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
