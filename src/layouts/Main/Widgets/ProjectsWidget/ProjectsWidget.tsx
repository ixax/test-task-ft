import './ProjectsWidget.scss';

import {
    IProject,
} from 'src/index.types';

import * as b_ from 'b_';
import React from 'react';

import Progressbar from 'src/components/Progressbar/Progressbar';

const b = b_.with('projects-widget');

interface IProps {
    expanded: boolean;
    toggleExpanded: (value: boolean) => void;
    pendingReviews: {
        count: number;
    };
    projects: IProject[];
}

const PROJECT_WIDTH = 200;

export default function ProjectsWidget({
    expanded,
    toggleExpanded,
    pendingReviews,
    projects,
}: IProps) {
    return (
        <div className={b({
            expanded: expanded ? 'yes' : 'no',
        })}>
            {expanded && (
                <>
                    <div className={b('title')}>
                        <div
                            className={b('title-inner')}
                            style={{
                                visibility: pendingReviews.count > 0 && expanded ? 'visible' : 'hidden',
                            }}
                        >
                            {pendingReviews.count} Pending Reviews
                        </div>
                    </div>
                    <div className={b('items')}>
                        {projects.map(project => (
                            <div
                                key={project.id}
                                className={b('item')}
                                style={{
                                    width: PROJECT_WIDTH,
                                }}
                            >
                                <div className={b('item-progressbar')}>
                                    <Progressbar
                                        color={project.color}
                                        percentage={project.percentage}
                                        size={PROJECT_WIDTH}
                                    >
                                        <div className={b('item-stat')}>
                                            <div className={b('item-stat-days')}>{project.daysLeft}</div>
                                            <div className={b('item-stat-left')}>days</div>
                                            <div className={b('item-stat-comments')}>before launch</div>
                                        </div>
                                    </Progressbar>
                                </div>
                                <div className={b('item-name')}>
                                    {project.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <div
                className={b('toggle-button')}
                onClick={() => toggleExpanded(!expanded)}
            />
        </div>
    );
}
