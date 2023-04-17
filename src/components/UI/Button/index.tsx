import React from 'react';
import './button.css'

type IButton = {
    title: string;
    type: string;
    disabled: boolean;
    addTask: (text: string) => void;
    text: string;
}

export const Button: React.FC<IButton> = ({title, type, disabled, addTask, text}) => {
    return (
        <button
            className={`btn ${type}`}
            onClick={() => addTask(text)}
            disabled={disabled}
        >
            {title}
        </button>
    )
}

// className="btn primary"