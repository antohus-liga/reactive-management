import {useDeleteOrder, useFetchOrders} from "@/features/orders/hooks.ts";

export default function useOrders() {
    const get = useFetchOrders();
    const deleteOrder = useDeleteOrder();

    function handleDeleteOrder(publicId: string) {
        deleteOrder.mutate(publicId)
    }

    return {
        handleDeleteOrder,
        get,
    };
}
