import {apiClient} from "@/lib/apiClient.ts";

export interface SignInPayload {
    email: string;
    password: string;
}

export interface UserResponse {
    publicId: string;
    companyName: string;
    companyType: string;
    taxId: string;
    phoneNumber: string;
    email: string;
    country: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

export const authApi = {
    signIn: (payload: SignInPayload) =>
        apiClient.post("/api/auth/login", payload).then((r) => r.data),
    me: () =>
        apiClient.get<UserResponse>("api/auth/me").then((r) => r.data),
    logout: () => apiClient.post("/api/auth/logout"),
}