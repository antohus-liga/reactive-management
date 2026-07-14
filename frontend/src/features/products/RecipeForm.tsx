import {DialogTitle} from "@headlessui/react";
import {useRecipeForm} from "@/features/products/useRecipeForm.ts";
import type {ProductRecipeResponse} from "@/features/products/api.ts";
import {getErrorMessage, getFieldErrors} from "@/lib/getErrorMessage.ts";
import MaterialSelect from "@/components/MaterialSelect.tsx";
import TextField from "@/components/TextField";
import {BookOpen, Check, Package, Trash2, X,} from "lucide-react";
import RepeaterField from "@/components/RepeaterField.tsx";
import Button from "@/components/Button.tsx";

export default function RecipeForm({
                                       productId,
                                       initial,
                                       onClose,
                                   }: {
    productId: string;
    initial: ProductRecipeResponse | null;
    onClose: () => void;
}) {
    const form = useRecipeForm(productId, initial);

    const error = form.replaceRecipe.error;
    const fieldErrors = getFieldErrors(error);

    return (
        <form onSubmit={(e) => form.handleSubmit(e, onClose)}>

            <div className="px-6 py-5">

                <div className="flex items-start gap-4">

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-100
                            dark:bg-blue-500/10
                        "
                    >
                        <BookOpen size={18}/>
                    </div>

                    <div className="flex-1">

                        <DialogTitle
                            as="h1"
                            className="
                                text-xl
                                font-semibold
                                text-zinc-900
                                dark:text-zinc-100
                            "
                        >
                            {initial
                                ? "Update Recipe"
                                : "Create Recipe"}
                        </DialogTitle>

                        <div className="mt-6">

                            <RepeaterField
                                title="Ingredients"
                                description="Add the materials required to manufacture this product."
                                emptyText="No ingredients yet."
                                addLabel="Add Ingredient"
                                onAdd={() =>
                                    form.setRecipe(prev => ({
                                        ...prev,
                                        ingredients: [
                                            ...prev.ingredients,
                                            {
                                                materialPublicId: "",
                                                quantity: 0,
                                            },
                                        ],
                                    }))
                                }
                            >

                                {form.recipe.ingredients.map(
                                    (ingredient, index) => (

                                        <div
                                            key={index}
                                            className="
                                                rounded-xl
                                                border
                                                border-zinc-200
                                                bg-zinc-50
                                                p-4
                                                dark:border-zinc-800
                                                dark:bg-zinc-900/40
                                            "
                                        >

                                            <div className="mb-4 flex items-center gap-2">

                                                <Package
                                                    size={16}
                                                    className="text-zinc-500"
                                                />

                                                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                                                    Ingredient #{index + 1}
                                                </p>

                                            </div>

                                            <div className="grid grid-cols-[1fr_180px_auto] gap-4 items-end">

                                                <div>

                                                    <label
                                                        className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                                        Material
                                                    </label>

                                                    <MaterialSelect
                                                        value={
                                                            ingredient.materialPublicId
                                                        }
                                                        onChange={(value) =>
                                                            form.setRecipe(
                                                                prev => ({
                                                                    ...prev,
                                                                    ingredients:
                                                                        prev.ingredients.map(
                                                                            (
                                                                                ing,
                                                                                i
                                                                            ) =>
                                                                                i ===
                                                                                index
                                                                                    ? {
                                                                                        ...ing,
                                                                                        materialPublicId:
                                                                                        value,
                                                                                    }
                                                                                    : ing
                                                                        ),
                                                                })
                                                            )
                                                        }
                                                    />

                                                </div>

                                                <TextField
                                                    label="Quantity"
                                                    inputProps={{
                                                        type: "number",
                                                        value:
                                                        ingredient.quantity,
                                                        onChange: (
                                                            e
                                                        ) =>
                                                            form.setRecipe(
                                                                prev => ({
                                                                    ...prev,
                                                                    ingredients:
                                                                        prev.ingredients.map(
                                                                            (
                                                                                ing,
                                                                                i
                                                                            ) =>
                                                                                i ===
                                                                                index
                                                                                    ? {
                                                                                        ...ing,
                                                                                        quantity:
                                                                                            Number(
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                            ),
                                                                                    }
                                                                                    : ing
                                                                        ),
                                                                })
                                                            ),
                                                    }}
                                                />

                                                <Button
                                                    type="button"
                                                    variant="danger"
                                                    icon={<Trash2/>}
                                                    onClick={() =>
                                                        form.setRecipe(
                                                            prev => ({
                                                                ...prev,
                                                                ingredients:
                                                                    prev.ingredients.filter(
                                                                        (
                                                                            _,
                                                                            i
                                                                        ) =>
                                                                            i !==
                                                                            index
                                                                    ),
                                                            })
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </Button>

                                            </div>

                                        </div>
                                    )
                                )}

                            </RepeaterField>

                            {fieldErrors?.[
                                "ingredients[].quantity"
                                ] && (
                                <p className="mt-3 text-sm text-red-500">
                                    {
                                        fieldErrors[
                                            "ingredients[].quantity"
                                            ]
                                    }
                                </p>
                            )}

                        </div>

                    </div>

                </div>

                <p
                    className={`
                        mt-6
                        text-sm
                        text-red-500
                        ${
                        !fieldErrors && error
                            ? "visible"
                            : "invisible"
                    }
                    `}
                >
                    {!fieldErrors && error
                        ? getErrorMessage(error)
                        : "Placeholder"}
                </p>

            </div>

            <div
                className="
                    flex
                    justify-end
                    gap-3
                    border-t
                    border-zinc-200
                    px-6
                    py-4
                    dark:border-zinc-800
                "
            >
                <Button
                    type="button"
                    variant="secondary"
                    icon={<X/>}
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    icon={<Check/>}
                >
                    {initial?.ingredients.length ?? 0 > 0 ? "Update" : "Save Recipe"}
                </Button>
            </div>

        </form>
    );
}
