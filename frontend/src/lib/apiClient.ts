import * as axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});

let isRefreshing = false;
let pendingQueue: (() => void)[] = [];

apiClient.interceptors.response.use(
    (res) => res,
    async error => {
        const originalRequest = error.config;

        const isAuthEndpoint =
            originalRequest.url?.includes("/api/auth/login") ||
            originalRequest.url?.includes("/api/auth/refresh") ||
            originalRequest.url?.includes("/api/auth/logout");

        // if status code = 401, retry once per request
        if (error.response?.status === 403 && !originalRequest._retry && !isAuthEndpoint) {
            originalRequest._retry = true;

            if (isRefreshing) {
                // if a refresh is already happening, add request to the queue
                return new Promise((resolve) => {
                    pendingQueue.push(() => resolve(apiClient(originalRequest)));
                });
            }

            isRefreshing = true; // flag the refresh, so other requests don't request a refresh again
            try {
                await apiClient.post("/api/auth/refresh"); // requests a token refresh with the refresh token cookie
                pendingQueue.forEach((cb) => cb()); // calls pending requests if refresh is successful
                pendingQueue = [];
                return apiClient(originalRequest); // retry the first failed request
            } catch (refreshError) {
                pendingQueue = []; // cancel requests if the token refresh failed
                window.location.href = "/signin";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false; // terminate the refresh process
            }
        }

        return Promise.reject(error); // if the status code != 401 or if it's a retry, just fail
    }
)