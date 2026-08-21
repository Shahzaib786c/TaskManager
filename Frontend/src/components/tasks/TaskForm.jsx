import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import "./TaskForm.css";

const schema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .max(100, "Max 100 characters"),
  description: yup.string().trim().max(500, "Max 500 characters"),
  status: yup
    .string()
    .oneOf(["pending", "in-progress", "completed"])
    .required(),
  priority: yup.string().oneOf(["low", "medium", "high"]).required(),
  dueDate: yup.string().nullable(),
});

const defaultValues = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: "",
};

export default function TaskForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "pending",
        priority: initialData.priority || "medium",
        dueDate: initialData.dueDate ? initialData.dueDate.slice(0, 10) : "",
      });
    } else {
      reset(defaultValues);
    }
  }, [initialData, reset]);

  return (
    <form className="task-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="task-form-group">
        <label className="task-form-label">Title</label>
        <input
          className="task-form-input"
          placeholder="e.g. Finish project report"
          {...register("title")}
        />
        {errors.title && (
          <p className="task-form-error">{errors.title.message}</p>
        )}
      </div>

      <div className="task-form-group">
        <label className="task-form-label">Description</label>
        <textarea
          className="task-form-textarea"
          placeholder="Optional details..."
          rows={3}
          {...register("description")}
        />
        {errors.description && (
          <p className="task-form-error">{errors.description.message}</p>
        )}
      </div>

      <div className="task-form-row">
        <div className="task-form-group">
          <label className="task-form-label">Status</label>
          <select className="task-form-select" {...register("status")}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="task-form-group">
          <label className="task-form-label">Priority</label>
          <select className="task-form-select" {...register("priority")}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="task-form-group">
        <label className="task-form-label">Due Date</label>
        <input
          className="task-form-input"
          type="date"
          {...register("dueDate")}
        />
      </div>

      <div className="task-form-actions">
        <button
          type="button"
          className="task-form-cancel-btn"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="task-form-submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Task"}
        </button>
      </div>
    </form>
  );
}
