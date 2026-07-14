import {useState} from "react";
import type {OrderResponse} from "@/features/orders/api.ts";
import {countryLabels} from "@/features/auth/countryOptions.ts";
import {useFetchOrderMovements} from "@/features/orders/hooks.ts";

import {Check, Eye, EyeOff, Plus, Trash2,} from "lucide-react";
import Button from "@/components/Button.tsx";
import {MovementType} from "@/types/MovementType.ts";
import Badge from "@/components/Badge.tsx";
import {CompanyRole} from "@/types/CompanyRole.ts";

export default function OrderRow(
    {
        order,
        onDelete,
        onAddMovement,
        onComplete,
        onMovementDelete,
    }: {
        order: OrderResponse;
        onDelete: (publicId: string) => void;
        onAddMovement: (publicId: string) => void;
        onComplete: (publicId: string) => void;
        onMovementDelete: (
            orderPublicId: string,
            movementPublicId: string
        ) => void;
    }) {

    const [showInfo, setShowInfo] = useState(false);

    const orderDetails =
        useFetchOrderMovements(order.publicId);

    return (
        <>
            <tr className="border-b border-zinc-200 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
                <td className="px-5 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                    {order.companyName}
                </td>
                <td className="px-5 py-4 text-zinc-600 dark:text-zinc-400">
                    {countryLabels[order.companyCountry]}
                </td>
                <td className="px-5 py-4 text-zinc-600 dark:text-zinc-400">
                    {order.withRole === CompanyRole.CLIENT
                        ? <Badge variant={"info"}>Client</Badge>
                        : <Badge variant={"neutral"}>Supplier</Badge>}
                </td>
                <td className="px-5 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                    {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                        <Button variant="danger" icon={<Trash2 size={16}/>} onClick={() => onDelete(order.publicId)}>
                            Delete
                        </Button>
                        <Button variant="secondary" icon={showInfo ? <EyeOff size={16}/> : <Eye size={16}/>}
                                onClick={() => setShowInfo(!showInfo)}>
                            {showInfo ? "Hide Movements" : "Show Movements"}
                        </Button>
                        <Button variant="success" icon={<Check size={16}/>} disabled={order.isCompleted}
                                onClick={() => onComplete(order.publicId)}>
                            Complete
                        </Button>
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan={9}>
                    <div
                        className={`grid transition-[grid-template-rows] duration-300 ${showInfo ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                        <div className="overflow-hidden">
                            <div
                                className="m-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
                                {!orderDetails.data || orderDetails.data.movements.length === 0
                                    ? (
                                        <div className="flex flex-col items-center gap-3 py-6">
                                            <p className="text-sm text-zinc-500">
                                                There are no movements yet
                                            </p>
                                            <Button icon={<Plus size={16}/>} variant="success"
                                                    onClick={() => onAddMovement(order.publicId)}>
                                                Add Movement
                                            </Button>
                                        </div>
                                    )
                                    : (
                                        <>
                                            <table className="w-full text-left">
                                                <thead>
                                                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                                    <th className="px-4 py-3">Goods</th>
                                                    <th className="px-4 py-3">Price</th>
                                                    <th className="px-4 py-3">Quantity</th>
                                                    <th className="px-4 py-3">Discount</th>
                                                    <th className="px-4 py-3">Total</th>
                                                    <th className="px-4 py-3">Type</th>
                                                    <th className="px-4 py-3">Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    orderDetails.data.movements.map(
                                                        movement => (
                                                            <tr key={movement.publicId}
                                                                className="border-b border-zinc-200 dark:border-zinc-800"
                                                            >
                                                                <td className="px-4 py-3">
                                                                    {movement.materialDescription ??
                                                                        movement.productDescription}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    {new Intl.NumberFormat("en-US", {
                                                                        notation: "compact",
                                                                        maximumFractionDigits: 2,
                                                                    }).format(
                                                                        movement.materialUnitPrice
                                                                        ?? movement.productPrice
                                                                        ?? 0
                                                                    )} €
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    {movement.quantity}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    {movement.discount ?? "—"}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    {new Intl.NumberFormat("en-US", {
                                                                        notation: "compact",
                                                                        maximumFractionDigits: 2,
                                                                    }).format(movement.totalPrice)} €
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    {movement.movementType === MovementType.INBOUND
                                                                        ? <Badge variant={"success"}>Inbound</Badge>
                                                                        : <Badge variant={"danger"}>Outbound</Badge>}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <Button variant="danger" icon={<Trash2 size={15}/>}
                                                                            disabled={order.isCompleted}
                                                                            onClick={() => onMovementDelete(order.publicId, movement.publicId)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                }
                                                </tbody>
                                            </table>
                                            {!order.isCompleted && (
                                                <div className="mt-4">
                                                    <Button icon={<Plus size={16}/>} variant="success"
                                                            onClick={() => onAddMovement(order.publicId)}
                                                    >
                                                        Add Movement
                                                    </Button>
                                                </div>
                                            )}
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
}
