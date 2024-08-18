import React, {useEffect, useState} from 'react';
import {Task, TASK_ID, ViewMode, ViewTimeMode} from './types';
import './App.css';
import Index from "./components/Calendar/Month";
import CalendarWeek from "./components/Calendar/Week";
import Loading from "./components/Loader";

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: '8',
            duration: "00:30",
            tag: 'study',
            date: new Date().toISOString(),
            title: 'Synk: Сторис Авито',
            description: "",
            isDeleted: false,
        },

    ]);
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.TASKS);
    const [viewTimeMode, setViewTimeMode] = useState<ViewTimeMode>(ViewTimeMode.MONTH);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [className, setClassName] = useState<string>('appearance');

    const handleCreateTask = (newTask: Omit<Task, "id">) => {
        setTasks([...tasks, {...newTask, id: Math.random().toString()}]);
    };

    const handleDeleteTask = (taskId: TASK_ID) => {
        const deletedTask = tasks.filter(task => task.id === taskId)[0]
        setTasks([...tasks.filter(task => task.id !== taskId), {...deletedTask, isDeleted: true}]);
    };

    const handleEditTask = (task: Task) => {
        setTasks([...tasks.filter(oldTask => oldTask.id !== task.id), task]);

    };

    const [currentMonth, setCurrentMonth] = useState(new Date());

    const handlePrevMonth = () => {
        setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1));
    };

    const handleResetMonth = () => {
        setCurrentMonth(new Date());
    }

    const getStartOfWeek = (date: Date) => {
        const day = date.getDay();
        const diff = date.getDate() - (day === 0 ? 6 : day - 1);
        return new Date(date.setDate(diff));
    };

    const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));

    const handlePrevWeek = () => {
        setCurrentWeekStart(prevWeek => new Date(prevWeek.getFullYear(), prevWeek.getMonth(), prevWeek.getDate() - 7));
    };

    const handleNextWeek = () => {
        setCurrentWeekStart(prevWeek => new Date(prevWeek.getFullYear(), prevWeek.getMonth(), prevWeek.getDate() + 7));
    };

    const handleResetWeek = () => {
        setCurrentWeekStart(getStartOfWeek(new Date()));
    };

    const handleViewTimeSwitch = () => {
        if (viewTimeMode === ViewTimeMode.MONTH)
            setViewTimeMode(ViewTimeMode.WEEK);
        else {
            setViewTimeMode(ViewTimeMode.MONTH);
        }
    };
    const handleViewSwitch = () => {
        if (viewMode === ViewMode.TASKS)
            setViewMode(ViewMode.STATISTICS);
        else {
            setViewMode(ViewMode.TASKS);
        }
    };


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true)
        }, 0)
        setTimeout(()=>{setIsLoading(false)}, 5000)
    }, []);

    useEffect(() => {

        if (!isLoading) setClassName(`appearance appearance-show`)
        if (isLoading) setClassName(`appearance`)

    }, [isLoading]);

    return (
        <div className="App">
            {isLoading
                ? <Loading/>
                : <div className={className}>
                    <div>
                        <button
                            onClick={() => handleViewTimeSwitch()}>{viewTimeMode === ViewTimeMode.MONTH ? 'Week View' : 'Month View'}</button>
                        <button
                            onClick={() => handleViewSwitch()}>{viewMode === ViewMode.TASKS ? 'Statistics' : 'TasksDetails'}</button>
                        {viewTimeMode === ViewTimeMode.MONTH
                            ?
                            <button className="calendar-month-button" onClick={handleResetMonth}>Текущий месяц</button>
                            :
                            <button className="calendar-month-button" onClick={handleResetWeek}>Текущая неделя</button>}
                    </div>
                    {
                        viewTimeMode === ViewTimeMode.MONTH ?
                            <Index currentMonth={currentMonth}
                                   onPrevMonth={handlePrevMonth}
                                   onNextMonth={handleNextMonth}
                                   tasks={tasks.filter(task => !task.isDeleted).sort((taskA, taskB) => Number(taskB.id) - Number(taskA.id))}
                                   onEditTask={handleEditTask}
                                   onCreateTask={handleCreateTask}
                                   onDeleteTask={handleDeleteTask}
                                   viewMode={viewMode}

                            /> :
                            <CalendarWeek
                                currentWeekStart={currentWeekStart}
                                onPrevWeek={handlePrevWeek}
                                onNextWeek={handleNextWeek}
                                tasks={tasks.filter(task => !task.isDeleted).sort((taskA, taskB) => Number(taskB.id) - Number(taskA.id))}
                                onEditTask={handleEditTask}
                                onCreateTask={handleCreateTask}
                                onDeleteTask={handleDeleteTask}
                                viewMode={viewMode}
                            />
                    }
                </div>
            }
        </div>
    );
};

export default App;