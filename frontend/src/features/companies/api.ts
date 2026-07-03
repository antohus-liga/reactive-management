import type {CompanyType} from "@/types/CompanyType.ts";
import type {CompanyRole} from "@/types/CompanyRoles.ts";

export interface CompanyResponse {
    publicId: string;
    companyName: string;
    companyType: CompanyType;
    roles: CompanyRole[];
    taxId: string;
    phoneNumber: string;
    email: string;
    country: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}