import {DialogTitle} from "@headlessui/react";
import {getErrorMessage, getFieldErrors} from "@/lib/getErrorMessage.ts";
import type {CategoryResponse} from "@/features/categories/api.ts";
import {useCategoryForm} from "./useCategoryForm";
import {CategoryType} from "@/types/CategoryType.ts";
import TextField from "@/components/TextField.tsx";
import Checkbox from "@/components/Checkbox.tsx";

export default function CategoryForm({initial, onClose}: {
    initial: CategoryResponse | null,
    onClose: () => void,
}) {
    const form = useCategoryForm(initial);
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
                            {initial ? "Update Category" : "Create New Category"}
                        </DialogTitle>
                        <div className="mt-2 flex items-stretch gap-12 text-white">
                            <div className={"flex flex-col gap-4"}>
                                <h2 className={"text-2xl font-mono font-bold"}>Category</h2>
                                <TextField label={"Name"} error={fieldErrors?.name} inputProps={{
                                    placeholder: "Enter your category name", value: form.category.name,
                                    onChange: (e) => form.setCategory(prev => ({
                                        ...prev,
                                        name: e.target.value
                                    }))
                                }}/>
                                <label className={"flex flex-col gap-2 text-xl"}>
                                    Color
                                    <input type={"color"} required={true} value={form.category.colorHex}
                                           onChange={(e) => form.setCategory(prev => ({
                                               ...prev,
                                               colorHex: e.target.value
                                           }))}
                                           className={"p-2 rounded-lg ring-1 w-22 h-11 text-xl placeholder:text-lg"}/>
                                    {fieldErrors?.colorHex &&
                                        <p className="text-red-400 text-xl">{fieldErrors.colorHex}</p>}
                                </label>
                                <h2 className={"text-2xl font-mono font-bold"}>Types</h2>
                                <div className={"bg-[#ff6f00]/80 p-2 rounded-lg max-w-fit"}>
                                    <Checkbox label={"Material"}
                                              checked={form.category.types.includes(CategoryType.MATERIAL)}
                                              onChange={(checked) => form.toggleType(CategoryType.MATERIAL, checked)}
                                    />
                                </div>
                                <div className={"bg-[#000000]/80 p-2 rounded-lg max-w-fit"}>
                                <Checkbox label={"Product"}
                                          checked={form.category.types.includes(CategoryType.PRODUCT)}
                                          onChange={(checked) => form.toggleType(CategoryType.PRODUCT, checked)}
                                />
                                </div>
                                {fieldErrors?.types && <p className="text-red-400 text-xl">{fieldErrors.types}</p>}
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
