import {DialogTitle} from "@headlessui/react";
import {getErrorMessage, getFieldErrors} from "@/lib/getErrorMessage.ts";
import TextField from "@/components/TextField.tsx";
import {useMaterialForm} from "@/features/materials/useMaterialForm.ts";
import type {MaterialResponse} from "@/features/materials/api.ts";
import CategorySelect from "@/components/CategorySelect.tsx";
import {CategoryType} from "@/types/CategoryType.ts";
import {TypeSelect} from "@/components/TypeSelect.tsx";
import {MeasurementType, MeasurementTypeLabel} from "@/types/MeasurementType.ts";

export default function MaterialForm({initial, onClose}: {
    initial: MaterialResponse | null,
    onClose: () => void,
}) {
    const form = useMaterialForm(initial);
    const error = form.create.error ?? form.update.error;
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
                            {initial ? "Update Material" : "Create New Material"}
                        </DialogTitle>
                        <div className="mt-2 flex items-stretch gap-12 text-white">
                            <div className={"flex flex-col gap-4"}>
                                <h2 className={"text-2xl font-mono font-bold"}>Material</h2>
                                <TextField label={"Description"} error={fieldErrors?.description} inputProps={{
                                    placeholder: "Enter your category name", value: form.material.description,
                                    onChange: (e) => form.setMaterial(prev => ({
                                        ...prev,
                                        description: e.target.value
                                    }))
                                }}/>
                                <div>
                                    <label className={"flex flex-col gap-2 text-xl"}>
                                        Measurement Type
                                        <TypeSelect values={Object.values(MeasurementType)} labels={MeasurementTypeLabel}
                                                    value={form.material.measurement}
                                                    onChange={value => form.setMaterial(prev => ({
                                                        ...prev,
                                                        measurement: value
                                                    }))}
                                                    placeHolder={"Select a measurement type"}/>
                                        {fieldErrors?.measurement &&
                                            <p className="text-red-400 text-xl">{fieldErrors.measurement}</p>}
                                    </label>
                                </div>
                                <TextField label={"Unit Price"} error={fieldErrors?.unitPrice} inputProps={{
                                    type: "number",
                                    value: form.material.unitPrice,
                                    onChange: (e) => form.setMaterial(prev => ({
                                        ...prev,
                                        unitPrice: Number(e.target.value)
                                    }))
                                }}/>
                                <TextField label={"Quantity"} error={fieldErrors?.quantity} inputProps={{
                                    disabled: !initial,
                                    type: "number",
                                    value: form.material.quantity,
                                    onChange: (e) => form.setMaterial(prev => ({
                                        ...prev,
                                        quantity: Number(e.target.value)
                                    }))
                                }}/>
                                <h2 className={"text-2xl font-mono font-bold"}>Category</h2>
                                <div>
                                    <CategorySelect value={form.material.categoryPublicId}
                                                    onChange={value => form.setMaterial(prev => ({
                                                        ...prev,
                                                        categoryPublicId: value
                                                    }))}
                                                    type={CategoryType.MATERIAL}
                                    />
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
                    {initial ? "Update" : "Create"}
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
