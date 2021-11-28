import './GalleryWidget.scss';

import * as b_ from 'b_';
import React from 'react';

const b = b_.with('gallery-widget');

interface IProps {
    image: {
        url: string;
    };
}

export default function GalleryWidget({
    image,
}: IProps) {
    return (
        <div className={b()}>
            <div
                className={b('image')}
                style={{
                    backgroundImage: `url(${image.url})`,
                }}
            />
            <div className={b('meta')}>
                <div className={b('meta-title')}>
                    Behind the Scenes
                </div>
                <div className={b('meta-progressbar')}>
                    <div
                        className={b('meta-progressbar-inner')}
                        style={{
                            width: '15%',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
