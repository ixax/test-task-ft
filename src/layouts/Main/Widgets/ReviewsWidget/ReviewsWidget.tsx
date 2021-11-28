import './ReviewsWidget.scss';

import {
    IDocumentItem,
} from 'src/index.types';

import * as b_ from 'b_';
import React from 'react';

import Button, {
    ButtonVariants,
} from 'src/components/Button/Button';
import DocumentItem from 'src/components/DocumentItem/DocumentItem';

const b = b_.with('reviews-widget');

const VISIBLE_ITEMS_COUNT = 1;

interface IProps {
    reviews: {
        items: IDocumentItem[],
        total: {
            count: number;
        };
    };
}

export default function ReviewsWidget({
    reviews: {
        items,
        total,
    },
}: IProps) {
    const totalCount = total.count - VISIBLE_ITEMS_COUNT;

    return (
        <div className={b()}>
            <div className={b('content')}>
                <div className={b('title')}>
                    Creative Reviews
                </div>
                <div className={b('items')}>
                    {items.slice(0, VISIBLE_ITEMS_COUNT).map(review => (
                        <div
                            key={review.id}
                            className={b('item')}
                        >
                            <DocumentItem document={review} />
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
                        {totalCount} more reviews
                    </Button>
                </div>
            )}
        </div>
    );
}
