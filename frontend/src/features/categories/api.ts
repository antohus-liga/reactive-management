import {apiClient} from "@/lib/apiClient.ts";
import type {CategoryType} from "@/types/CategoryType.ts";

export interface CategoryResponse {
    publicId: string;
    name: string;
    colorHex: string;
    types: CategoryType[];
    createdAt: string;
    updatedAt: string;
}

export interface CategoryRequest {
    name: string;
    colorHex: string;
    types: CategoryType[];
}

export const categoryApi = {
    get:
        () => apiClient.get<CategoryResponse[]>("/api/categories").then((r) => r.data),
    create:
        (payload: CategoryRequest) => apiClient.post("/api/categories", payload).then((r) => r.data),
    update:
        (publicId: string, payload: CategoryRequest) => apiClient.put(`/api/categories/${publicId}`, payload).then((r) => r.data),
    delete:
        (publicId: string) => apiClient.delete(`/api/categories/${publicId}`),
};
