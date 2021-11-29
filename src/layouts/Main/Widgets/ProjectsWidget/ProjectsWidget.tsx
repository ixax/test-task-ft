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

const PROJECT_ITEM_SIZE = 200;
const PROJECT_STROKE_WIDTH = 6;

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
            {expanded && (
                <div className={b('expanded-items')}>
                    {projects.map(project => (
                        <div
                            key={project.id}
                            className={b('expanded-item')}
                            style={{
                                width: PROJECT_ITEM_SIZE,
                            }}
                        >
                            <div className={b('expanded-item-progressbar')}>
                                <Progressbar
                                    color={project.color}
                                    percentage={project.percentage}
                                    size={PROJECT_ITEM_SIZE}
                                    strokeWidth={PROJECT_STROKE_WIDTH}
                                >
                                    <div className={b('expanded-item-stat')}>
                                        <div className={b('expanded-item-stat-days')}>{project.daysLeft}</div>
                                        <div className={b('expanded-item-stat-left')}>days</div>
                                        <div className={b('expanded-item-stat-comments')}>before launch</div>
                                    </div>
                                </Progressbar>
                            </div>
                            <div className={b('expanded-item-name')}>
                                {project.name}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {!expanded && (
                <div className={b('collapsed-items')}>
                    <div
                        className={b('collapsed-items-wrapper')}
                        style={{
                            width: PROJECT_ITEM_SIZE,
                            height: PROJECT_ITEM_SIZE,
                        }}
                    >
                        <div className={b('collapsed-items-inner')}>
                            <div className={b('percentage', {position: 'top'})}>100%</div>
                            <div className={b('percentage', {position: 'right'})}>25%</div>
                            <div className={b('percentage', {position: 'bottom'})}>50%</div>
                            <div className={b('percentage', {position: 'left'})}>75%</div>
                        </div>
                        {projects.map((project, i) => {
                            const index = projects.length - i;
                            const relativeOffset = index * PROJECT_STROKE_WIDTH * 2;
                            const offset = relativeOffset - PROJECT_STROKE_WIDTH * 2;
                            const size = PROJECT_ITEM_SIZE + (projects.length * PROJECT_STROKE_WIDTH) - PROJECT_STROKE_WIDTH - relativeOffset * 2;

                            return (
                                <div
                                    key={project.id}
                                    className={b('collapsed-item')}
                                    style={{
                                        top: offset,
                                        left: offset,
                                    }}
                                >
                                    <Progressbar
                                        color={project.color}
                                        percentage={project.percentage}
                                        size={size}
                                        strokeWidth={PROJECT_STROKE_WIDTH}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            <div
                className={b('toggle-button')}
                onClick={() => toggleExpanded(!expanded)}
            />
        </div>
    );
}
