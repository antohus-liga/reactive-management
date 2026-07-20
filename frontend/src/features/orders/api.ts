import {apiClient} from "@/lib/apiClient.ts";
import type {CompanyRole} from "@/types/CompanyRole.ts";
import type {MovementType} from "@/types/MovementType.ts";

export interface OrderResponse {
    publicId: string;
    companyName: string;
    companyCountry: string;
    withRole: CompanyRole;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
}

export interface OrderDetailsResponse {
    movements: MovementResponse[];
    totalPrice: number;
}

export interface OrderRequest {
    companyPublicId: string;
    withRole: CompanyRole;
}

export interface MovementResponse {
    publicId: string;
    movementType: MovementType;
    productDescription: string | null;
    productPrice: number | null;
    materialDescription: string | null;
    materialUnitPrice: number | null;
    discount: string | null;
    quantity: number;
    totalPrice: number;
    notes: string | null;
}

export interface MovementRequest {
    movementType: MovementType;
    productPublicId: string | null;
    materialPublicId: string | null;
    discount: string | null;
    quantity: number;
    notes: string | null;
}

export const ordersApi = {
    get: () => apiClient.get<OrderResponse[]>("/api/orders").then(r => r.data),
    create: (payload: OrderRequest) => apiClient.post("/api/orders", payload),
    delete: (publicId: string) => apiClient.delete(`/api/orders/${publicId}`),
    getMovements: (publicId: string) => apiClient.get<OrderDetailsResponse>(`/api/orders/${publicId}/movements`).then(r => r.data),
    addMovement: ({publicId, payload}: {
        publicId: string,
        payload: MovementRequest
    }) => apiClient.post(`/api/orders/${publicId}/movements`, payload),
    deleteMovement: ({orderPublicId, movementPublicId}: { orderPublicId: string, movementPublicId: string }) =>
        apiClient.delete(`/api/orders/${orderPublicId}/movements/${movementPublicId}`),
    completeOrder: (publicId: string) => apiClient.post(`/api/orders/${publicId}/complete`),
}