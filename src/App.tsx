import React, { useState } from 'react';
import './App.css';
import { FormField } from './components/FormField';
import { TaskList } from './components/TaskList';
import { Checkbox } from './components/UI/Checkbox';

export type ITask = {
  id: number;
  taskText: string;
  isDone: boolean;
}

export const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([]);

  const addTask = (text: string) => {
    setTasks([...tasks, {
      id: Date.now(),
      taskText: text,
      isDone: false
    }])
    setText('')
  }
  const changeStatusTask = (id: number) => {
    setTasks(tasks.map((element) => {
      if (element.id !== id) return element;
      return {
        ...element,
        isDone: !element.isDone
      }
    }))
  }
  const removeTask = (id: number) => {
    setTasks(tasks.filter((element) => element.id !== id))
  }
  const editTask = (id: number, newTaskText: string) => {
    setTasks(tasks.map((element) => {
      if (element.id !== id) return element;
      return {
        ...element,
        taskText: newTaskText
      }
    }))
  }

  //[1,2,3,4].filter((element) => (element>2));
  //[1,2,3,4].map((element) => <div>{element}</div>);

  return (
    <div className="App">
      <FormField
        text={text}
        setText={setText}
        addTask={addTask}
      />
      <TaskList tasks={tasks} changeStatusTask={changeStatusTask} removeTask={removeTask} editTask={editTask}/>
    </div>
  );
}
//<Checkbox completion={false} text='bye' />
export default App;
