import useMaterials from "@/features/materials/useMaterials.ts";
import type {MaterialResponse} from "@/features/materials/api.ts";
import MaterialRow from "@/features/materials/MaterialRow.tsx";
import useMaterialModal from "@/features/materials/useMaterialModal.ts";
import Modal from "@/components/Modal.tsx";
import MaterialForm from "@/features/materials/MaterialForm.tsx";
import {DataTableHeader} from "@/components/table/DataTableHeader";
import {DataTableHead} from "@/components/table/DataTableHead.tsx";
import DataTable from "@/components/table/DataTable.tsx";
import Button from "@/components/Button.tsx";
import {Plus} from "lucide-react";
import {useMemo, useState} from "react";

export default function MaterialsPage() {
    const materials = useMaterials();
    const modal = useMaterialModal();
    const [nameFilter, setNameFilter] = useState("");

    const filteredMaterials = useMemo(() => {
        if (!nameFilter.trim()) return materials.get.data;
        return materials.get.data?.filter((material: MaterialResponse) =>
            material.description?.toLowerCase().includes(nameFilter.toLowerCase())
        );
    }, [materials.get.data, nameFilter]);

    return (
        <>
            <Modal open={modal.open} onClose={modal.close}>
                <MaterialForm initial={modal.updateTarget} onClose={modal.close}/>
            </Modal>

            <input
                type="text"
                placeholder="Filter by material description..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="mb-4 px-3 py-2 border rounded-md w-full max-w-sm"
            />

            <DataTable loading={materials.get.isLoading}
                       empty={!materials.get.isLoading && filteredMaterials?.length === 0}
                       emptyMessage="No materials found."
            >
                <DataTableHead>
                    <DataTableHeader>Description</DataTableHeader>
                    <DataTableHeader>Category</DataTableHeader>
                    <DataTableHeader>Unit Price</DataTableHeader>
                    <DataTableHeader>Quantity</DataTableHeader>
                    <DataTableHeader>Created At</DataTableHeader>
                    <DataTableHeader>Updated At</DataTableHeader>
                    <DataTableHeader className="text-right">Actions</DataTableHeader>
                </DataTableHead>

                <tbody>
                {filteredMaterials?.map((material: MaterialResponse) => (
                    <MaterialRow key={material.publicId} material={material} onDelete={materials.handleDeleteMaterial}
                                 onEdit={modal.openForUpdate}
                    />
                ))}
                </tbody>
            </DataTable>
            <Button className={"mt-5"} onClick={modal.openForCreate} icon={<Plus size={16}/>}>
                New Material
            </Button>
        </>
    );
}
