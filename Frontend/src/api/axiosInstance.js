// import axios from "axios";
// import { getToken, removeToken } from "../utils/storage.js";

// const axiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL
// });

// axiosInstance.interceptors.request.use((config) => {
//     const token = getToken();
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             removeToken();
//             window.location.href = "/login";
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;

import axios from "axios";
import { getToken, removeToken } from "../utils/storage.js";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthRoute =
            error.config?.url?.includes("/auth/login") ||
            error.config?.url?.includes("/auth/register");

        if (error.response && error.response.status === 401 && !isAuthRoute) {
            removeToken();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;