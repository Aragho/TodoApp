import React from "react";

const TaskList = ({ tasks, toggleTask, deleteTask, setCurrentTask }) => {
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      deleteTask(id);
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center p-4 border border-gray-300 rounded shadow"
        >
          <div>
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p>{task.description}</p>
            <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
            <p className="text-sm text-gray-600">Category: {task.category}</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => toggleTask(task.id)}
              className={`p-2 rounded ${
                task.completed ? "bg-green-500" : "bg-gray-500"
              } text-white`}
            >
              {task.completed ? "Completed" : "Mark as Completed"}
            </button>
            <button
              onClick={() => setCurrentTask(task)}
              className="p-2 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task.id)} 
              className="p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
