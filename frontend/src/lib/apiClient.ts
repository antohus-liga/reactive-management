import * as axios from "axios";
import type {InternalAxiosRequestConfig} from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});
let isRefreshing = false;
let pendingQueue: {
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
    request: InternalAxiosRequestConfig;
}[] = [];

apiClient.interceptors.response.use(
    (res) => res,
    async error => {
        const originalRequest = error.config;
        const isAuthEndpoint =
            originalRequest.url?.includes("/api/auth/login") ||
            originalRequest.url?.includes("/api/auth/refresh") ||
            originalRequest.url?.includes("/api/auth/logout");

        if (
            (error.response?.status === 401 || error.response?.status === 403) &&
            !originalRequest._retry &&
            !isAuthEndpoint
        ) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    pendingQueue.push({ resolve, reject, request: originalRequest });
                });
            }

            isRefreshing = true;
            try {
                await apiClient.post("/api/auth/refresh");
                pendingQueue.forEach(({ resolve, request }) => resolve(apiClient(request)));
                pendingQueue = [];
                return apiClient(originalRequest);
            } catch (refreshError) {
                pendingQueue.forEach(({ reject }) => reject(refreshError)); // <-- reject the waiters too
                pendingQueue = [];
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
