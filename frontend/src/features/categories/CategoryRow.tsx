import type {CategoryResponse} from "@/features/categories/api.ts";
import {CategoryType} from "@/types/CategoryType.ts";

export default function CategoryRow({category, onDelete, onEdit}: {
    category: CategoryResponse,
    onDelete: (publicId: string) => void,
    onEdit: (category: CategoryResponse) => void,
}) {
    const materialColor = "#ff6f00"
    const productColor = "#000000"
    const bothColor = "#a63f00"

    const color =
        category.types.includes(CategoryType.MATERIAL) && category.types.includes(CategoryType.PRODUCT)
            ? bothColor
            : category.types.includes(CategoryType.PRODUCT)
                ? productColor
                : materialColor
    return (
        <>
            <tr className={"border-b transition duration-200"} style={{backgroundColor: color}}>
                <td className={"p-4"}>{category.name}</td>
                <td className={"p-4 flex items-center gap-4"}>
                    <div className={"w-10 h-10 outline-1"} style={{backgroundColor: category.colorHex}}/>
                    {category.colorHex}</td>
                <td className={"p-4"}>{new Date(category.createdAt).toLocaleString()}</td>
                <td className={"p-4"}>{new Date(category.updatedAt).toLocaleString()}</td>
                <td className={"p-4"}>
                    <div className={"flex gap-3"}>
                        <button className={"bg-blue-300 hover:bg-blue-400 p-2 rounded-lg transition outline-2"}
                                onClick={() => onEdit(category)}>
                            <img className={"size-6"} src={"/edit.png"} alt={"Edit"}/>
                        </button>
                        <button className={"bg-red-300 hover:bg-red-400 p-2 rounded-lg transition outline-2"}
                                onClick={() => onDelete(category.publicId)}>
                            <img className={"size-6"} src={"/delete.png"} alt={"Delete"}/>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
}