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
    const visibleDocumentsCount = 3;
    const totalCount = total.count - visibleDocumentsCount;

    return (
        <div className={b()}>
            <div className={b('title')}>
                Creative Reviews
            </div>
            <div className={b('items')}>
                {items.slice(0, visibleDocumentsCount).map(document => (
                    <div
                        key={document.id}
                        className={b('item')}
                    >
                        <DocumentItem document={document} />
                    </div>
                ))}
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
