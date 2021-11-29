import './DocumentItem.scss';

import {
    IDocumentItem,
} from 'src/index.types';

import * as b_ from 'b_';
import React from 'react';
import Status from 'src/components/Status/Status';

const b = b_.with('document-item');

interface IProps {
    document: IDocumentItem;
}

export default function DocumentItem({
    document,
}: IProps) {
    const {
        icon,
        name,
        status,
        updatedAt,
    } = document;

    return (
        <div className={b()}>
            <div className={b('meta')}>
                <div className={b('pic')}>
                    <img
                        className={b('pic-image')}
                        src={icon.url}
                        alt=""
                    />
                </div>
                <div className={b('info')}>
                    <div className={b('info-title')}>
                        {name}
                    </div>
                    <div className={b('info-updated')}>
                        {updatedAt}
                    </div>
                </div>
            </div>
            <div className={b('status')}>
                <Status status={status} />
            </div>
        </div>
    );
}
