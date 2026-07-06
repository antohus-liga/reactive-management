import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
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
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: CompanyRequest) => {
            return await companyApi.create(payload);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["companies", "get"]});
        }
    });
}

export function useUpdateCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({publicId, payload}: {publicId: string, payload: CompanyRequest}) => {
            return await companyApi.update(publicId, payload)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["companies", "get"]});
        }
    });
}

export function useDeleteCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (publicId: string) => {
            return await companyApi.delete(publicId);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["companies", "get"]});
        }
    });
}