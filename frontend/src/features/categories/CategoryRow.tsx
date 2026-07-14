import type {CategoryResponse} from "@/features/categories/api.ts";
import {CategoryType} from "@/types/CategoryType.ts";
import Badge from "@/components/Badge.tsx";
import Button from "@/components/Button.tsx";
import {Pencil, Trash2} from "lucide-react";

export default function CategoryRow(
    {
        category,
        onDelete,
        onEdit,
    }: {
        category: CategoryResponse;
        onDelete: (publicId: string) => void;
        onEdit: (category: CategoryResponse) => void;
    }) {
    const hasMaterial = category.types.includes(CategoryType.MATERIAL);
    const hasProduct = category.types.includes(CategoryType.PRODUCT);

    return (
        <tr className="border-b border-zinc-200 transition-colors duration-150 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
            <td className="px-5 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                {category.name}
            </td>

            <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                    <span className="h-5 w-5 rounded-full border border-zinc-200 shadow-sm dark:border-zinc-700"
                          style={{backgroundColor: category.colorHex,}}
                          aria-label={`Category color ${category.colorHex}`}
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                        {category.colorHex}
                    </span>
                </div>
            </td>

            <td className="px-5 py-4">
                {hasMaterial && hasProduct ? (
                    <Badge variant="indigo">
                        Material & Product
                    </Badge>
                ) : hasMaterial ? (
                    <Badge variant="info">
                        Material
                    </Badge>
                ) : (
                    <Badge variant="neutral">
                        Product
                    </Badge>
                )}
            </td>

            <td className="px-5 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {new Date(category.createdAt).toLocaleString()}
            </td>

            <td className="px-5 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {new Date(category.updatedAt).toLocaleString()}
            </td>

            <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={() => onEdit(category)} icon={<Pencil size={16}/>}>
                        Edit
                    </Button>

                    <Button variant="danger" onClick={() => onDelete(category.publicId)} icon={<Trash2 size={16}/>}>
                        Delete
                    </Button>
                </div>
            </td>
        </tr>
    );
}
