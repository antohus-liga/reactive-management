import type {ProductRecipeResponse, ProductResponse} from "@/features/products/api.ts";
import {useState} from "react";
import {useFetchProductRecipe} from "@/features/products/hooks.ts";
import {MeasurementTypeLabel} from "@/types/MeasurementType.ts";

export default function ProductRow({product, onDelete, onEdit, onRecipeReplace}: {
    product: ProductResponse,
    onDelete: (publicId: string) => void,
    onEdit: (product: ProductResponse) => void,
    onRecipeReplace: (recipe: ProductRecipeResponse | null, productPublicId: string) => void,
}) {
    const [showInfo, setShowInfo] = useState(false);
    const color = product.categoryColor;
    const recipe = useFetchProductRecipe(product.publicId)
    return (
        <>
            <tr className={"border-b transition duration-200"} style={{backgroundColor: `${color}90`}}>
                <td className={"p-4"}>{product.description}</td>
                <td className={"p-4 flex items-center gap-4"}>
                    <div className={"p-3 w-10 h-10 outline-1"} style={{backgroundColor: `${color}`}}/>
                    {product.categoryDescription}
                </td>
                <td className={"p-4"}>{product.fixedPrice ? `(Fixed) ${product.fixedPrice}` : `(Margin) ${product.sellingMargin}`}</td>
                <td className={"p-4"}>{product.quantity + " " + MeasurementTypeLabel[product.measurement]}</td>
                <td className={"p-4"}>{product.productionCost}</td>
                <td className={"p-4"}>{product.price}</td>
                <td className={"p-4"}>{new Date(product.createdAt).toLocaleString()}</td>
                <td className={"p-4"}>{new Date(product.updatedAt).toLocaleString()}</td>
                <td className={"p-4"}>
                    <div className={"flex gap-3"}>
                        <button className={"bg-blue-300 hover:bg-blue-400 p-2 rounded-lg transition outline-2"}
                                onClick={() => {
                                    onEdit(product)
                                }}>
                            <img className={"size-6"} src={"/edit.png"} alt={"Edit"}/>
                        </button>
                        <button className={"bg-red-300 hover:bg-red-400 p-2 rounded-lg transition outline-2"}
                                onClick={() => onDelete(product.publicId)}>
                            <img className={"size-6"} src={"/delete.png"} alt={"Delete"}/>
                        </button>
                        <span/>
                        <span/>
                        <button className={"bg-purple-300 hover:bg-purple-400 p-2 rounded-lg transition outline-2"}
                                onClick={() => setShowInfo(!showInfo)}>
                            <img className={"size-6"} src={"/show.png"} alt={"Recipe"}/>
                        </button>
                        <button className={"bg-green-300 hover:bg-green-400 p-2 rounded-lg transition outline-2"}
                                onClick={() => onRecipeReplace(recipe.data ?? null, product.publicId)}>
                            <img className={"size-6"} src={"/recipe.png"} alt={"Recipe"}/>
                        </button>
                    </div>
                </td>
            </tr>
            <tr className={"w-full"}>
                {!recipe.data || !(recipe.data.ingredients.length > 0) ? (
                    <td colSpan={9}>
                        <div
                            className={`grid transition-[grid-template-rows] duration-300 ${showInfo ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                            <div
                                className={"overflow-hidden text-xl transition-all duration-500 w-full"}>
                                There's no recipe yet
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
                                        className={"w-full text-left table-auto bg-amber-700 bg-clip-border"}>
                                        <thead>
                                        <tr className={"border-b"}>
                                            <th className={"p-4"}>Material</th>
                                            <th className={"p-4"}>Unit Price</th>
                                            <th className={"p-4"}>Quantity</th>
                                        </tr>
                                        </thead>
                                        <tbody className={"divide-y"}>
                                        {recipe.data.ingredients.map(ingredient => (
                                            <tr key={ingredient.materialPublicId}>
                                                <td className={"p-4"}>{ingredient.materialDescription}</td>
                                                <td className={"p-4"}>{ingredient.materialUnitPrice}</td>
                                                <td className={"p-4"}>{ingredient.quantityNeeded + " " + MeasurementTypeLabel[ingredient.materialMeasurement]}</td>
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
