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

export default function MaterialsPage() {
    const materials = useMaterials();
    const modal = useMaterialModal();

    return (
        <>
            <Modal open={modal.open} onClose={modal.close}>
                <MaterialForm initial={modal.updateTarget} onClose={modal.close}/>
            </Modal>

            <DataTable
                loading={materials.get.isLoading}
                empty={!materials.get.isLoading && materials.get.data?.length === 0}
                emptyMessage="No companies found."
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
                {materials.get.data?.map((material: MaterialResponse) => (
                    <MaterialRow
                        key={material.publicId}
                        material={material}
                        onDelete={materials.handleDeleteMaterial}
                        onEdit={modal.openForUpdate}
                    />
                ))}
                </tbody>
            </DataTable>
            <Button
                className={"mt-5"}
                onClick={modal.openForCreate}
                icon={<Plus size={16}/>}
            >
                New Material
            </Button>
        </>
    );
}
