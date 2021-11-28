import './CallWidget.scss';

import {
    IEvent,
} from 'src/index.types';

import * as b_ from 'b_';
import React from 'react';

import Button, {
    ButtonVariants,
} from 'src/components/Button/Button';

const b = b_.with('call-widget');

const VISIBLE_ITEMS_COUNT = 1;

interface IProps {
    events: {
        items: IEvent[];
        total: {
            count: number;
        };
    };
}

export default function CallWidget({
    events: {
        items,
        total,
    },
}: IProps) {
    const totalCount = total.count - VISIBLE_ITEMS_COUNT;

    return (
        <div className={b()}>
            <div className={b('content')}>
                <div className={b('title')}>
                    Call with The Team
                </div>
                <div className={b('items')}>
                    {items.slice(0, VISIBLE_ITEMS_COUNT).map(item => (
                        <div
                            key={item.id}
                            className={b('item')}
                        >
                            <div className={b('item-start')}>
                                {item.startAt}
                            </div>
                            <div className={b('item-actions')}>
                                <Button
                                    variant={ButtonVariants.Action}
                                    size={'s'}
                                >
                                    Join Zoom
                                </Button>
                                <Button
                                    variant={ButtonVariants.Info}
                                    size={'s'}
                                >
                                    Details
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {totalCount > 0 && (
                <div className={b('actions')}>
                    <Button
                        variant={ButtonVariants.Expand}
                        size={'s'}
                    >
                        {totalCount} more events
                    </Button>
                </div>
            )}
        </div>
    );
}
