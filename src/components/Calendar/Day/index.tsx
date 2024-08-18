import React, {CSSProperties, useEffect, useState} from 'react';
import {Task, TASK_ID, ViewMode} from "../../../types";
import './index.css'
import {calculateTotalDuration, dayShortName, getDayTitle, leadZero, timeToDuration} from "../../../utils";
import CalendarDayCard from "./Card";

interface CalendarDayProps {
    date: Date;
    tasks: Task[];
    isWeekend: boolean;
    onCreateTask: (task: Omit<Task, 'id'>) => void;
    onDeleteTask: (taskId: TASK_ID) => void;
    onEditTask: (task: Task) => void;
    viewMode: ViewMode;
    style?: CSSProperties;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
                                                     date,
                                                     tasks,
                                                     onCreateTask,
                                                     onDeleteTask,
                                                     onEditTask,
                                                     isWeekend,
                                                     viewMode,
                                                     style
                                                 }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [className, setClassName] = useState<string>('calendar-day-card-container popup');


    const openPopupForCreate = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const tagsView = () => {
        const tags: { [key: string]: { tag: string, duration: number } } = {}
        tasks.forEach(task => {
            if (!tags[task.tag]) {
                tags[task.tag] = {tag: task.tag, duration: timeToDuration(task.duration)};
            } else {
                tags[task.tag].duration += timeToDuration(task.duration);
            }
        })


        return Array.from(Object.values(tags))
            .sort((itemA, itemB) => itemB.duration - itemA.duration)
            .map((tag) => {
                return (<div key={tag.tag} className="task-item">
                    <p>{tag.tag} - {tag.duration}</p>
                </div>)
            })
    }

    const taskView = () => {
        return tasks.map((task) => (
            <div key={task.id} className="task-item">
                <p>{task.title}</p>
            </div>
        ))
    }

    useEffect(() => {

        if (!isPopupOpen) setClassName(`calendar-day-card-container popup `)
        if (isPopupOpen) setClassName(`calendar-day-card-container popup popup-open`)

    }, [isPopupOpen]);

    return (
        <>
            <div className={`calendar-day-card ${isWeekend ? 'weekend' : ''}`} onClick={openPopupForCreate}
                 style={style}>
                <div className="calendar-day-header">
                    {getDayTitle(date, 'short')}
                    {calculateTotalDuration(tasks)}
                </div>
                <div className="tasks-list">
                    {
                        viewMode === ViewMode.TASKS
                            ? taskView()
                            : tagsView()
                    }
                </div>
            </div>
            {/*{isPopupOpen && (*/}
                <div className={className}>
                    <CalendarDayCard
                    date={date}
                    tasks={tasks}
                    onDeleteTask={onDeleteTask}
                    onEditTask={onEditTask}
                    onCreateTask={onCreateTask}
                    onClose={closePopup}
                    viewMode={viewMode}
                />
                </div>
            {/*)}*/}
        </>
    );
};

export default CalendarDay;
