import React, {useEffect, useRef, useState} from "react";
import {TAG, Task, TASK_ID} from "../../types";
import './index.css'
import ContextMenu from "../common/ContextMenu";
import {useDebounce} from "use-debounce";


interface TaskDetailsProps {
    task: Task;

    onDeleteTask: (taskId: TASK_ID) => void;
    onEditTask: (task: Task) => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
                                                     task,
                                                     onEditTask,
                                                     onDeleteTask,
                                                 }) => {

    const [t, setTask] = useState<Task>({
        ...task
    });

    const [value] = useDebounce(t, 500);


    useEffect(() => {
        onEditTask(value)
    }, [value]);

    const ref = useRef(null);

    const [isMenuShown, setIsMenuShown] = useState(false);

    const menu = <button className="delete-button" onClick={() => onDeleteTask(task.id)}>Удалить</button>
    return (
        <div className="task-container" ref={ref}>
                <ContextMenu
                    isOpenAfterInteraction={false}
                    trigger={ref}
                    component={menu}
                    isOpen={isMenuShown}
                    setIsOpen={setIsMenuShown}
                    style={undefined} className={undefined}/>
                <input
                    type="text"
                    placeholder="Название"
                    value={t.title}
                    onChange={e => setTask({...t, title: e.target.value})}
                />
                <input
                    type="time"
                    placeholder="0"
                    value={t.duration}
                    onChange={e => setTask({...t, duration: e.target.value})}
                />
                <select
                    value={t.tag}
                    name="tag"
                    id="tag"
                    onChange={e => setTask({...t, tag: e.target.value})}
                >
                    {Object.keys(TAG).map(tag =>
                        // @ts-ignore
                        <option value={tag}>{TAG[tag]}</option>
                    )}
                </select>
                <input
                    type="text"
                    placeholder="Описание"
                    value={t.description}
                    onChange={e => setTask({...t, description: e.target.value})}
                />
        </div>
    );
};

export default TaskDetails;
