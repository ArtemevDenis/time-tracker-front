export interface Task {
    id: TASK_ID;
    tag: string;
    title: string;
    duration: string; // in minutes
    date: string; // ISO 8601 format
    description: string;
    isDeleted: boolean;
}

export interface DaySummary {
    date: string;
    tags: Record<string, number>; // tag -> total time spent
}

export interface WeekSummary {
    weekStart: string;
    tags: Record<string, number>;
}

export interface MonthSummary {
    monthStart: string;
    tags: Record<string, number>;
}

export enum ViewTimeMode {
    WEEK = 'week',
    MONTH = 'month',
}
export enum ViewMode {
    TASKS = 'tasks',
    STATISTICS = 'statistics',
}

export enum TAG {
    STUDY = 'study',
    MEET = 'meet',
    DEPLOY = 'deploy',
    COMMON = 'common',
    COMMUNICATION = 'communication',
    LAYOUT = 'layout',
}

export const TAGS = {
    [TAG.STUDY]: {color: "#123123"},
    [TAG.MEET]: {color: "#638392"},
    [TAG.DEPLOY]: {color: "#383040"},
    [TAG.COMMON]: {color: "#273892"},
    [TAG.COMMUNICATION]: {color: '#112333'},
    [TAG.LAYOUT]: {color: '#111111'}
};

export type TASK_ID = string