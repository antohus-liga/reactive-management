import {DialogTitle} from "@headlessui/react";
import {useRecipeForm} from "@/features/products/useRecipeForm.ts";
import type {ProductRecipeResponse} from "@/features/products/api.ts";
import {getErrorMessage, getFieldErrors} from "@/lib/getErrorMessage.ts";
import MaterialSelect from "@/components/MaterialSelect.tsx";
import TextField from "@/components/TextField";

export default function RecipeForm({productId, initial, onClose}: {
    productId: string,
    initial: ProductRecipeResponse | null,
    onClose: () => void,
}) {

    const form = useRecipeForm(productId, initial);
    const error = form.replaceRecipe.error;
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
                                <h2 className={"text-2xl font-mono font-bold"}>Product Recipe</h2>
                                <div className={"flex flex-col gap-4"}>
                                    {form.recipe.ingredients.map((ingredient, index) => (
                                        <div key={index} className={"flex gap-4 items-end"}>
                                            <div className={"flex flex-col gap-2"}>
                                                <h2 className={"text-xl"}>Ingredient</h2>
                                                <MaterialSelect value={ingredient.materialPublicId}
                                                                onChange={(value) => form.setRecipe(prev => ({
                                                                    ...prev,
                                                                    ingredients: prev.ingredients.map((ing, i) =>
                                                                        i === index ? {
                                                                            ...ing,
                                                                            materialPublicId: value
                                                                        } : ing
                                                                    ),
                                                                }))}
                                                />
                                            </div>
                                            <TextField label={"Quantity"} inputProps={{
                                                type: "number",
                                                value: ingredient.quantity,
                                                onChange: (e) => form.setRecipe(prev => ({
                                                    ...prev,
                                                    ingredients: prev.ingredients.map((ing, i) =>
                                                        i === index ? {...ing, quantity: Number(e.target.value)} : ing
                                                    ),
                                                }))
                                            }}/>
                                            <button
                                                className={"hover:cursor-pointer"}
                                                type="button"
                                                onClick={() =>
                                                    form.setRecipe(prev => ({
                                                        ...prev,
                                                        ingredients: prev.ingredients.filter((_, i) => i !== index),
                                                    }))
                                                }
                                            >
                                                <img className={"size-11"} src={"/minus.png"} alt={"Remove"}/>
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        className={"hover:cursor-pointer"}
                                        type="button"
                                        onClick={() =>
                                            form.setRecipe(prev => ({
                                                ...prev,
                                                ingredients: [...prev.ingredients, { materialPublicId: "", quantity: 0 }],
                                            }))
                                        }
                                    >
                                        <img className={"size-10"} src={"/plus.png"} alt={"Plus"} />
                                    </button>
                                    <p className={"text-red-400"}>{fieldErrors?.["ingredients[].quantity"]}</p>
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