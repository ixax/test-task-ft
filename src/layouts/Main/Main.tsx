import './Main.scss';

import {
    IDocumentItem,
    IEvent,
    IProject,
    IUser,
    IWorkspace,
} from 'src/index.types';

import * as b_ from 'b_';
import throttle from 'lodash/throttle';
import React from 'react';

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

interface IState {
    projectsExpanded: boolean;
    projectsWidgetHeight: number;
    projectsWidgetMinWidth: number;
}

const ANIMATIONS_ALLOWED_WIDTH = 1100;

export default class MainLayout extends React.Component<IProps, IState> {

    state: IState = {
        projectsExpanded: false,
        projectsWidgetHeight: null,
        projectsWidgetMinWidth: null,
    };

    private projectsWrapperRef = React.createRef<HTMLDivElement>();
    private widgetsRef = React.createRef<HTMLDivElement>();

    constructor(props: IProps) {
        super(props);

        this.toggleProjectExpand = this.toggleProjectExpand.bind(this);
        this.onResize = throttle(this.onResize.bind(this), 500);
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize);
        window.screen?.orientation?.addEventListener('change', this.onResize);

        this.onResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
        window.screen?.orientation?.removeEventListener('change', this.onResize);
    }

    render() {
        const {
            documents,
            events,
            gallery,
            manager,
            projects,
            reviews,
            user,
            welcome,
            workspaces,
        } = this.props;
        const {
            projectsExpanded,
            projectsWidgetHeight,
            projectsWidgetMinWidth,
        } = this.state;

        return (
            <div className={b({
                'projects-expanded': projectsExpanded,
            })}>
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
                            ref={this.widgetsRef}
                        >
                            <div
                                className={b('widget-item', {
                                    theme: 'dark',
                                })}
                                style={{
                                    gridArea: 'welcome',
                                }}
                            >
                                <WelcomeWidget
                                    welcome={welcome}
                                />
                            </div>
                            <div
                                className={b('projects-wrapper')}
                                style={{
                                    gridArea: 'projects',
                                }}
                                ref={this.projectsWrapperRef}
                            >
                                <div
                                    className={b('widget-item', {
                                        type: 'projects',
                                        theme: 'dark',
                                    })}
                                    style={{
                                        width: !projectsExpanded && projectsWidgetMinWidth,
                                        height: projectsWidgetHeight,
                                    }}
                                >
                                    <ProjectsWidget
                                        expanded={projectsExpanded}
                                        toggleExpanded={this.toggleProjectExpand}
                                        projects={projects.projects}
                                        pendingReviews={projects.pendingReviews}
                                    />
                                </div>
                            </div>
                            <div
                                className={b('widget-item', {
                                    type: 'review',
                                    theme: 'light',
                                })}
                                style={{
                                    gridArea: 'review',
                                }}
                            >
                                <ReviewsWidget
                                    reviews={reviews}
                                />
                            </div>
                            <div
                                className={b('widget-item', {
                                    type: 'call',
                                    theme: 'light',
                                })}
                                style={{
                                    gridArea: 'call',
                                }}
                            >
                                <CallWidget
                                    events={events}
                                />
                            </div>
                            <div
                                className={b('widget-item', {
                                    type: 'manager',
                                    theme: 'light',
                                })}
                                style={{
                                    gridArea: 'manager',
                                }}
                            >
                                <ManagerWidget
                                    user={manager}
                                />
                            </div>
                            <div
                                className={b('widget-item', {
                                    type: 'recent-documents',
                                    theme: 'light',
                                })}
                                style={{
                                    gridArea: 'recent-documents',
                                }}
                            >
                                <RecentDocumentsWidget
                                    documents={documents}
                                />
                            </div>
                            <div
                                className={b('widget-item', {
                                    type: 'gallery',
                                    theme: 'dark',
                                })}
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

    private toggleProjectExpand() {
        this.setState(prevState => ({
            projectsExpanded: !prevState.projectsExpanded,
        }));
    }

    private onResize() {
        const animationsEnabled = window.outerWidth >= ANIMATIONS_ALLOWED_WIDTH;

        this.setState({
            projectsWidgetHeight: animationsEnabled
                ? this.projectsWrapperRef.current.clientHeight
                : null,
            projectsWidgetMinWidth: animationsEnabled
                ? this.projectsWrapperRef.current.clientWidth
                : null,
        });
    }

}
