import type {ProductRecipeResponse, ProductResponse} from "@/features/products/api.ts";
import {useState} from "react";
import {useFetchProductRecipe} from "@/features/products/hooks.ts";
import {MeasurementTypeLabel} from "@/types/MeasurementType.ts";
import ColorSwatch from "@/components/ColorSwatch.tsx";
import Badge from "@/components/Badge.tsx";
import Button from "@/components/Button.tsx";
import {BookOpen, Eye, EyeOff, Pencil, Trash2} from "lucide-react";

export default function ProductRow(
    {
        product,
        onDelete,
        onEdit,
        onRecipeReplace,
    }: {
        product: ProductResponse;
        onDelete: (publicId: string) => void;
        onEdit: (product: ProductResponse) => void;
        onRecipeReplace: (
            recipe: ProductRecipeResponse | null,
            productPublicId: string
        ) => void;
    }) {
    const [showInfo, setShowInfo] = useState(false);

    const recipe = useFetchProductRecipe(product.publicId);

    return (
        <>
            <tr className="border-b border-zinc-200 transition-colors duration-150 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
                <td className="px-5 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                    {product.description}
                </td>

                <td className="px-5 py-4">
                    <ColorSwatch
                        color={product.categoryColor}
                        label={product.categoryDescription}
                    />
                </td>

                <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                        {product.fixedPrice ? (
                            <>
                                <Badge variant="success">
                                    Fixed
                                </Badge>

                                <span className="text-zinc-700 dark:text-zinc-300">
                                    {new Intl.NumberFormat("en-US", {
                                        notation: "compact",
                                        maximumFractionDigits: 2,
                                    }).format(product.fixedPrice)} €
                                </span>
                            </>
                        ) : (
                            <>
                                <Badge variant="warning">
                                    Margin
                                </Badge>

                                <span className="text-zinc-700 dark:text-zinc-300">
                                    {product.sellingMargin}
                                </span>
                            </>
                        )}

                    </div>
                </td>

                <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300">
                    {product.quantity}{" "}
                    {MeasurementTypeLabel[product.measurement]}
                </td>

                <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300">
                    {new Intl.NumberFormat("en-US", {
                        notation: "compact",
                        maximumFractionDigits: 2,
                    }).format(product.productionCost)} €
                </td>

                <td className="px-5 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                    {new Intl.NumberFormat("en-US", {
                        notation: "compact",
                        maximumFractionDigits: 2,
                    }).format(product.price)} €
                </td>

                <td className="px-5 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                    {new Date(product.createdAt).toLocaleString()}
                </td>

                <td className="px-5 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                    {new Date(product.updatedAt).toLocaleString()}
                </td>

                <td className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <Button variant="secondary" onClick={() => onEdit(product)} icon={<Pencil size={16}/>}>
                            Edit
                        </Button>

                        <Button variant="danger" onClick={() => onDelete(product.publicId)} icon={<Trash2 size={16}/>}>
                            Delete
                        </Button>

                        <Button variant="secondary" onClick={() => setShowInfo(!showInfo)}
                                icon={showInfo ? <EyeOff size={16}/> : <Eye size={16}/>}
                        >
                            {showInfo ? "Hide Recipe" : "View Recipe"}
                        </Button>

                        <Button onClick={() => onRecipeReplace(recipe.data ?? null, product.publicId)}
                                icon={<BookOpen size={16}/>}
                        >
                            Edit Recipe
                        </Button>
                    </div>
                </td>
            </tr>

            <tr>
                <td colSpan={9} className="p-0">
                    <div
                        className={`grid transition-[grid-template-rows] duration-300 ${showInfo ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                        <div className="overflow-hidden">
                            <div
                                className="m-4 rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">

                                {!recipe.data || recipe.data.ingredients.length === 0 ? (
                                    <div className="p-6 text-sm text-zinc-500 dark:text-zinc-400">
                                        This product doesn't have a recipe yet.
                                    </div>
                                ) : (
                                    <table className="w-full text-left">
                                        <thead className="border-b border-zinc-200 dark:border-zinc-800">
                                        <tr>
                                            <th className="px-5 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                                Material
                                            </th>
                                            <th className="px-5 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                                Unit Price
                                            </th>
                                            <th className="px-5 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                                Quantity
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {recipe.data.ingredients.map(
                                            (ingredient) => (
                                                <tr
                                                    key={ingredient.materialPublicId}
                                                    className="border-b last:border-none border-zinc-200 dark:border-zinc-800"
                                                >
                                                    <td className="px-5 py-4">
                                                        {ingredient.materialDescription}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        {new Intl.NumberFormat("en-US", {
                                                            style: "currency",
                                                            currency: "EUR",
                                                        }).format(ingredient.materialUnitPrice)}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        {ingredient.quantityNeeded}{" "}
                                                        {MeasurementTypeLabel[ingredient.materialMeasurement]}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
}
