import React, { useState } from 'react';
import { ITask } from '../../App';
import { Checkbox } from '../UI/Checkbox';
import './task-card.css'
import { Button } from '../UI/Button';

type ITaskCard = {
    task: ITask;
    changeStatusTask: (id: number) => void;
    removeTask: (id: number) => void
    editTask: (id: number, newTaskText: string) => void
}

export const TaskCard: React.FC<ITaskCard> = ({ task, changeStatusTask, removeTask, editTask }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [updatedText, setUpdatedText] = useState<string>(task.taskText);
    const updateText = () => {
        if (updatedText !== '') editTask(task.id, updatedText);
        else removeTask(task.id);
        setIsEdit(false);
    }

    return (
        <div className='tskcard'>
            <Checkbox task={task} changeStatusTask={changeStatusTask} />
            {
                isEdit
                    ? <input
                        autoFocus={true}
                        className='card-input'
                        value={updatedText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                        onBlur={updateText}
                    />
            : <div className='card-text' onDoubleClick={() => setIsEdit(true)}>{task.taskText}</div>
            }
            <button className='del-button' onClick={() => removeTask(task.id)}>X</button>
        </div>
    )
}