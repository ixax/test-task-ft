import './ReviewWidget.scss';

import {
    IDocumentItem,
} from 'src/index.types';

import * as b_ from 'b_';
import React from 'react';

import Button, {
    ButtonVariants,
} from 'src/components/Button/Button';
import DocumentItem from 'src/components/DocumentItem/DocumentItem';

const b = b_.with('review-widget');

interface IProps {
    reviews: {
        items: IDocumentItem[],
        total: {
            count: number;
        };
    };
}

export default function ReviewWidget({
    reviews: {
        items,
        total,
    },
}: IProps) {
    const visibleReviewsCount = 1;
    const totalCount = total.count - visibleReviewsCount;

    return (
        <div className={b()}>
            <div className={b('title')}>
                Creative Reviews
            </div>
            <div className={b('content')}>
                {items.slice(0, visibleReviewsCount).map(review => (
                    <DocumentItem
                        key={review.id}
                        document={review}
                    />
                ))}
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
