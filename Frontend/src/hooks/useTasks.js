import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus
} from "../api/taskService.js";

export function useTasksQuery(filters) {
    return useQuery({
        queryKey: ["tasks", filters],
        queryFn: () => getTasks(filters)
    });
}

export function useCreateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => createTask(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            toast.success("Task added successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to add task");
        }
    });
}

export function useUpdateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateTask(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            toast.success("Task updated successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update task");
        }
    });
}

export function useDeleteTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteTask(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            toast.success("Task deleted");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete task");
        }
    });
}

export function useToggleStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }) => updateTaskStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            toast.success("Status updated");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    });
}