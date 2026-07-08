import type {MeasurementType} from "@/types/MeasurementType.ts";
import {apiClient} from "@/lib/apiClient.ts";

export interface ProductResponse {
    publicId: string;
    description: string;
    quantity: number;
    categoryDescription: string;
    categoryColor: string;
    measurement: MeasurementType;
    fixedPrice: number | null;
    sellingMargin: string | null;
    productionCost: number;
    price: number;
    createdAt: string;
    updatedAt: string;
}

export interface ProductRequest {
    description: string;
    categoryPublicId: string;
    measurement: MeasurementType;
    fixedPrice: number | null;
    sellingMargin: string | null;
    quantity: number
}

export interface ProductRecipeResponse {
    productPublicId: string;
    productDescription: string;
    ingredients: IngredientResponse[];
    productionCost: number;
}

export interface ProductRecipeRequest {
    ingredients: IngredientRequest[]
}

export interface IngredientResponse {
    materialPublicId: string;
    materialDescription: string;
    materialUnitPrice: number;
    quantityNeeded: number;
}

export interface IngredientRequest {
    materialPublicId: string;
    quantity: number;
}

export const productsApi = {
    get: () => apiClient.get<ProductResponse[]>("/api/products").then(r => r.data),
    create: (payload: ProductRequest) => apiClient.post("/api/products", payload),
    update: ({publicId, payload}: {
        publicId: string,
        payload: ProductRequest
    }) => apiClient.put(`/api/products/${publicId}`, payload),
    delete: (publicId: string) => apiClient.delete(`/api/products/${publicId}`),
    getRecipe: (publicId: string) => apiClient.get<ProductRecipeResponse>(`/api/products/${publicId}/recipe`).then(r => r.data),
    replaceRecipe: ({publicId, payload}: {
        publicId: string,
        payload: ProductRecipeRequest
    }) => apiClient.post(`/api/products/${publicId}/recipe`, payload),
    deleteRecipe: (publicId: string) => apiClient.delete(`/api/products/${publicId}/recipe`),
}