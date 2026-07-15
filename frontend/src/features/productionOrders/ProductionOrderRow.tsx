import type {ProductionOrderResponse} from "@/features/productionOrders/api.ts";
import {ProductionStatus, ProductionStatusLabel} from "@/types/ProductionStatus.ts";

import {Check, Trash2} from "lucide-react";
import Button from "@/components/Button.tsx";
import Badge from "@/components/Badge.tsx";
import {useTranslation} from "react-i18next";

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

    const {t} = useTranslation();

    const statusVariant: Record<ProductionStatus, string> = {
        PENDING: "warning",
        IN_PROGRESS: "info",
        COMPLETED: "success",
        FAILED: "danger",
    };

    return (
        <tr className=" border-b border-zinc-200 transition-colors duration-150 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50 ">
            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {productionOrder.productDescription}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 2,
                }).format(productionOrder.productProductionCost)} €
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {productionOrder.quantity}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 2,
                }).format(productionOrder.totalCost)} €
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                <Badge variant={statusVariant[productionOrder.status] as "warning" | "info" | "success" | "danger"}>
                    {t(ProductionStatusLabel[productionOrder.status])}
                </Badge>
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {new Date(productionOrder.createdAt).toLocaleString()}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <Button variant="danger" icon={<Trash2 size={16}/>}
                            onClick={() => onDelete(productionOrder.publicId)}
                    >
                        {t("delete")}
                    </Button>

                    <Button variant="success" icon={<Check size={16}/>}
                            disabled={productionOrder.status !== ProductionStatus.PENDING}
                            onClick={() => onExecute(productionOrder.publicId)}
                    >
                        {t("execute")}
                    </Button>
                </div>
            </td>
        </tr>
    );
}
