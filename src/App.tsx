import React, { useState, useEffect } from "react";
import "./App.css";
import { FormField } from "./components/FormField";
import { TaskList } from "./components/TaskList";
import { fetchData, createTask, deleteTask, updateTask } from "./requests";
import RegistrationModal from "./components/RegistrationForm";
import LoginModal from "./components/LoginForm";
import Chat from "./components/Chat";

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

  const [isRegistrationFormOpen, setRegistrationFormOpen] = useState(false);
  const [isLoginFormOpen, setLoginFormOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  const [isChatOpen, setChatOpen] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);

  const openRegistrationForm = () => {
    setRegistrationFormOpen(true);
    setLoginFormOpen(false);
  };

  const openLoginForm = () => {
    setLoginFormOpen(true);
    setRegistrationFormOpen(false);
  };

  const closeAuthForms = () => {
    setRegistrationFormOpen(false);
    setLoginFormOpen(false);
  };

  const handleLogin = (token: string, email: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email); // Сохраняем email в localStorage
    setLoggedIn(true);
    console.log("Токен и email сохранены в локальном хранилище");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    console.log("Токен удален из локального хранилища");
  };

  const openChat = () => {
    setChatOpen(true);
    setIsOverlayActive(true); // Активировать затемнение фона
  };

  const closeChat = () => {
    setChatOpen(false);
    setIsOverlayActive(false); // Деактивировать затемнение фона
  };

  return (
    <div className="App">
      <div className="header">
        <div className="auth-buttons">
          {!isLoggedIn ? (
            <>
              <button onClick={openRegistrationForm}>Регистрация</button>
              <button onClick={openLoginForm}>Войти</button>
            </>
          ) : (
            <>
              <button onClick={openChat}>Чат</button>
              <button onClick={handleLogout}>Выйти</button>
            </>
          )}
        </div>
      </div>
      {isLoggedIn && (
        <FormField text={text} setText={setText} addTask={addTask} />
      )}
      <TaskList
        tasks={tasks}
        changeStatusTask={changeStatusTask}
        removeTask={removeTask}
        editTask={editTask}
      />

      <div
        className={`overlay ${
          isRegistrationFormOpen || isLoginFormOpen ? "active" : ""
        }`}
        onClick={closeAuthForms}
      ></div>

      {isChatOpen && (
        <>
          <div
            className={`overlay ${isOverlayActive ? "active" : ""}`}
            onClick={closeChat}
          ></div>

          <Chat
            username={localStorage.getItem("email") || ""}
            onClose={closeChat}
          />
        </>
      )}

      <div className={`modal ${isRegistrationFormOpen ? "active" : ""}`}>
        <RegistrationModal onClose={closeAuthForms} onLogin={handleLogin} />
      </div>

      <div className={`modal ${isLoginFormOpen ? "active" : ""}`}>
        <LoginModal onClose={closeAuthForms} onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default App;
