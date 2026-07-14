import useCategories from "@/features/categories/useCategories.ts";
import type {CategoryResponse} from "@/features/categories/api.ts";
import CategoryRow from "@/features/categories/CategoryRow.tsx";
import useCategoryModal from "@/features/categories/useCategoryModal.ts";
import DataTable from "@/components/table/DataTable.tsx";
import {DataTableHead} from "@/components/table/DataTableHead.tsx";
import {DataTableHeader} from "@/components/table/DataTableHeader.tsx";
import Button from "@/components/Button";
import Modal from "@/components/Modal.tsx";
import CategoryForm from "@/features/categories/CategoryForm.tsx";
import {Plus} from "lucide-react";
import {useMemo, useState} from "react";

export default function CategoriesPage() {
    const categories = useCategories();
    const modal = useCategoryModal();
    const [nameFilter, setNameFilter] = useState("");

    const filteredCategories = useMemo(() => {
        if (!nameFilter.trim()) return categories.get.data;
        return categories.get.data?.filter((category: CategoryResponse) =>
            category.name?.toLowerCase().includes(nameFilter.toLowerCase())
        );
    }, [categories.get.data, nameFilter]);

    return (
        <>
            <Modal open={modal.open} onClose={modal.close}>
                <CategoryForm initial={modal.updateTarget} onClose={modal.close}/>
            </Modal>

            <input
                type="text"
                placeholder="Filter by category name..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="mb-4 px-3 py-2 border rounded-md w-full max-w-sm"
            />

            <DataTable
                loading={categories.get.isLoading}
                empty={!categories.get.isLoading && filteredCategories?.length === 0}
                emptyMessage="No categories found."
            >
                <DataTableHead>
                    <DataTableHeader>Name</DataTableHeader>
                    <DataTableHeader>Color</DataTableHeader>
                    <DataTableHeader>Type</DataTableHeader>
                    <DataTableHeader>Created At</DataTableHeader>
                    <DataTableHeader>Updated At</DataTableHeader>
                    <DataTableHeader className="text-right">Actions</DataTableHeader>
                </DataTableHead>

                <tbody>
                {filteredCategories?.map((category: CategoryResponse) => (
                    <CategoryRow key={category.publicId} category={category} onDelete={categories.handleDeleteCategory}
                                 onEdit={modal.openForUpdate}
                    />
                ))}
                </tbody>
            </DataTable>
            <Button className={"mt-5"} onClick={modal.openForCreate} icon={<Plus size={16}/>}>
                New Category
            </Button>
        </>
    );
}