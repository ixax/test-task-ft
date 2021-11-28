export interface IUser {
    avatar: {
        url: string;
    };
}

export interface IWorkspace {
    id: string;
    logo: {
        url: string;
    };
    notifications: {
        count: number;
    },
    isActive: boolean;
}

export enum DocumentItemStatusCategories {
    Draft = 'draft',
    Done = 'done',
    Review = 'review',
}

export interface IStatus {
    name: string;
    category: DocumentItemStatusCategories;
}

export interface IDocumentItem {
    id: string;
    icon: {
        url: string;
    };
    name: string;
    updatedAt: string; // Should be Date, but idc, that's just test case
    status: IStatus;
}

export interface IEvent {
    id: string;
    startAt: string; // Should be Date, but idc, that's just test case
}
