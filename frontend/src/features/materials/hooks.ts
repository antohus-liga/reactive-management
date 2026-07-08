import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {materialApi, type MaterialRequest} from "@/features/materials/api.ts";

export function useFetchMaterials() {
    return useQuery({
        queryKey: ["materials", "get"],
        queryFn: materialApi.get,
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
}

export function useCreateMaterial() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: MaterialRequest) => materialApi.create(payload),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["materials", "get"]})
    })
}

export function useUpdateMaterial() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({publicId, payload}: {
            publicId: string,
            payload: MaterialRequest
        }) => materialApi.update(publicId, payload),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["materials", "get"]})
    })
}

export function useDeleteMaterial() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (publicId: string) => await materialApi.delete(publicId),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["materials", "get"]})
    })
}