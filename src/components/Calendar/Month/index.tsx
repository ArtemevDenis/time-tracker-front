import React from 'react';
import {Task, TASK_ID, ViewMode} from "../../../types";
import CalendarDay from "../Day";
import './index.css'


interface CalendarMonthProps {
    currentMonth: Date;
    tasks: Task[];
    viewMode: ViewMode;
    onPrevMonth: () => void;
    onNextMonth: () => void;

    onCreateTask: (task: Omit<Task, "id">) => void;
    onDeleteTask: (taskId: TASK_ID) => void;
    onEditTask: (task: Task) => void;
}

const Index: React.FC<CalendarMonthProps> = ({
                                                         currentMonth,
                                                         viewMode,
                                                         onPrevMonth,
                                                         onNextMonth,
                                                         tasks,
                                                         onEditTask,
                                                         onDeleteTask,
                                                         onCreateTask
                                                     }) => {
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const numDays = new Date(year, month + 1, 0).getDate();
        return Array.from({length: numDays}, (_, i) => i + 1);
    };

    const getFirstDayOfMonth = (date: Date) => {
        let day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return day === 0 ? 6 : day - 1; // Adjust to make Monday the first day
    };

    const tasksForDay = (day: Date) => {
        return tasks.filter(task => new Date(task.date).toDateString() === day.toDateString());
    };

    const days = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);

    const weeks = [];
    let week: JSX.Element[] = [];
    for (let i = 0; i < firstDay; i++) {
        week.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    days.forEach((day, index) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const isWeekend = (firstDay + index) % 7 === 5 || (firstDay + index) % 7 === 6;
        week.push(
            <CalendarDay
                tasks={tasksForDay(date)}
                date={date}
                isWeekend={isWeekend}
                onCreateTask={onCreateTask}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
                viewMode={viewMode}
            />
        );

        if ((firstDay + day) % 7 === 0) {
            weeks.push(<div key={`week-${weeks.length}`} className="calendar-month-week">{week}</div>);
            week = [];
        }
    });

    if (week.length > 0) {
        weeks.push(<div key={`week-${weeks.length}`} className="calendar-month-week">{week}</div>);
    }

    const monthYear = currentMonth.toLocaleDateString('default', {month: 'long', year: 'numeric'});

    return (
        <div className="calendar-month">
            <div className="calendar-navigation">
                <button onClick={onPrevMonth}>←</button>
                <span>{monthYear}</span>
                <button onClick={onNextMonth}>→</button>
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
            {weeks}
        </div>
    );
};

export default Index;
