import {apiClient} from "@/lib/apiClient.ts";
import type {CompanyType} from "@/types/CompanyType.ts";

export interface CompanyResponse {
    publicId: string;
    companyName: string;
    companyType: CompanyType;
    roles: string[];
    taxId: string;
    phoneNumber: string;
    email: string;
    country: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

export interface CompanyRequest {
    companyName: string;
    companyType: string;
    roles: string[];
    taxId: string;
    phoneNumber: string;
    email: string;
    country: string;
    address: string;
}

export const companyApi = {
    get:
        () => apiClient.get("/api/companies").then((r) => r.data),
    create:
        (payload: CompanyRequest) => apiClient.post("/api/companies", payload).then((r) => r.data),
    update:
        (payload: CompanyRequest) => apiClient.put("/api/companies", payload).then((r) => r.data),
    delete:
        () => apiClient.delete("/api/companies/{id}"),
};