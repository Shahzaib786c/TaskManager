import axiosInstance from "./axiosInstance.js";

export async function getTasks(params) {
    const res = await axiosInstance.get("/tasks", { params });
    return res.data;
}

export async function getTask(id) {
    const res = await axiosInstance.get(`/tasks/${id}`);
    return res.data;
}

export async function createTask(data) {
    const res = await axiosInstance.post("/tasks", data);
    return res.data;
}

export async function updateTask(id, data) {
    const res = await axiosInstance.put(`/tasks/${id}`, data);
    return res.data;
}

export async function updateTaskStatus(id, status) {
    const res = await axiosInstance.patch(`/tasks/${id}/status`, { status });
    return res.data;
}

export async function deleteTask(id) {
    const res = await axiosInstance.delete(`/tasks/${id}`);
    return res.data;
}