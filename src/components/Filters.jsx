import React from "react";

const Filters = ({ setFilter, setSort, setCategory, categories }) => {
  return (
    <div className="flex space-x-4 mb-6 ">
      <select
        onChange={(event) => setFilter(event.target.value)}
        className="p-2 border border-gray-300 rounded bg-blue-400"
      >
        <option value="all">All Tasks</option>
        <option value="completed">Completed Tasks</option>
        <option value="pending">Pending Tasks</option>
      </select>

      <select
        onChange={(event) => setSort(event.target.value)}
        className="p-2 border border-gray-300 rounded bg-blue-400"
      >
        <option value="date">Sort by Date</option>
        <option value="priority">Sort by Priority</option>
      </select>

      <select
        onChange={(event) => setCategory(event.target.value)}
        className="p-2 border border-gray-300 rounded bg-blue-400"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
