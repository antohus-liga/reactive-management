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
import {useMemo, useState} from "react";
import {useTranslation} from "react-i18next";

export default function OrdersPage() {
    const orders = useOrders();
    const modal = useOrderModal();
    const [nameFilter, setNameFilter] = useState("");
    const {t} = useTranslation();

    const filteredOrders = useMemo(() => {
        if (!nameFilter.trim()) return orders.get.data;
        return orders.get.data?.filter((order: OrderResponse) =>
            order.companyName?.toLowerCase().includes(nameFilter.toLowerCase())
        );
    }, [orders.get.data, nameFilter]);

    return (
        <>
            <Modal open={modal.open} onClose={modal.close}>
                {!modal.orderPublicId
                    ? <OrderForm onClose={modal.close}/>
                    : <MovementForm orderId={modal.orderPublicId} onClose={modal.close}/>}
            </Modal>

            <input
                type="text"
                placeholder={t("filterByCompany")}
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="mb-4 px-3 py-2 border rounded-md w-full max-w-sm"
            />

            <DataTable loading={orders.get.isLoading} empty={!orders.get.isLoading && filteredOrders?.length === 0}
                       emptyMessage={t("ordersNotFound")}
            >
                <DataTableHead>
                    <DataTableHeader>{t("companyName")}</DataTableHeader>
                    <DataTableHeader>{t("country")}</DataTableHeader>
                    <DataTableHeader>{t("role")}</DataTableHeader>
                    <DataTableHeader>{t("debit")}</DataTableHeader>
                    <DataTableHeader>{t("credit")}</DataTableHeader>
                    <DataTableHeader>{t("net")}</DataTableHeader>
                    <DataTableHeader>{t("createdAt")}</DataTableHeader>
                    <DataTableHeader>{t("completedAt")}</DataTableHeader>
                    <DataTableHeader className="text-right">{t("actions")}</DataTableHeader>
                </DataTableHead>

                <tbody>
                {filteredOrders?.map((order: OrderResponse) => (
                    <OrderRow key={order.publicId} order={order} onDelete={orders.handleDeleteOrder}
                              onMovementDelete={orders.handleDeleteMovement} onComplete={orders.handleCompleteOrder}
                              onAddMovement={modal.openForMovements}
                    />
                ))}
                </tbody>
            </DataTable>
            <Button className={"mt-5"} onClick={modal.openForCreate} icon={<Plus size={16}/>}>
                {t("newOrder")}
            </Button>
        </>
    );
}

