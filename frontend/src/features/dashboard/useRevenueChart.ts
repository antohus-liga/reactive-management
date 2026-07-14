import {useQueries} from "@tanstack/react-query";
import {useFetchOrders} from "@/features/orders/hooks.ts";
import {ordersApi} from "@/features/orders/api.ts";

export function useRevenueChart() {

    const {
        data: orders = [],
        isLoading: ordersLoading,
    } = useFetchOrders();

    const movementQueries = useQueries({
        queries: orders.map(order => ({
            queryKey: [
                "orders",
                "movements",
                order.publicId,
            ],

            queryFn: () =>
                ordersApi.getMovements(order.publicId),

            staleTime: 5 * 60 * 1000,
            retry: false,
        }))
    });

    const dailyRevenue =
        orders.reduce(
            (acc, order, index) => {

                const movements =
                    movementQueries[index]
                        ?.data
                        ?.movements ?? [];

                const orderRevenue =
                    movements
                        .filter(
                            movement =>
                                movement.productDescription &&
                                movement.movementType === "OUTBOUND"
                        )
                        .reduce(
                            (sum, movement) =>
                                sum + movement.totalPrice,
                            0
                        );

                if (orderRevenue <= 0)
                    return acc;

                const date =
                    new Date(order.createdAt)
                        .toISOString()
                        .split("T")[0];

                acc[date] =
                    (acc[date] ?? 0) + orderRevenue;

                return acc;
            },
            {} as Record<string, number>
        );

    const data =
        Object.entries(dailyRevenue)
            .map(
                ([date, revenue]) => ({
                    date,
                    revenue
                })
            )
            .sort(
                (a, b) =>
                    a.date.localeCompare(b.date)
            );

    return {
        data,
        isLoading:
            ordersLoading ||
            movementQueries.some(
                query => query.isLoading
            )
    };
}
