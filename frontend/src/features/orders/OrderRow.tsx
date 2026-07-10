import {useState} from "react";
import type {OrderResponse} from "@/features/orders/api.ts";
import {countryLabels} from "@/features/auth/countryOptions.ts";
import {useFetchOrderMovements} from "@/features/orders/hooks.ts";
import {MovementType} from "@/types/MovementType.ts";
import {CompanyRole} from "@/types/CompanyRole.ts";

export default function OrderRow({order, onDelete, onAddMovement, onComplete, onMovementDelete}: {
    order: OrderResponse,
    onDelete: (publicId: string) => void,
    onAddMovement: (publicId: string) => void,
    onComplete: (publicId: string) => void,
    onMovementDelete: (orderPublicId: string, movementPublicId: string) => void,
}) {
    const [showInfo, setShowInfo] = useState(false);
    const orderDetails = useFetchOrderMovements(order.publicId)
    const color = order.withRole === CompanyRole.CLIENT ? "#8b3efe" : "#727272";

    return (
        <>
            <tr className={"border-b transition duration-200 bg-red-400"} style={{backgroundColor: color}}>
                <td className={"p-4"}>{order.companyName}</td>
                <td className={"p-4"}>{countryLabels[order.companyCountry]}</td>
                <td className={"p-4"}>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={"p-4"}>{new Date(order.updatedAt).toLocaleString()}</td>
                <td className={"p-4"}>
                    <div className={"flex gap-3"}>
                        <button className={"bg-red-300 hover:bg-red-400 p-2 rounded-lg transition outline-2"}
                                onClick={() => onDelete(order.publicId)}>
                            <img className={"size-6"} src={"/delete.png"} alt={"Delete"}/>
                        </button>
                        <span/>
                        <span/>
                        <button className={"bg-purple-300 hover:bg-purple-400 p-2 rounded-lg transition outline-2"}
                                onClick={() => setShowInfo(!showInfo)}>
                            <img className={"size-6"} src={"/show.png"} alt={"Movements"}/>
                        </button>
                        <button className={"bg-green-300 hover:bg-green-400 p-2 rounded-lg transition outline-2 disabled:bg-gray-500"}
                                disabled={order.isCompleted}
                                onClick={() => onComplete(order.publicId)}>
                            <img className={"size-6"} src={"/check.png"} alt={"Complete"}/>
                        </button>
                    </div>
                </td>
            </tr>
            <tr className={"w-full"}>
                {!orderDetails.data || !(orderDetails.data.movements.length > 0) ? (
                    <td colSpan={9}>
                        <div
                            className={`grid transition-[grid-template-rows] duration-300 ${showInfo ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                            <div
                                className={"overflow-hidden flex flex-col text-xl transition-all duration-500 w-full"}>
                                There are no movements yet
                                <button
                                    className={"bg-green-300 w-fit hover:bg-green-400 m-2 p-2 rounded-lg transition outline-2"}
                                    onClick={() => {
                                        onAddMovement(order.publicId)
                                    }}>
                                    <img className={"size-6"} src={"/plus.png"} alt={"Add"}/>
                                </button>
                            </div>
                        </div>
                    </td>
                ) : (
                    <>
                        <td colSpan={9}>
                            <div
                                className={`grid transition-[grid-template-rows] duration-300 ${showInfo ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} pl-10 w-full`}>
                                <div className={"overflow-hidden"}>
                                    <table
                                        className={"w-full text-left table-auto bg-red-400 bg-clip-border"}>
                                        <thead>
                                        <tr className={"border-b"}>
                                            <th className={"p-4"}>Goods</th>
                                            <th className={"p-4"}>Price</th>
                                            <th className={"p-4"}>Quantity</th>
                                            <th className={"p-4"}>Discount</th>
                                            <th className={"p-4"}>Total</th>
                                            <th className={"p-4"}>Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody className={"divide-y"}>
                                        {orderDetails.data.movements.map(movement => (
                                            <tr key={movement.publicId}
                                                style={{backgroundColor: movement.movementType === MovementType.INBOUND ? "green" : "#8b0000"}}>
                                                <td className={"p-4"}>{movement.materialDescription ?? movement.productDescription}</td>
                                                <td className={"p-4"}>{movement.materialUnitPrice ?? movement.productPrice}</td>
                                                <td className={"p-4"}>{movement.quantity}</td>
                                                <td className={"p-4"}>{movement.discount ?? "Doesn't apply"}</td>
                                                <td className={"p-4"}>{movement.totalPrice}</td>
                                                <td className={"pl-4"}>
                                                    <button className={"bg-red-300 hover:bg-red-400 p-2 rounded-lg transition outline-2 disabled:bg-gray-500"}
                                                            disabled={order.isCompleted}
                                                            onClick={() => onMovementDelete(order.publicId, movement.publicId)}>
                                                        <img className={"size-6"} src={"/delete.png"} alt={"Delete"}/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    {!order.isCompleted &&
                                        <button
                                            className={"bg-green-300 hover:bg-green-400 m-2 p-2 rounded-lg transition outline-2"}
                                            onClick={() => {
                                                onAddMovement(order.publicId)
                                            }}>
                                            <img className={"size-6"} src={"/plus.png"} alt={"Add"}/>
                                        </button>
                                    }
                                </div>
                            </div>
                        </td>
                    </>
                )}
            </tr>
        </>
    );
}
