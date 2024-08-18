import React from 'react';
import {Task, TASK_ID, ViewMode} from "../../../types";
import CalendarDay from "../Day";
import './index.css'

interface CalendarWeekProps {
    currentWeekStart: Date;
    onPrevWeek: () => void;
    onNextWeek: () => void;

    viewMode: ViewMode;
    tasks: Task[];

    onCreateTask: (task: Omit<Task, "id">) => void;
    onDeleteTask: (taskId: TASK_ID) => void;
    onEditTask: (task: Task) => void;

}

const CalendarWeek: React.FC<CalendarWeekProps> = ({
                                                       currentWeekStart,
                                                       viewMode,
                                                       onPrevWeek,
                                                       onNextWeek,
                                                       tasks,
                                                       onDeleteTask,
                                                       onEditTask,
                                                       onCreateTask
                                                   }) => {
    const getWeekDays = (startDate: Date) => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startDate);
            day.setDate(startDate.getDate() + i);
            days.push(day);
        }
        return days;
    };

    const tasksForDay = (day: Date) => {
        return tasks.filter(task => new Date(task.date).toDateString() === day.toDateString());
    };

    const weekDays = getWeekDays(currentWeekStart);

    return (
        <div className="calendar-week">
            <div className="calendar-navigation">
                <button onClick={onPrevWeek}>←</button>
                <span>
          {currentWeekStart.toLocaleDateString('default', {month: 'long', day: 'numeric'})} -{' '}
                    {weekDays[6].toLocaleDateString('default', {month: 'long', day: 'numeric'})}
        </span>
                <button onClick={onNextWeek}>→</button>
            </div>
            <div className="calendar-header">
                <span>Понедельник</span>
                <span>Вторник</span>
                <span>Среда</span>
                <span>Четверг</span>
                <span>Пятница</span>
                <span>Суббота</span>
                <span>Воскресение</span>
            </div>
            <div className="calendar-week-days">
                {weekDays.map((day, index) => (
                    <CalendarDay
                        key={day.getDate()}
                        tasks={tasksForDay(day)}
                        date={day}
                        isWeekend={index === 5 || index === 6}
                        viewMode={viewMode}
                        onDeleteTask={onDeleteTask}
                        onCreateTask={onCreateTask}
                        onEditTask={onEditTask}
                        style={{maxHeight: 100 + "%"}}
                    />
                ))}
            </div>
        </div>
    );
};

export default CalendarWeek;
