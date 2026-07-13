import type {ProductionOrderResponse} from "@/features/productionOrders/api.ts";
import {ProductionStatus, ProductionStatusLabel} from "@/types/ProductionStatus.ts";

export default function ProductionOrderRow({productionOrder, onDelete, onExecute}: {
    productionOrder: ProductionOrderResponse,
    onDelete: (publicId: string) => void,
    onExecute: (publicId: string) => void,
}) {

    return (
        <>
            <tr className={"border-b transition duration-200 bg-red-400"}>
                <td className={"p-4"}>{productionOrder.productDescription}</td>
                <td className={"p-4"}>{productionOrder.productProductionCost}</td>
                <td className={"p-4"}>{productionOrder.quantity}</td>
                <td className={"p-4"}>{ProductionStatusLabel[productionOrder.status]}</td>
                <td className={"p-4"}>{productionOrder.totalCost}</td>
                <td className={"p-4"}>{new Date(productionOrder.createdAt).toLocaleString()}</td>
                <td className={"p-4"}>
                    <div className={"flex gap-3"}>
                        <button className={"bg-red-300 hover:bg-red-400 p-2 rounded-lg transition outline-2"}
                                onClick={() => onDelete(productionOrder.publicId)}>
                            <img className={"size-6"} src={"/delete.png"} alt={"Delete"}/>
                        </button>
                        <span/>
                        <span/>
                        <button
                            className={"bg-green-300 hover:bg-green-400 p-2 rounded-lg transition outline-2 disabled:bg-gray-500"}
                            disabled={productionOrder.status !== ProductionStatus.PENDING}
                            onClick={() => onExecute(productionOrder.publicId)}>
                            <img className={"size-6"} src={"/check.png"} alt={"Complete"}/>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
}
