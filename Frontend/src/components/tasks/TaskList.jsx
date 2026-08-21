import TaskCard from "./TaskCard.jsx";
import EmptyState from "../common/EmptyState.jsx";
import Loader from "../common/Loader.jsx";
import "./TaskList.css";

export default function TaskList({
  tasks,
  isLoading,
  isError,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <EmptyState message="Failed to load tasks. Please try again." />;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <EmptyState message="No tasks yet — click 'Add Task' to get started!" />
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}
