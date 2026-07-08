import type {MeasurementType} from "@/types/MeasurementType.ts";
import {apiClient} from "@/lib/apiClient.ts";

export interface MaterialResponse {
    publicId: string;
    description: string;
    categoryDescription: string;
    categoryColor: string;
    measurement: MeasurementType;
    unitPrice: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
}

export interface MaterialRequest {
    description: string;
    categoryPublicId: string;
    measurement: MeasurementType;
    unitPrice: number;
    quantity: number;
}

export const materialApi = {
    get: () =>
        apiClient.get<MaterialResponse[]>("/api/materials").then((r) => r.data),
    create: (payload: MaterialRequest) =>
        apiClient.post("/api/materials", payload),
    update: (publicId: string, payload: MaterialRequest) =>
        apiClient.put(`/api/materials/${publicId}`, payload),
    delete: (publicId: string) =>
        apiClient.delete(`/api/materials/${publicId}`),
}