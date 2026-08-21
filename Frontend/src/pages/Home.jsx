import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import {
  useTasksQuery,
  useDeleteTask,
  useToggleStatus,
} from "../hooks/useTasks.js";
import TaskFilterBar from "../components/tasks/TaskFilterBar.jsx";
import TaskList from "../components/tasks/TaskList.jsx";
import TaskModal from "../components/tasks/TaskModal.jsx";
import ConfirmDialog from "../components/common/ConfirmDialog.jsx";
import "./Home.css";

export default function Home() {
  const { user } = useAuth();

  const [filters, setFilters] = useState({});
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const { data, isLoading, isError } = useTasksQuery(filters);
  const deleteMutation = useDeleteTask();
  const toggleStatusMutation = useToggleStatus();

  function handleOpenAddModal() {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  }

  function handleOpenEditModal(task) {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  }

  function handleCloseTaskModal() {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  }

  function handleOpenDeleteConfirm(task) {
    setTaskToDelete(task);
  }

  function handleCloseDeleteConfirm() {
    setTaskToDelete(null);
  }

  async function handleConfirmDelete() {
    try {
      await deleteMutation.mutateAsync(taskToDelete._id);
      setTaskToDelete(null);
    } catch {
      // error toast already handled inside useDeleteTask (useTasks.js)
    }
  }

  function handleToggleStatus(id, status) {
    toggleStatusMutation.mutate({ id, status });
  }

  return (
    <div className="home-page">
      <div className="home-header">
        <div>
          <h2 className="home-heading">My Tasks</h2>
          <p className="home-subheading">Welcome back, {user?.name}</p>
        </div>
        <button className="home-add-btn" onClick={handleOpenAddModal}>
          + Add Task
        </button>
      </div>

      <TaskFilterBar onFilterChange={setFilters} />

      <TaskList
        tasks={data?.data}
        isLoading={isLoading}
        isError={isError}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteConfirm}
        onToggleStatus={handleToggleStatus}
      />

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseTaskModal}
        task={editingTask}
      />

      <ConfirmDialog
        isOpen={Boolean(taskToDelete)}
        onClose={handleCloseDeleteConfirm}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        isConfirming={deleteMutation.isPending}
      />
    </div>
  );
}
