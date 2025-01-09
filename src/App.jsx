import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";
import Subtasks from "./components/Subtasks";
import Analytics from "./components/Analytics";

const App = () => {
  
  const loadTasksFromLocalStorage = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return savedTasks;
  };

  const loadSubtasksFromLocalStorage = () => {
    const savedSubtasks = JSON.parse(localStorage.getItem("subtasks")) || [];
    return savedSubtasks;
  };

  const loadDarkModeFromLocalStorage = () => {
    return localStorage.getItem("theme") === "dark" || false;
  };

  const [tasks, setTasks] = useState(loadTasksFromLocalStorage());
  const [subtasks, setSubtasks] = useState(loadSubtasksFromLocalStorage());
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("date");
  const [currentTask, setCurrentTask] = useState(null);
  const [darkMode, setDarkMode] = useState(loadDarkModeFromLocalStorage());

  const categories = ["Personal", "Work", "Shopping", "Health", "Study"];

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("subtasks", JSON.stringify(subtasks));
  }, [tasks, subtasks]);

  const addTask = (task) => {
    const newTask = { ...task, id: Date.now(), completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const addSubtask = (newSubtask) => {
    setSubtasks((prevSubtasks) => [...prevSubtasks, newSubtask]);
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setCurrentTask(null);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, completed: !task.completed };
          return updatedTask;
        }
        return task;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const deleteSubtask = (id) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  const getFilteredTasks = () => {
    let filteredTasks = tasks;

    if (filter === "completed") {
      filteredTasks = tasks.filter((task) => task.completed);
    } else if (filter === "pending") {
      filteredTasks = tasks.filter((task) => !task.completed);
    }

    if (category !== "all") {
      filteredTasks = filteredTasks.filter((task) => task.category === category);
    }

    if (sort === "priority") {
      filteredTasks.sort((a, b) => (a.priority > b.priority ? -1 : 1));
    } else if (sort === "date") {
      filteredTasks.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
    }

    return filteredTasks;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">To-Do Application</h1>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded-full shadow focus:outline-none"
        >
          {darkMode ? (
            <FaSun className="w-6 h-6" />
          ) : (
            <FaMoon className="w-6 h-6" />
          )}
        </button>
      </div>
      <TaskForm addTask={addTask} editTask={editTask} currentTask={currentTask} />
      <Filters
        setFilter={setFilter}
        setSort={setSort}
        setCategory={setCategory}
        categories={categories}
      />
      <Analytics tasks={tasks} />
      <TaskList
        tasks={getFilteredTasks()}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        setCurrentTask={setCurrentTask}
      />
      <Subtasks subtasks={subtasks} addSubtask={addSubtask} deleteSubtask={deleteSubtask} />
    </div>
  );
};

export default App;
