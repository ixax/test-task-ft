import './Main.scss';

import {
    IDocumentItem,
    IEvent,
    IProject,
    IUser,
    IWorkspace,
} from 'src/index.types';

import * as b_ from 'b_';
import React, {
    useState,
} from 'react';

import Toolbar from 'src/components/Toolbar/Toolbar';
import ProjectsWidget from 'src/layouts/Main/Widgets/ProjectsWidget/ProjectsWidget';
import CallWidget from 'src/layouts/Main/Widgets/CallWidget/CallWidget';
import GalleryWidget from 'src/layouts/Main/Widgets/GalleryWidget/GalleryWidget';
import ManagerWidget from 'src/layouts/Main/Widgets/ManagerWidget/ManagerWidget';
import RecentDocumentsWidget from 'src/layouts/Main/Widgets/RecentDocumentsWidget/RecentDocumentsWidget';
import ReviewsWidget from 'src/layouts/Main/Widgets/ReviewsWidget/ReviewsWidget';
import WelcomeWidget from 'src/layouts/Main/Widgets/WelcomeWidget/WelcomeWidget';

const b = b_.with('main-layout');

interface IProps {
    documents: {
        items: IDocumentItem[];
        total: {
            count: number;
        };
    };
    events: {
        items: IEvent[];
        total: {
            count: number;
        };
    };
    gallery: {
        image: {
            url: string;
        };
    };
    manager: IUser;
    projects: {
        pendingReviews: {
            count: number;
        },
        projects: IProject[];
    };
    reviews: {
        items: IDocumentItem[];
        total: {
            count: number;
        };
    };
    user: Partial<IUser>;
    welcome: {
        title: string;
        text: JSX.Element;
    };
    workspaces: IWorkspace[];
}

export default function MainLayout({
    documents,
    events,
    gallery,
    manager,
    projects,
    reviews,
    user,
    welcome,
    workspaces,
}: IProps) {
    const [
        projectsExpanded,
        toggleProjectExpanded,
    ] = useState(false);

    return (
        <div className={b()}>
            <div className={b('toolbar')}>
                <Toolbar
                    user={user}
                    workspaces={workspaces}
                />
            </div>
            <div className={b('content')}>
                <div className={b('widgets-wrapper')}>
                    <div
                        className={b('widgets')}
                        style={{
                            gridTemplateAreas: [
                                projectsExpanded
                                    ? `'projects projects projects projects projects projects'`
                                    : `'welcome welcome welcome welcome projects projects'`,
                                projectsExpanded
                                    ? `'projects projects projects projects projects projects'`
                                    : `'welcome welcome welcome welcome projects projects'`,
                                `'review review recent-documents recent-documents gallery gallery'`,
                                `'call manager recent-documents recent-documents gallery gallery'`,
                            ].filter(Boolean).join(' '),
                        }}
                    >
                        {!projectsExpanded && (
                            <div
                                className={b('widget-item', {theme: 'dark'})}
                                style={{
                                    gridArea: 'welcome',
                                }}
                            >
                                <WelcomeWidget
                                    welcome={welcome}
                                />
                            </div>
                        )}
                        <div
                            className={b('widget-item', {theme: 'dark'})}
                            style={{
                                gridArea: 'projects',
                            }}
                        >
                            <ProjectsWidget
                                expanded={projectsExpanded}
                                toggleExpanded={toggleProjectExpanded}
                                projects={projects.projects}
                                pendingReviews={projects.pendingReviews}
                            />
                        </div>
                        <div
                            className={b('widget-item', {theme: 'light'})}
                            style={{
                                gridArea: 'review',
                            }}
                        >
                            <ReviewsWidget
                                reviews={reviews}
                            />
                        </div>
                        <div
                            className={b('widget-item', {theme: 'light'})}
                            style={{
                                gridArea: 'call',
                            }}
                        >
                            <CallWidget
                                events={events}
                            />
                        </div>
                        <div
                            className={b('widget-item', {theme: 'light'})}
                            style={{
                                gridArea: 'manager',
                            }}
                        >
                            <ManagerWidget
                                user={manager}
                            />
                        </div>
                        <div
                            className={b('widget-item', {theme: 'light'})}
                            style={{
                                gridArea: 'recent-documents',
                            }}
                        >
                            <RecentDocumentsWidget
                                documents={documents}
                            />
                        </div>
                        <div
                            className={b('widget-item', {theme: 'dark'})}
                            style={{
                                gridArea: 'gallery',
                            }}
                        >
                            <GalleryWidget
                                image={gallery.image}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
