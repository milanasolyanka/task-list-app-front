import React from 'react';
import './input.css'

type IInput = {
    placeholder: string;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

export const Input: React.FC<IInput> = ({placeholder, text, setText}) => {
    return (
        <input
            className='inp'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
        />
    )
}