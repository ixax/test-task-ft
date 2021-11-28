import './RecentDocumentsWidget.scss';

import {
    IDocumentItem,
} from 'src/index.types';

import * as b_ from 'b_';
import React from 'react';

import Button, {
    ButtonVariants,
} from 'src/components/Button/Button';
import DocumentItem from 'src/components/DocumentItem/DocumentItem';

const b = b_.with('recent-documents-widget');

const VISIBLE_ITEMS_COUNT = 3;

interface IProps {
    documents: {
        items: IDocumentItem[];
        total: {
            count: number;
        };
    };
}

export default function RecentDocumentsWidget({
    documents: {
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
                    {items.slice(0, VISIBLE_ITEMS_COUNT).map(item => (
                        <div
                            key={item.id}
                            className={b('item')}
                        >
                            <DocumentItem document={item} />
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
                        {totalCount} more documents
                    </Button>
                </div>
            )}
        </div>
    );
}
