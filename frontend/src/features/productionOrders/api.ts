import {apiClient} from "@/lib/apiClient.ts";
import type {ProductionStatus} from "@/types/ProductionStatus.ts";

export interface ProductionOrderRequest {
    productPublicId: string;
    quantity: number;
}

export interface ProductionOrderResponse {
    publicId: string;
    productDescription: string;
    productProductionCost: number;
    quantity: number;
    status: ProductionStatus;
    totalCost: number;
    createdAt: Date;
}

export const productionOrdersApi = {
    get: () => apiClient.get<ProductionOrderResponse[]>("/api/production-orders").then(r => r.data),
    create: (payload: ProductionOrderRequest) => apiClient.post("/api/production-orders", payload),
    delete: (publicId: string) => apiClient.delete(`/api/production-orders/${publicId}`),
    execute: (publicId: string) => apiClient.post(`/api/production-orders/${publicId}`),
}