import {DialogTitle} from "@headlessui/react";
import {getErrorMessage, getFieldErrors} from "@/lib/getErrorMessage.ts";
import {useMovementsForm} from "@/features/orders/useMovementsForm.ts";
import {TypeSelect} from "@/components/TypeSelect.tsx";
import {MovementType, MovementTypeLabel} from "@/types/MovementType.ts";
import {useFetchOrders} from "@/features/orders/hooks.ts";
import {CompanyRole} from "@/types/CompanyRole.ts";
import ProductSelect from "@/components/ProductSelect.tsx";
import MaterialSelect from "@/components/MaterialSelect.tsx";
import TextField from "@/components/TextField.tsx";

export default function MovementForm({orderId, onClose}: {
    orderId: string,
    onClose: () => void,
}) {
    const getOrders = useFetchOrders();
    const currOrder = getOrders.data?.find(order => order.publicId === orderId);

    const form = useMovementsForm(orderId);
    const error = form.addMovement.error;
    const fieldErrors = getFieldErrors(error);

    return (
        <form onSubmit={(e) => form.handleSubmit(e, onClose)}>
            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                <div className="sm:flex sm:items-start">
                    <div
                        className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
                        <img className={"size-2/3"} src={"/plus.png"} alt={"Plus"}/>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <DialogTitle as="h1" className="text-3xl font-semibold text-white">
                        </DialogTitle>
                        <div className="mt-2 flex items-stretch gap-12 text-white">
                            <div className={"flex flex-col gap-4"}>
                                <h2 className={"text-2xl font-mono font-bold"}>Movement</h2>
                                <div className={"flex flex-col gap-4"}>
                                    <div className={"flex flex-col gap-2"}>
                                        <h3 className={"text-xl"}>Movement Type</h3>
                                        <TypeSelect values={Object.values(MovementType)} labels={MovementTypeLabel}
                                                    value={form.movement.movementType}
                                                    onChange={value => form.setMovement(prev => ({
                                                        ...prev,
                                                        movementType: value,
                                                    }))} placeHolder={"Select a movement type"}/>
                                    </div>
                                    {currOrder?.withRole === CompanyRole.CLIENT
                                        ? (
                                            <div className={"flex flex-col gap-2"}>
                                                <h3 className={"text-xl"}>Product</h3>
                                                <ProductSelect value={form.movement.productPublicId ?? ""}
                                                               onChange={value => form.setMovement(prev => ({
                                                                   ...prev,
                                                                   productPublicId: value
                                                               }))}/>
                                            </div>
                                        )
                                        : (
                                            <div className={"flex flex-col gap-2"}>
                                                <h3 className={"text-xl"}>Material</h3>
                                                <MaterialSelect value={form.movement.materialPublicId ?? ""}
                                                                onChange={value => form.setMovement(prev => ({
                                                                    ...prev,
                                                                    materialPublicId: value
                                                                }))}/>
                                            </div>
                                        )}
                                    <TextField label={"Quantity"} error={fieldErrors?.quantity} inputProps={{
                                        type: "number",
                                        min: 1,
                                        max: 999999,
                                        value: form.movement.quantity,
                                        onChange: e => form.setMovement(prev => ({
                                            ...prev,
                                            quantity: Number(e.target.value)
                                        }))
                                    }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className={`text-red-400 text-xl ${!fieldErrors && error ? "visible" : "invisible"}`}>
                    {!fieldErrors && error ? (getErrorMessage(error)) : "Placeholder"}
                </p>
            </div>
            <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                    Create
                </button>
                <button
                    type="button" onClick={onClose}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}