import {DialogTitle} from "@headlessui/react";
import {getErrorMessage, getFieldErrors} from "@/lib/getErrorMessage.ts";
import {useProductionOrderForm} from "@/features/productionOrders/useProductionOrderForm.ts";
import ProductSelect from "@/components/ProductSelect.tsx";
import TextField from "@/components/TextField.tsx";

export default function ProductionOrderForm({onClose}: { onClose: () => void }) {
    const form = useProductionOrderForm();
    const error = form.create.error
    const fieldErrors = getFieldErrors(error);

    if (form.getProducts.isLoading) return null;

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
                            Create New Production Order
                        </DialogTitle>
                        <div className="mt-2 flex items-stretch gap-12 text-white">
                            <div className={"flex flex-col gap-4"}>
                                <h2 className={"text-2xl font-mono font-bold"}>Product</h2>
                                <ProductSelect
                                    value={form.production.productPublicId}
                                    onChange={value => form.setProduction(prev => ({
                                        ...prev,
                                        productPublicId: value,
                                    }))}
                                />
                                <div>
                                    <TextField label={"Quantity"} error={fieldErrors?.quantity} inputProps={{
                                        type: "number",
                                        min: 1,
                                        max: 999999,
                                        value: form.production.quantity,
                                        onChange: e => form.setProduction(prev => ({
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
