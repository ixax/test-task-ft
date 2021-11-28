import React from "react";
import {
    DocumentItemStatusCategories,
    IDocumentItem,
    IEvent,
    IProject,
    IUser,
    IWorkspace,
    UserContactTypes
} from "./index.types";

export default {
    documents: {
        items: [
            {
                id: '1',
                icon: {
                    url: './documents/service-agreement.svg',
                },
                name: 'Service Agreement',
                updatedAt: '32 minutes ago',
                status: {
                    name: 'final',
                    category: DocumentItemStatusCategories.Done,
                },
            },
            {
                id: '2',
                icon: {
                    url: './documents/brancd-strategy.svg',
                },
                name: 'Brand Strategy',
                updatedAt: '2 hours ago',
                status: {
                    name: 'draft',
                    category: DocumentItemStatusCategories.Draft,
                },
            },
            {
                id: '3',
                icon: {
                    url: './documents/service-agreement.svg',
                },
                name: 'Service Agreement',
                updatedAt: '5 hours ago',
                status: {
                    name: 'draft',
                    category: DocumentItemStatusCategories.Draft,
                },
            },
        ] as IDocumentItem[],
        total: {
            count: 10,
        },
    },
    events: {
        items: [{
            id: '1',
            startAt: 'In 43 min',
        }] as IEvent[],
        total: {
            count: 8,
        },
    },
    gallery: {
        image: {
            url: './behind-scenes-cover.png',
        },
    },
    manager: {
        avatar: {
            url: './avatar2.png',
        },
        name: 'Sarah Smith',
        contacts: [
            {
                type: UserContactTypes.Slack,
                value: 'U100500',
            },
            {
                type: UserContactTypes.Email,
                value: 'user@example.com',
            },
        ],
    } as IUser,
    projects: {
        pendingReviews: {
            count: 2,
        },
        projects: [
            {
                id: '1',
                name: 'Project 1',
                percentage: 30,
                daysLeft: 42,
                color: '#ffa800',
            },
            {
                id: '2',
                name: 'Project 2',
                percentage: 65,
                daysLeft: 13,
                color: '#fe5b81',
            },
            {
                id: '3',
                name: 'Project 3',
                percentage: 90,
                daysLeft: 3,
                color: '#32dbbb',
            },
            {
                id: '4',
                name: 'Project 4',
                percentage: 25,
                daysLeft: 18,
                color: '#674df6',
            },
            {
                id: '5',
                name: 'Project 5',
                percentage: 75,
                daysLeft: 8,
                color: '#4dacf6',
            },
        ] as IProject[],
    },
    reviews: {
        items: [{
            id: '1',
            icon: {
                url: './runner.png',
            },
            name: 'Reel',
            updatedAt: '3 hours ago',
            status: {
                name: 'needs review',
                category: DocumentItemStatusCategories.Review,
            },
        }] as IDocumentItem[],
        total: {
            count: 3,
        },
    },
    user: {
        avatar: {
            url: './avatar.png',
        },
    } as Partial<IUser>,
    welcome: {
        title: 'Happy Tuesday, Lily.',
        text: (
            <p>
                Lorem ipsum dolor sit amet, dicam diceret molestiae in his.
                Eum putent possit ea. Ex mei <strong>discere</strong> feugiat, pri ex nisl delicata sapientem, quod bonorum appetere te per. Offendit dissentiunt at nam, <strong>ea has</strong> illud dolore deseruisse.
            </p>
        ),
    },
    workspaces: [
        {
            id: '0',
            logo: {
                url: './workspaces/wk-plus.png',
            },
            notifications: {
                count: 1,
            },
            isActive: true,
        },
        {
            id: '1',
            logo: {
                url: './workspaces/asd.png',
            },
            notifications: {
                count: 0,
            },
        },
    ] as IWorkspace[],
};
