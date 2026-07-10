import useOrders from "@/features/orders/useOrders.ts";
import useOrderModal from "@/features/orders/useOrderModal.ts";
import OrderRow from "@/features/orders/OrderRow.tsx";
import type {OrderResponse} from "@/features/orders/api.ts";
import OrderModal from "@/features/orders/OrderModal.tsx";

export default function OrdersPage() {
    const orders = useOrders();
    const modal = useOrderModal();

    if (orders.get.isLoading) return null;
    if (orders.get.isError) return null;

    return (
        <>
            <OrderModal open={modal.open} onClose={modal.close}
                        orderPublicId={modal.orderPublicId}/>
            <div
                className={"relative flex flex-col w-auto max-h-[calc(100vh-18rem)] overflow-y-auto shadow-md shadow-white rounded-xl bg-clip-border"}>
                <table className={"w-full text-left table-auto bg-red-500"}>
                    <thead>
                    <tr className={"border-b bg-red-500"}>
                        <th className={"p-4"}>Company Description</th>
                        <th className={"p-4"}>Company Country</th>
                        <th className={"p-4"}>Created At</th>
                        <th className={"p-4"}>Updated At</th>
                        <th className={"p-4"}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.get.data?.map((order: OrderResponse) => (
                        <OrderRow key={order.publicId} order={order} onDelete={orders.handleDeleteOrder}
                                  onAddMovement={modal.openForMovements} onComplete={orders.handleCompleteOrder}
                                  onMovementDelete={orders.handleDeleteMovement}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
            <div className={"mt-10"}>
                <button onClick={() => modal.openForCreate()}
                        className={"p-3 bg-emerald-700 border-2 border-emerald-700 hover:bg-emerald-500 active:bg-emerald-600 active:scale-95 rounded-xl transition duration-100"}>New
                    Order
                </button>
            </div>
        </>
    );
}
