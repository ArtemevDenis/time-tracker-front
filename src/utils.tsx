import {TAG, Task} from "./types";
import React from "react";

export const leadZero = (line: string): string => {
    return line.length === 1 ? '0' + line : line;
}

export const dayShortName = (date: Date) => date.toLocaleDateString('ru-RU', {weekday: 'short'});
export const dayLongName = (date: Date) => date.toLocaleDateString('ru-RU', {weekday: 'long'});

export const timeToDuration = (time: string): number => {
    const [hours, min] = time.split(':')
    return Number(hours) + Number(min) / 60;
}

export const emptyTask = (date: Date): Omit<Task, 'id'> => {
    return {description: "", date: date.toISOString(), duration: '00:00', tag: TAG.STUDY, title: "", isDeleted: false}
}


export const calculateTotalDuration = (tasks: Task[]) => {
    let durationInHours = tasks.reduce((acc, task) => task.duration !== '00:00' ? acc + timeToDuration(task.duration) : acc, 0).toFixed(2)
    if (durationInHours[durationInHours.length - 1] === '0') {
        durationInHours = durationInHours.slice(0, -1);
    }
    return durationInHours === '0.0' ? '' : <span className="duration">{durationInHours}</span>
}

export const getDayTitle = (date: Date, type: 'short' | 'long') => {
    switch (type) {
        case 'short':
            return <span
                className="date">{leadZero(date.getDate().toString()) + '.' + leadZero((date.getMonth() + 1).toString()) + ', ' + dayShortName(date)}</span>

        case "long":
            return <span
                className="date">{leadZero(date.getDate().toString()) + '.' + leadZero((date.getMonth() + 1).toString()) + ', ' + dayLongName(date)}</span>
    }

}