import React from 'react';
import './form-field.css'
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

type IFormField = {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    addTask: (text: string) => void;
}

export const FormField: React.FC<IFormField> = ({text, setText, addTask}) => {
    return (
        <div>
            <Input
                text={text}
                setText={setText}
                placeholder='Enter task..'
            />
            <Button 
                addTask={addTask} 
                title='Add' 
                type='primary' 
                disabled={false} 
                text={text}
            />
        </div>
    )
}