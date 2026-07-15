import Button from "@/components/Button";
import type {MaterialResponse} from "@/features/materials/api.ts";
import {MeasurementTypeLabel} from "@/types/MeasurementType.ts";
import {Pencil, Trash2} from "lucide-react";
import {useTranslation} from "react-i18next";

export default function MaterialRow(
    {
        material,
        onDelete,
        onEdit,
    }: {
        material: MaterialResponse;
        onDelete: (publicId: string) => void;
        onEdit: (material: MaterialResponse) => void;
    }) {
    const color = material.categoryColor;
    const {t} = useTranslation();

    return (
        <tr className="border-b border-zinc-200 transition-colors duration-150 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {material.description}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <span className="h-8 w-8 rounded-md border border-zinc-200 shadow-sm dark:border-zinc-700"
                          style={{backgroundColor: color,}}/>
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{material.categoryDescription}</span>
                </div>
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 2,
                }).format(material.unitPrice)} €
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {material.quantity}{" "}
                {MeasurementTypeLabel[material.measurement]}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {new Date(material.createdAt).toLocaleString()}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {new Date(material.updatedAt).toLocaleString()}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={() => onEdit(material)} icon={<Pencil size={16}/>}>
                        {t("edit")}
                    </Button>

                    <Button variant="danger" onClick={() => onDelete(material.publicId)} icon={<Trash2 size={16}/>}>
                        {t("delete")}
                    </Button>
                </div>
            </td>
        </tr>
    );
}
