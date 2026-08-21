import axiosInstance from "./axiosInstance.js";

export async function registerUser(data) {
    const res = await axiosInstance.post("/auth/register", data);
    return res.data;
}

export async function loginUser(data) {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data;
}

export async function getMe() {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
}