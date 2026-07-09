import {useState} from "react";
import type {OrderResponse} from "@/features/orders/api.ts";
import {countryLabels} from "@/features/auth/countryOptions.ts";
import {useFetchOrderMovements} from "@/features/orders/hooks.ts";
import {MovementType} from "@/types/MovementType.ts";

export default function OrderRow({order, onDelete}: {
    order: OrderResponse,
    onDelete: (publicId: string) => void,
}) {
    const [showInfo, setShowInfo] = useState(false);
    const orderDetails = useFetchOrderMovements(order.publicId)
    return (
        <>
            <tr className={"border-b transition duration-200 bg-red-400"}>
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
                            <img className={"size-6"} src={"/show.png"} alt={"Recipe"}/>
                        </button>
                        {/*<button className={"bg-green-300 hover:bg-green-400 p-2 rounded-lg transition outline-2"}*/}
                        {/*        onClick={() => onRecipeReplace(recipe.data ?? null, order.publicId)}>*/}
                        {/*    <img className={"size-6"} src={"/recipe.png"} alt={"Recipe"}/>*/}
                        {/*</button>*/}
                    </div>
                </td>
            </tr>
            <tr className={"w-full"}>
                {!orderDetails.data || !(orderDetails.data.movements.length > 0) ? (
                    <td colSpan={9}>
                        <div
                            className={`grid transition-[grid-template-rows] duration-300 ${showInfo ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                            <div
                                className={"overflow-hidden text-xl transition-all duration-500 w-full"}>
                                There are no movements yet
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
                                        </tr>
                                        </thead>
                                        <tbody className={"divide-y"}>
                                        {orderDetails.data.movements.map(movement => (
                                            <tr key={movement.publicId} style={{backgroundColor: movement.movementType === MovementType.INBOUND ? "green" : "#8b0000"}}>
                                                <td className={"p-4"}>{movement.materialDescription ?? movement.productDescription}</td>
                                                <td className={"p-4"}>{movement.materialUnitPrice ?? movement.productPrice}</td>
                                                <td className={"p-4"}>{movement.quantity}</td>
                                                <td className={"p-4"}>{movement.discount ?? "Doesn't apply"}</td>
                                                <td className={"p-4"}>{movement.totalPrice}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </td>
                    </>
                )}
            </tr>
        </>
    );
}
