import Modal from "../common/Modal.jsx";
import TaskForm from "./TaskForm.jsx";
import { useCreateTask, useUpdateTask } from "../../hooks/useTasks.js";

export default function TaskModal({ isOpen, onClose, task }) {
  const isEditMode = Boolean(task);

  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  async function handleSubmit(formData) {
    const payload = {
      ...formData,
      dueDate: formData.dueDate || null,
    };

    try {
      if (isEditMode) {
        await updateMutation.mutateAsync({ id: task._id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      onClose();
    } catch {
      // error toast already handled inside the mutation hooks (useTasks.js)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Task" : "Add Task"}
    >
      <TaskForm
        initialData={task}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}
