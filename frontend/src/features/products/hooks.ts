import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {type ProductRecipeRequest, type ProductRequest, productsApi} from "@/features/products/api.ts";

export function useFetchProducts() {
    return useQuery({
        queryKey: ["products", "get"],
        queryFn: productsApi.get,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
}

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ProductRequest) => productsApi.create(payload),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["products", "get"]})
    });
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({publicId, payload}: {
            publicId: string,
            payload: ProductRequest
        }) => productsApi.update({publicId, payload}),
        onSuccess: async (_, args) => {
            await queryClient.invalidateQueries({queryKey: ["products", "get"]})
            await queryClient.invalidateQueries({queryKey: ["products", "recipe", args.publicId]})
        }
    })
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (publicId: string) => productsApi.delete(publicId),
        onSuccess: async (_, publicId) => {
            await queryClient.invalidateQueries({queryKey: ["products", "get"]})
            await queryClient.invalidateQueries({queryKey: ["products", "recipe", publicId]})
        },
        onError: () => alert("Some orders depend on this product.")
    })
}

export function useFetchProductRecipe(publicId: string) {
    return useQuery({
        queryKey: ["products", "recipe", publicId],
        queryFn: () => productsApi.getRecipe(publicId),
        staleTime: 5 * 60 * 1000,
        retry: false,
    })
}

export function useReplaceProductRecipe() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({publicId, payload}: {
            publicId: string,
            payload: ProductRecipeRequest
        }) => productsApi.replaceRecipe({publicId, payload}),
        onSuccess: async (_, args) => {
            await queryClient.invalidateQueries({queryKey: ["products", "get"]});
            await queryClient.invalidateQueries({queryKey: ["products", "recipe", args.publicId]});
        }
    })
}