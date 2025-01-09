import React from "react";

const Subtasks = ({ subtasks, addSubtask, deleteSubtask }) => {
  const handleAddSubtask = (event) => {
    event.preventDefault();
    const subtask = event.target.subtask.value;
    const taskId = event.target.taskId.value;
    if (subtask) {
      addSubtask({ id: Date.now(), text: subtask, taskId });
      event.target.reset();
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold">Subtasks</h3>
      <form onSubmit={handleAddSubtask} className="flex flex-col mb-4">
        <input
          type="text"
          name="subtask"
          placeholder="Add Subtask"
          className="p-2 mb-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Subtask
        </button>
      </form>

      <ul>
        {subtasks.map((subtask) => (
          <li key={subtask.id} className="flex justify-between items-center border-b py-2">
            <span>{subtask.text}</span>
            <button
              onClick={() => deleteSubtask(subtask.id)}
              className="text-red-500 ml-4 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subtasks;
