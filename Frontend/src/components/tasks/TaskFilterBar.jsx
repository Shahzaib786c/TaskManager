import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce.js";
import "./TaskFilterBar.css";

export default function TaskFilterBar({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    onFilterChange({
      search: debouncedSearch || undefined,
      status: status || undefined,
      priority: priority || undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, status, priority]);

  return (
    <div className="task-filter-bar">
      <input
        className="task-filter-search"
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="task-filter-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        className="task-filter-select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}
