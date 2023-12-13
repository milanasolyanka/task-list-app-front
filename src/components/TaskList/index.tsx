import React from "react";
import { ITask } from "../../App";
import { TaskCard } from "../TaskCard";
import "./task-list.css";

type ITaskList = {
  tasks: ITask[];
  changeStatusTask: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTaskText: string) => void;
};

export const TaskList: React.FC<ITaskList> = ({
  tasks,
  changeStatusTask,
  removeTask,
  editTask,
}) => {
  return (
    <div className="tsklist">
      {tasks.map((task) => (
        <TaskCard
          task={task}
          changeStatusTask={changeStatusTask}
          removeTask={removeTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
};
