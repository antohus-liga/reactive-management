import type {MaterialResponse} from "@/features/materials/api.ts";
import {MeasurementTypeLabel} from "@/types/MeasurementType.ts";

export default function MaterialRow({material, onDelete, onEdit}: {
    material: MaterialResponse,
    onDelete: (publicId: string) => void,
    onEdit: (company: MaterialResponse) => void,
}) {

    const color = material.categoryColor;
    return (
        <>
            <tr className={"border-b transition duration-200"} style={{backgroundColor: `${color}90`}}>
                <td className={"p-4"}>{material.description}</td>
                <td className={"p-4 flex items-center gap-4"}>
                    <div className={"p-3 w-10 h-10 outline-1"} style={{backgroundColor: `${color}`}}/>
                    {material.categoryDescription}
                </td>
                <td className={"p-4"}>{material.unitPrice}</td>
                <td className={"p-4"}>{material.quantity + " " + MeasurementTypeLabel[material.measurement]}</td>
                <td className={"p-4"}>{new Date(material.createdAt).toLocaleString()}</td>
                <td className={"p-4"}>{new Date(material.updatedAt).toLocaleString()}</td>
                <td className={"p-4"}>
                    <div className={"flex gap-3"}>
                        <button className={"bg-blue-300 hover:bg-blue-400 p-2 rounded-lg transition outline-2"}
                                onClick={() => {
                                    onEdit(material)
                                }}>
                            <img className={"size-6"} src={"/edit.png"} alt={"Edit"}/>
                        </button>
                        <button className={"bg-red-300 hover:bg-red-400 p-2 rounded-lg transition outline-2"}
                                onClick={() => onDelete(material.publicId)}>
                            <img className={"size-6"} src={"/delete.png"} alt={"Delete"}/>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
}
