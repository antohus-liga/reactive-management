import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {type MovementRequest, type OrderRequest, ordersApi} from "@/features/orders/api.ts";
import {getErrorMessage} from "@/lib/getErrorMessage.ts";

export function useFetchOrders() {
    return useQuery({
        queryKey: ["orders", "get"],
        queryFn: ordersApi.get,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
}

export function useCreateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: OrderRequest) => ordersApi.create(payload),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["orders", "get"]})
    });
}

export function useDeleteOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (publicId: string) => ordersApi.delete(publicId),
        onSuccess: async (_, publicId) => {
            await queryClient.invalidateQueries({queryKey: ["orders", "get"]})
            await queryClient.invalidateQueries({queryKey: ["orders", "movements", publicId]})
            await queryClient.invalidateQueries({queryKey: ["materials", "get"]});
            await queryClient.invalidateQueries({queryKey: ["products", "get"]});
        },
        onError: (error) => alert(getErrorMessage(error))
    });
}

export function useFetchOrderMovements(publicId: string) {
    return useQuery({
        queryKey: ["orders", "movements", publicId],
        queryFn: () => ordersApi.getMovements(publicId),
        staleTime: 5 * 60 * 1000,
        retry: false,
    });
}

export function useAddMovement() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({publicId, payload}: {
            publicId: string,
            payload: MovementRequest
        }) => ordersApi.addMovement({publicId, payload}),
        onSuccess: async (_, args) => {
            await queryClient.invalidateQueries({queryKey: ["orders", "get"]});
            await queryClient.invalidateQueries({queryKey: ["orders", "movements", args.publicId]});
        }
    });
}

export function useDeleteMovement() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({orderPublicId, movementPublicId}: {
            orderPublicId: string,
            movementPublicId: string
        }) => ordersApi.deleteMovement({orderPublicId, movementPublicId}),
        onSuccess: async (_, publicId) => {
            await queryClient.invalidateQueries({queryKey: ["orders", "get"]});
            await queryClient.invalidateQueries({queryKey: ["orders", "movements", publicId]});
        }
    });
}

export function useCompleteOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (publicId: string) => ordersApi.completeOrder(publicId),
        onSuccess: async (_, publicId) => {
            await queryClient.invalidateQueries({queryKey: ["orders", "get"]});
            await queryClient.invalidateQueries({queryKey: ["orders", "movements", publicId]});
            await queryClient.invalidateQueries({queryKey: ["materials", "get"]});
            await queryClient.invalidateQueries({queryKey: ["products", "get"]});
        },
        onError: (error) => alert(getErrorMessage(error))
    });
}