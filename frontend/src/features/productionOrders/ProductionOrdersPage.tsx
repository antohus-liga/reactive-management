import useOrderModal from "@/features/orders/useOrderModal.ts";
import useProductionOrders from "@/features/productionOrders/useProductionOrders.ts";
import type {ProductionOrderResponse} from "@/features/productionOrders/api.ts";
import ProductionOrderRow from "@/features/productionOrders/ProductionOrderRow.tsx";
import ProductionOrderModal from "@/features/productionOrders/ProductionOrderModal.tsx";

export default function ProductionOrdersPage() {
    const productionOrders = useProductionOrders();
    const modal = useOrderModal();

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
