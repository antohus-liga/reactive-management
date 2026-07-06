import {useMutation, useQuery} from "@tanstack/react-query";
import {companyApi, type CompanyRequest} from "@/features/companies/api.ts";

export function useFetchCompanies() {
    return useQuery({
        queryKey: ["companies", "get"],
        queryFn: companyApi.get,
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
}

export function useCreateCompany() {
    return useMutation({
        mutationFn: async (payload: CompanyRequest) => {
            return await companyApi.create(payload);
        }
    })
}