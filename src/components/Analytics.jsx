import React from "react";

const Analytics = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const overdueTasks = tasks.filter(
    (task) => new Date(task.dueDate) < new Date() && !task.completed
  ).length;

  const tasksByCategory = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-4 bg-blue-500 rounded shadow mb-4">
      <h3 className="text-lg font-bold mb-2">Analytics</h3>
      <p>Total Tasks: {totalTasks}</p>
      <p>Completed Tasks: {completedTasks}</p>
      <p>Overdue Tasks: {overdueTasks}</p>
      <h4 className="font-bold mt-2">Tasks by Category:</h4>
      <ul>
        {Object.entries(tasksByCategory).map(([category, count]) => (
          <li key={category}>
            {category}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Analytics;
