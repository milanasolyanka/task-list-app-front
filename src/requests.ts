import axios from "axios";
import { ITask } from "./App";

export const fetchData = async (
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
) => {
  try {
    const response = await axios.get("http://localhost:3001/tasks");
    //console.log(response);
    setTasks(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const createTask = async (newID: number, newTaskText: string) => {
  try {
    const response = await axios.post("http://localhost:3001/tasks", {
      id: newID,
      taskText: newTaskText,
      isDone: false,
    });
    console.log("Created task:", response.data);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

export const updateTask = async (updatedTask: ITask) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/tasks/${updatedTask.id}`,
      updatedTask
    );
    console.log("Updated task:", response.data);
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/tasks/${taskId}`
    );
    console.log("Deleted task:", response.data);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
