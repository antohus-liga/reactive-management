import useOrderModal from "@/features/orders/useOrderModal.ts";
import useProductionOrders from "@/features/productionOrders/useProductionOrders.ts";
import type {ProductionOrderResponse} from "@/features/productionOrders/api.ts";
import ProductionOrderRow from "@/features/productionOrders/ProductionOrderRow.tsx";
import ProductionOrderModal from "@/features/productionOrders/ProductionOrderModal.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useRef} from "react";

export default function ProductionOrdersPage() {
    const productionOrders = useProductionOrders();
    const modal = useOrderModal();
    const queryClient = useQueryClient();
    const handledCompletions = useRef(new Set<string>());

    useEffect(() => {
        if (!productionOrders.get.data) return;

        const newlyCompleted = productionOrders.get.data.filter(
            (p) => p.status === "COMPLETED" && !handledCompletions.current.has(p.publicId)
        );

        if (newlyCompleted.length > 0) {
            newlyCompleted.forEach((p) => handledCompletions.current.add(p.publicId));
            queryClient.invalidateQueries({queryKey: ["products", "get"]}).then();
            queryClient.invalidateQueries({queryKey: ["materials", "get"]}).then();
        }
    }, [productionOrders.get.data, queryClient]);

    if (productionOrders.get.isLoading) return null;
    if (productionOrders.get.isError) return null;

    return (
        <>
            <ProductionOrderModal open={modal.open} onClose={modal.close}/>
            <div
                className={"relative flex flex-col w-auto max-h-[calc(100vh-18rem)] overflow-y-auto shadow-md shadow-white rounded-xl bg-clip-border"}>
                <table className={"w-full text-left table-auto bg-red-500"}>
                    <thead>
                    <tr className={"border-b bg-red-500"}>
                        <th className={"p-4"}>Product Description</th>
                        <th className={"p-4"}>Product Production Cost</th>
                        <th className={"p-4"}>Quantity</th>
                        <th className={"p-4"}>Status</th>
                        <th className={"p-4"}>Total Cost</th>
                        <th className={"p-4"}>Created At</th>
                        <th className={"p-4"}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productionOrders.get.data?.map((production: ProductionOrderResponse) => (
                        <ProductionOrderRow key={production.publicId} productionOrder={production}
                                            onDelete={productionOrders.handleDeleteProductionOrder}
                                            onExecute={productionOrders.handleExecuteProductionOrder}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
            <div className={"mt-10"}>
                <button onClick={() => modal.openForCreate()}
                        className={"p-3 bg-emerald-700 border-2 border-emerald-700 hover:bg-emerald-500 active:bg-emerald-600 active:scale-95 rounded-xl transition duration-100"}>New
                    Production Order
                </button>
            </div>
        </>
    );
}
