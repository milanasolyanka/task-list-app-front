import React from 'react';
import './checkbox.css'
import { ITask } from '../../../App';

type ICheckbox = {
    task: ITask;
    changeStatusTask: (id: number) => void;
}

export const Checkbox: React.FC<ICheckbox> = ({ task, changeStatusTask }) => {
    return (
        <input
            className='checkbox'
            type='checkbox'
            checked={task.isDone}
            onChange={() => changeStatusTask(task.id)}
        />
    )
}