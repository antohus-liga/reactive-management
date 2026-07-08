import useMaterials from "@/features/materials/useMaterials.ts";
import type {MaterialResponse} from "@/features/materials/api.ts";
import MaterialRow from "@/features/materials/MaterialRow.tsx";
import MaterialModal from "@/features/materials/MaterialModal.tsx";
import useMaterialModal from "@/features/materials/useMaterialModal.ts";

export default function MaterialsPage() {
    const materials = useMaterials();
    const modal = useMaterialModal();

    if (materials.get.isLoading) return null;
    if (materials.get.isError) return null;

    return (
        <>
            <MaterialModal open={modal.open} updateTarget={modal.updateTarget} onClose={modal.close}/>
            <div
                className={"relative flex flex-col w-auto max-h-[calc(100vh-25rem)] overflow-y-auto shadow-md shadow-white rounded-xl bg-clip-border"}>
                <table className={"w-full text-left table-auto bg-black"}>
                    <thead>
                    <tr className={"border-b bg-amber-700"}>
                        <th className={"p-4"}>Description</th>
                        <th className={"p-4"}>Category</th>
                        <th className={"p-4"}>Unit Price</th>
                        <th className={"p-4"}>Quantity</th>
                        <th className={"p-4"}>Created At</th>
                        <th className={"p-4"}>Updated At</th>
                        <th className={"p-4"}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {materials.get.data?.map((material: MaterialResponse) => (
                        <MaterialRow key={material.publicId} material={material} onDelete={materials.handleDeleteMaterial}
                                    onEdit={modal.openForUpdate}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
            <div className={"mt-10"}>
                <button onClick={() => modal.openForCreate()}
                        className={"p-3 bg-emerald-700 border-2 border-emerald-700 hover:bg-emerald-500 active:bg-emerald-600 active:scale-95 rounded-xl transition duration-100"}>New
                    Material
                </button>
            </div>
        </>
    );
}
