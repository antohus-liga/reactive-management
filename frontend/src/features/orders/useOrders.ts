import {useCompleteOrder, useDeleteMovement, useDeleteOrder, useFetchOrders} from "@/features/orders/hooks.ts";

export default function useOrders() {
    const get = useFetchOrders();
    const deleteOrder = useDeleteOrder();
    const completeOrder = useCompleteOrder();
    const deleteMovement = useDeleteMovement();

    function handleDeleteOrder(publicId: string) {
        deleteOrder.mutate(publicId)
    }

    function handleCompleteOrder(publicId: string) {
        completeOrder.mutate(publicId)
    }

    function handleDeleteMovement(orderPublicId: string, movementPublicId: string) {
        deleteMovement.mutate({orderPublicId, movementPublicId})
    }

    return {
        handleDeleteOrder,
        handleCompleteOrder,
        handleDeleteMovement,
        get,
    };
}
