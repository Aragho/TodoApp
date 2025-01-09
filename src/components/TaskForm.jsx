import React, { useState, useEffect } from "react";

const TaskForm = ({ addTask, editTask, currentTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [category, setCategory] = useState("Personal");
  const [recurring, setRecurring] = useState("");

  const categories = ["Personal", "Work", "Shopping", "Health", "Study"];

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setDueDate(currentTask.dueDate);
      setPriority(currentTask.priority);
      setCategory(currentTask.category); 
      setRecurring(currentTask.recurring);
    }
  }, [currentTask]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const taskData = {
      title,
      description,
      dueDate,
      priority,
      category,  
      recurring,
    };

    if (currentTask) {
      editTask({ ...taskData, id: currentTask.id });
    } else {
      addTask(taskData);
    }

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("low");
    setCategory("Personal");
    setRecurring("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="p-2 border border-gray-300 rounded"
        ></textarea>
        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {currentTask ? "Edit Task" : "Add Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
