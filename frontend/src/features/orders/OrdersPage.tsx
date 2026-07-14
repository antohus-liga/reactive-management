import useOrders from "@/features/orders/useOrders.ts";
import useOrderModal from "@/features/orders/useOrderModal.ts";
import OrderRow from "@/features/orders/OrderRow.tsx";
import type {OrderResponse} from "@/features/orders/api.ts";
import Modal from "@/components/Modal.tsx";
import OrderForm from "@/features/orders/OrderForm.tsx";
import MovementForm from "@/features/orders/MovementForm.tsx";
import DataTable from "@/components/table/DataTable.tsx";
import {DataTableHead} from "@/components/table/DataTableHead.tsx";
import {DataTableHeader} from "@/components/table/DataTableHeader.tsx";
import Button from "@/components/Button.tsx";
import {Plus} from "lucide-react";

export default function OrdersPage() {
    const orders = useOrders();
    const modal = useOrderModal();

    return (
        <>
            <Modal open={modal.open} onClose={modal.close}>
                {!modal.orderPublicId
                    ? <OrderForm onClose={modal.close}/>
                    : <MovementForm orderId={modal.orderPublicId} onClose={modal.close}/>}
            </Modal>

            <DataTable
                loading={orders.get.isLoading}
                empty={!orders.get.isLoading && orders.get.data?.length === 0}
                emptyMessage="No orders found."
            >
                <DataTableHead>
                    <DataTableHeader>Company Description</DataTableHeader>
                    <DataTableHeader>Company Country</DataTableHeader>
                    <DataTableHeader>Role</DataTableHeader>
                    <DataTableHeader>Created At</DataTableHeader>
                    <DataTableHeader className="text-right">Actions</DataTableHeader>
                </DataTableHead>

                <tbody>
                {orders.get.data?.map((order: OrderResponse) => (
                    <OrderRow
                        key={order.publicId}
                        order={order}
                        onDelete={orders.handleDeleteOrder}
                        onMovementDelete={orders.handleDeleteMovement}
                        onComplete={orders.handleCompleteOrder}
                        onAddMovement={modal.openForMovements}
                    />
                ))}
                </tbody>
            </DataTable>
            <Button
                className={"mt-5"}
                onClick={modal.openForCreate}
                icon={<Plus size={16}/>}
            >
                New Order
            </Button>
        </>
    );
}
