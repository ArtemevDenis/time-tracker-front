import React, {useRef, useState} from 'react';
import './index.css';
import {Task, TASK_ID, ViewMode} from "../../../../types";
import TaskDetails from "../../../TasksDetails";
import {
    calculateTotalDuration,
    dayLongName,
    dayShortName,
    emptyTask, getDayTitle,
    leadZero,
    timeToDuration
} from "../../../../utils";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import useEscClick from "../../../../hooks/useEscClick";

interface CalendarDayCardProps {
    date: Date;
    tasks: Array<Task>
    viewMode: ViewMode,
    onClose: () => void;

    onCreateTask: (task: Omit<Task, 'id'>) => void;
    onDeleteTask: (taskId: TASK_ID) => void;
    onEditTask: (task: Task) => void;
}

const CalendarDayCard: React.FC<CalendarDayCardProps> = ({
                                                             date,
                                                             tasks,
                                                             viewMode,
                                                             onCreateTask,
                                                             onDeleteTask,
                                                             onEditTask,
                                                             onClose,
                                                         }) => {


    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef, onClose);
    useEscClick(onClose);


    const getTaskDetails = () => {
        return tasks.map((task) => (
            <TaskDetails key={task.id} task={task} onDeleteTask={onDeleteTask} onEditTask={onEditTask}/>
        ))
    }


    return (

        <div className="calendar-day-card-wrapper" ref={wrapperRef}>
            <div className="calendar-day-card-header">
                {getDayTitle(date, 'long')}
                {calculateTotalDuration(tasks)}
            </div>
            <div className="calendar-day-card-body">{getTaskDetails()}</div>
            <div className="calendar-day-card-footer">
                <button onClick={() => onCreateTask(emptyTask(date))}/>
            </div>
        </div>
        // </div>
    );
};

export default CalendarDayCard;
