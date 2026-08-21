import StatusBadge from "./StatusBadge.jsx";
import { formatDate } from "../../utils/formatDate.js";
import "./TaskCard.css";

const PRIORITY_LABELS = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  const isCompleted = task.status === "completed";

  function handleCheckboxChange() {
    const nextStatus = isCompleted ? "pending" : "completed";
    onToggleStatus(task._id, nextStatus);
  }

  return (
    <div className={`task-card ${isCompleted ? "task-card-completed" : ""}`}>
      <div className="task-card-top">
        <input
          type="checkbox"
          className="task-card-checkbox"
          checked={isCompleted}
          onChange={handleCheckboxChange}
          aria-label="Toggle task completed"
        />
        <h4 className="task-card-title">{task.title}</h4>
      </div>

      {task.description && (
        <p className="task-card-description">{task.description}</p>
      )}

      <div className="task-card-meta">
        <StatusBadge status={task.status} />
        <span
          className={`task-card-priority task-card-priority-${task.priority}`}
        >
          {PRIORITY_LABELS[task.priority]} Priority
        </span>
        {task.dueDate && (
          <span className="task-card-due-date">
            Due {formatDate(task.dueDate)}
          </span>
        )}
      </div>

      <div className="task-card-actions">
        <button className="task-card-edit-btn" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="task-card-delete-btn" onClick={() => onDelete(task)}>
          Delete
        </button>
      </div>
    </div>
  );
}
