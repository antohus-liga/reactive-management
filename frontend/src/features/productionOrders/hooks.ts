import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getErrorMessage} from "@/lib/getErrorMessage.ts";
import {type ProductionOrderRequest, productionOrdersApi} from "@/features/productionOrders/api.ts";

export function useFetchProductionOrders() {
    return useQuery({
        queryKey: ["productionOrders", "get"],
        queryFn: productionOrdersApi.get,
        refetchInterval: (query) => {
            const productions = query.state.data;

            const hasRunning = productions?.some(
                prod => prod.status === "IN_PROGRESS"
            );

            return hasRunning ? 1000 : false;
        },
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
}

export function useCreateProductionOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ProductionOrderRequest) => productionOrdersApi.create(payload),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["productionOrders", "get"]})
    });
}

export function useDeleteProductionOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (publicId: string) => productionOrdersApi.delete(publicId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["productionOrders", "get"]})
            await queryClient.invalidateQueries({queryKey: ["materials", "get"]});
            await queryClient.invalidateQueries({queryKey: ["products", "get"]});
        },
        onError: (error) => alert(getErrorMessage(error))
    });
}

export function useExecuteProductionOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (publicId: string) => productionOrdersApi.execute(publicId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["productionOrders", "get"]})
            await queryClient.invalidateQueries({queryKey: ["materials", "get"]});
            await queryClient.invalidateQueries({queryKey: ["products", "get"]});
        },
        onError: (error) => alert(getErrorMessage(error))
    });
}