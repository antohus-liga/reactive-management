import {useQueries} from "@tanstack/react-query";

import {useFetchOrders} from "@/features/orders/hooks.ts";
import {ordersApi} from "@/features/orders/api.ts";

export function useDashboardSales() {
    const {
        data: orders = [],
        isLoading: ordersLoading,
    } = useFetchOrders();

    const completedOrders = orders.filter(order => order.isCompleted);

    const movementQueries = useQueries({
        queries: completedOrders.map(order => ({
            queryKey: [
                "orders",
                "movements",
                order.publicId,
            ],

            queryFn: () =>
                ordersApi.getMovements(order.publicId),

            staleTime: 5 * 60 * 1000,
            retry: false,
        })),
    });

    const isLoading =
        ordersLoading ||
        movementQueries.some(
            query => query.isLoading
        );

    const sales =
        movementQueries
            .flatMap(
                query =>
                    query.data?.movements ?? []
            )
            .filter(
                movement =>
                    movement.productDescription !== null &&
                    movement.movementType === "OUTBOUND"
            )
            .reduce(
                (sum, movement) =>
                    sum + movement.totalPrice,
                0
            );

    return {
        sales,
        isLoading,
    };
}
