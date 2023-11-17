import React, { useState, useEffect } from "react";
import "./App.css";
import { FormField } from "./components/FormField";
import { TaskList } from "./components/TaskList";
import { fetchData, createTask, deleteTask, updateTask } from "./requests";

export type ITask = {
  id: number;
  taskText: string;
  isDone: boolean;
};

export const App: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    fetchData(setTasks);
  }, []);

  const addTask = (text: string) => {
    if (text !== "") {
      var newID = Date.now();
      setTasks([
        ...tasks,
        {
          id: newID,
          taskText: text,
          isDone: false,
        },
      ]);
      createTask(newID, text);
    }
    setText("");
  };

  const removeTask = (id: number) => {
    deleteTask(id);
    setTasks(tasks.filter((element) => element.id !== id));
  };

  const changeStatusTask = (id: number) => {
    setTasks(
      tasks.map((element) => {
        if (element.id !== id) return element;
        updateTask({
          id: element.id,
          taskText: element.taskText,
          isDone: !element.isDone,
        });
        return {
          ...element,
          isDone: !element.isDone,
        };
      })
    );
  };

  const editTask = (id: number, newTaskText: string) => {
    setTasks(
      tasks.map((element) => {
        if (element.id !== id) return element;
        updateTask({
          id: element.id,
          taskText: newTaskText,
          isDone: !element.isDone,
        });
        return {
          ...element,
          taskText: newTaskText,
        };
      })
    );
  };

  //[1,2,3,4].filter((element) => (element>2));
  //[1,2,3,4].map((element) => <div>{element}</div>);

  return (
    <div className="App">
      <FormField text={text} setText={setText} addTask={addTask} />
      <TaskList
        tasks={tasks}
        changeStatusTask={changeStatusTask}
        removeTask={removeTask}
        editTask={editTask}
      />
    </div>
  );
};
//<Checkbox completion={false} text='bye' />
export default App;
