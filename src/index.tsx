import './index.scss';
import {
    DocumentItemStatusCategories,
    IDocumentItem,
    IUser,
    IWorkspace,
} from './index.types';

import React from 'react';
import {
    render,
} from 'react-dom';

import MainLayout from 'src/layouts/Main';

const DATA = {
    gallery: {
        image: {
            url: './behind-scenes-cover.png',
        },
    },
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
    } as IUser,
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

document.addEventListener('DOMContentLoaded', async () => {
    const mount = document.getElementById('mount');

    render((
        <MainLayout
            {...DATA}
        />
    ), mount);
});
