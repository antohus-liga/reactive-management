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
import {useTranslation} from "react-i18next";

export default function CategoriesPage() {
    const categories = useCategories();
    const modal = useCategoryModal();
    const [nameFilter, setNameFilter] = useState("");
    const {t} = useTranslation();

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
                placeholder={t("filterByCategory")}
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="mb-4 px-3 py-2 border rounded-md w-full max-w-sm"
            />

            <DataTable
                loading={categories.get.isLoading}
                empty={!categories.get.isLoading && filteredCategories?.length === 0}
                emptyMessage={t("categoriesNotFound")}
            >
                <DataTableHead>
                    <DataTableHeader>{t("name")}</DataTableHeader>
                    <DataTableHeader>{t("color")}</DataTableHeader>
                    <DataTableHeader>{t("type")}</DataTableHeader>
                    <DataTableHeader>{t("createdAt")}</DataTableHeader>
                    <DataTableHeader>{t("updatedAt")}</DataTableHeader>
                    <DataTableHeader className="text-right">{t("actions")}</DataTableHeader>
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
                {t("newCategory")}
            </Button>
        </>
    );
}