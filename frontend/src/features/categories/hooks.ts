import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {categoryApi, type CategoryRequest} from "@/features/categories/api.ts";
import {useTranslation} from "react-i18next";

export function useFetchCategories() {
    return useQuery({
        queryKey: ["categories", "get"],
        queryFn: categoryApi.get,
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: CategoryRequest) => {
            return await categoryApi.create(payload);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["categories", "get"]});
            await queryClient.invalidateQueries({queryKey: ["materials", "get"]});
        }
    });
}

export function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({publicId, payload}: { publicId: string, payload: CategoryRequest }) => {
            return await categoryApi.update(publicId, payload)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["categories", "get"]});
            await queryClient.invalidateQueries({queryKey: ["materials", "get"]});
        }
    });
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();
    const {t} = useTranslation();

    return useMutation({
        mutationFn: async (publicId: string) => await categoryApi.delete(publicId),
        onSuccess: async () => await queryClient.invalidateQueries({queryKey: ["categories", "get"]}),
        onError: () => alert(t("error.categoryDependency"))
    });
}
