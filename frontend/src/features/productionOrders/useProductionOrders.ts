import {
    useDeleteProductionOrder,
    useExecuteProductionOrder,
    useFetchProductionOrders
} from "@/features/productionOrders/hooks.ts";

export default function useProductionOrders() {
    const get = useFetchProductionOrders();
    const deleteProductionOrder = useDeleteProductionOrder();
    const execute = useExecuteProductionOrder();

    function handleDeleteProductionOrder(publicId: string) {
        deleteProductionOrder.mutate(publicId)
    }

    function handleExecuteProductionOrder(publicId: string) {
        execute.mutate(publicId)
    }

    return {
        handleDeleteProductionOrder,
        handleExecuteProductionOrder,
        get,
    };
}
