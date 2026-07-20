import {useQueries} from "@tanstack/react-query";
import {useFetchProductionOrders} from "@/features/productionOrders/hooks.ts";
import {useFetchOrders} from "@/features/orders/hooks.ts";
import {ordersApi} from "@/features/orders/api.ts";
import {useTranslation} from "react-i18next";
import {ProductionStatusLabel} from "@/types/ProductionStatus.ts";

export type Activity = {
    id: string;
    type:
        | "ORDER"
        | "PRODUCTION"
        | "MOVEMENT";
    title: string;
    description: string;
    date: Date;
};

export function useRecentActivity() {
    const {t} = useTranslation();

    const {data: orders = [], isLoading: ordersLoading,} = useFetchOrders();
    const {data: productions = [], isLoading: productionLoading,} = useFetchProductionOrders();

    const movementQueries = useQueries({
        queries: orders.map(order => ({
            queryKey: [
                "orders",
                "movements",
                order.publicId
            ],
            queryFn: () => ordersApi.getMovements(order.publicId),
            staleTime: 5 * 60 * 1000,
            retry: false
        }))
    });

    const activities: Activity[] = [];

    orders.forEach(order => {
        activities.push({
            id: `order-${order.publicId}`,
            type: "ORDER",
            title: t("newOrderCreated"),
            description:
            order.companyName,
            date: new Date(order.createdAt)
        });

        if (order.isCompleted && order.completedAt) {
        activities.push({
                id: `order-completed-${order.publicId}`,
                type: "ORDER",
                title: t("orderCompleted"),
                description: order.companyName,
                date: new Date(order.completedAt)
        });
        }
    });

    productions.forEach(order => {
                activities.push({
            id: `production-${order.publicId}`,
            type: "PRODUCTION",
            title: `${t("production")} ${t(ProductionStatusLabel[order.status])}`,
            description: `${order.productDescription} × ${order.quantity}`,
                    date: new Date(order.createdAt)
                });
            });

    movementQueries.forEach((query, index) => {
        const order = orders[index];
        query.data?.movements
            .slice(0, 5)
            .forEach(movement => {
                activities.push({
                    id: `movement-${movement.publicId}`,
                    type: "MOVEMENT",
                    title: movement.productDescription ? t("productMovement") : t("materialMovement"),
                    description: `${movement.productDescription ?? movement.materialDescription} (${order.companyName})`,
                    date: new Date(order.createdAt)
    });
            });
    });

    activities.sort((a, b) => b.date.getTime() - a.date.getTime());

    return {
        data: activities.slice(0, 10),
        isLoading:
            ordersLoading ||
            productionLoading ||
            movementQueries.some(query => query.isLoading)
    };
}