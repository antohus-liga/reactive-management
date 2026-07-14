import useOrderModal from "@/features/orders/useOrderModal.ts";
import useProductionOrders from "@/features/productionOrders/useProductionOrders.ts";
import type {ProductionOrderResponse} from "@/features/productionOrders/api.ts";
import ProductionOrderRow from "@/features/productionOrders/ProductionOrderRow.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useMemo, useRef, useState} from "react";
import Modal from "@/components/Modal.tsx";
import ProductionOrderForm from "@/features/productionOrders/ProductionOrderForm.tsx";
import DataTable from "@/components/table/DataTable";
import {DataTableHead} from "@/components/table/DataTableHead.tsx";
import {DataTableHeader} from "@/components/table/DataTableHeader.tsx";
import Button from "@/components/Button.tsx";
import {Plus} from "lucide-react";

export default function ProductionOrdersPage() {
    const productionOrders = useProductionOrders();
    const modal = useOrderModal();
    const queryClient = useQueryClient();
    const handledCompletions = useRef(new Set<string>());
    const [nameFilter, setNameFilter] = useState("");

    const filteredProduction = useMemo(() => {
        if (!nameFilter.trim()) return productionOrders.get.data;
        return productionOrders.get.data?.filter((prod: ProductionOrderResponse) =>
            prod.productDescription?.toLowerCase().includes(nameFilter.toLowerCase())
        );
    }, [productionOrders.get.data, nameFilter]);

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

    return (
        <>
            <Modal open={modal.open} onClose={modal.close}>
                <ProductionOrderForm onClose={modal.close}/>
            </Modal>

            <input
                type="text"
                placeholder="Filter by product description..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="mb-4 px-3 py-2 border rounded-md w-full max-w-sm"
            />

            <DataTable
                loading={productionOrders.get.isLoading}
                empty={!productionOrders.get.isLoading && filteredProduction?.length === 0}
                emptyMessage="No production orders found."
            >
                <DataTableHead>
                    <DataTableHeader>Product</DataTableHeader>
                    <DataTableHeader>Production Cost</DataTableHeader>
                    <DataTableHeader>Quantity</DataTableHeader>
                    <DataTableHeader>Total Cost</DataTableHeader>
                    <DataTableHeader>Status</DataTableHeader>
                    <DataTableHeader>Created At</DataTableHeader>
                    <DataTableHeader className="text-right">Actions</DataTableHeader>
                </DataTableHead>

                <tbody>
                {filteredProduction?.map((prod: ProductionOrderResponse) => (
                    <ProductionOrderRow
                        key={prod.publicId}
                        productionOrder={prod}
                        onDelete={productionOrders.handleDeleteProductionOrder}
                        onExecute={productionOrders.handleExecuteProductionOrder}
                    />
                ))}
                </tbody>
            </DataTable>
            <Button className={"mt-5"} onClick={modal.openForCreate} icon={<Plus size={16}/>}>
                New Production Order
            </Button>
        </>
    );
}
