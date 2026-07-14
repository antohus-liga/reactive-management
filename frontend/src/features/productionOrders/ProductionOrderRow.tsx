import type {ProductionOrderResponse} from "@/features/productionOrders/api.ts";
import {ProductionStatus, ProductionStatusLabel} from "@/types/ProductionStatus.ts";

import {Check, Trash2} from "lucide-react";
import Button from "@/components/Button.tsx";
import Badge from "@/components/Badge.tsx";

export default function ProductionOrderRow(
    {
        productionOrder,
        onDelete,
        onExecute,
    }: {
        productionOrder: ProductionOrderResponse,
        onDelete: (publicId: string) => void,
        onExecute: (publicId: string) => void,
    }) {

    const statusVariant: Record<ProductionStatus, string> = {
        PENDING: "warning",
        IN_PROGRESS: "info",
        COMPLETED: "success",
        FAILED: "danger",
    };

    return (
        <tr className=" border-b border-zinc-200 transition-colors duration-150 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50 ">
            <td className="px-5 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                {productionOrder.productDescription}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300">
                {new Intl.NumberFormat("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                }).format(productionOrder.productProductionCost)}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300">
                {productionOrder.quantity}
            </td>

            <td className="px-5 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                {new Intl.NumberFormat("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                }).format(productionOrder.totalCost)}
            </td>

            <td className="px-5 py-4">
                <Badge variant={statusVariant[productionOrder.status] as "warning" | "info" | "success" | "danger"}>
                    {ProductionStatusLabel[productionOrder.status]}
                </Badge>
            </td>

            <td className="px-5 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {new Date(productionOrder.createdAt).toLocaleString()}
            </td>

            <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                    <Button variant="danger" icon={<Trash2 size={16}/>}
                            onClick={() => onDelete(productionOrder.publicId)}>
                        Delete
                    </Button>

                    <Button variant="success" icon={<Check size={16}/>}
                            disabled={productionOrder.status !== ProductionStatus.PENDING}
                            onClick={() => onExecute(productionOrder.publicId)}
                    >
                        Execute
                    </Button>
                </div>
            </td>
        </tr>
    );
}
