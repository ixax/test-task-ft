import './Main.scss';

import * as b_ from 'b_';
import React from 'react';

import Toolbar from 'src/components/Toolbar/Toolbar';
import BurnDownWidget from 'src/components/Widgets/BurndownWidget/BurnDownWidget';
import CallWidget from 'src/components/Widgets/CallWidget/CallWidget';
import GalleryWidget from 'src/components/Widgets/GalleryWidget/GalleryWidget';
import ManagerWidget from 'src/components/Widgets/ManagerWidget/ManagerWidget';
import RecentDocumentsWidget from 'src/components/Widgets/RecentDocumentsWidget/RecentDocumentsWidget';
import ReviewWidget from 'src/components/Widgets/ReviewWidget/ReviewWidget';
import WelcomeWidget from 'src/components/Widgets/WelcomeWidget/WelcomeWidget';
import {
    IDocumentItem,
    IUser,
    IWorkspace,
} from 'src/index.types';

const b = b_.with('main-layout');

interface IProps {
    documents: {
        items: IDocumentItem[];
        total: {
            count: number;
        };
    };
    gallery: {
        image: {
            url: string;
        };
    };
    reviews: {
        items: IDocumentItem[];
        total: {
            count: number;
        };
    };
    user: IUser;
    workspaces: IWorkspace[];
}

export default function MainLayout({
    documents,
    gallery,
    reviews,
    user,
    workspaces,
}: IProps) {
    return (
        <div className={b()}>
            <div className={b('toolbar')}>
                <Toolbar
                    user={user}
                    workspaces={workspaces}
                />
            </div>
            <div
                className={b('widgets')}
                style={{
                    gridTemplateAreas: `
                    'welcome welcome welcome welcome burn-down burn-down'
                    'welcome welcome welcome welcome burn-down burn-down'
                    'review review recent-documents recent-documents gallery gallery'
                    'call manager recent-documents recent-documents gallery gallery'`,
                }}
            >
                <div
                    className={b('widget-item', {theme: 'dark'})}
                    style={{
                        gridArea: 'welcome',
                    }}
                >
                    <WelcomeWidget />
                </div>
                <div
                    className={b('widget-item', {theme: 'dark'})}
                    style={{
                        gridArea: 'burn-down',
                    }}
                >
                    <BurnDownWidget />
                </div>
                <div
                    className={b('widget-item', {theme: 'light'})}
                    style={{
                        gridArea: 'review',
                    }}
                >
                    <ReviewWidget reviews={reviews} />
                </div>
                <div
                    className={b('widget-item', {theme: 'light'})}
                    style={{
                        gridArea: 'call',
                    }}
                >
                    <CallWidget />
                </div>
                <div
                    className={b('widget-item', {theme: 'light'})}
                    style={{
                        gridArea: 'manager',
                    }}
                >
                    <ManagerWidget />
                </div>
                <div
                    className={b('widget-item', {theme: 'light'})}
                    style={{
                        gridArea: 'recent-documents',
                    }}
                >
                    <RecentDocumentsWidget documents={documents} />
                </div>
                <div
                    className={b('widget-item', {theme: 'dark'})}
                    style={{
                        gridArea: 'gallery',
                    }}
                >
                    <GalleryWidget image={gallery.image} />
                </div>
            </div>
        </div>
    );
}
