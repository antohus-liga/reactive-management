import useCategories from "@/features/categories/useCategories.ts";
import type {CategoryResponse} from "@/features/categories/api.ts";
import CategoryRow from "@/features/categories/CategoryRow.tsx";
import CategoryModal from "@/features/categories/CategoryModal.tsx";
import useCategoryModal from "@/features/categories/useCategoryModal.ts";

export default function CategoriesPage() {
    const categories = useCategories();
    const modal = useCategoryModal();

    if (categories.get.isLoading) return null;
    if (categories.get.isError) return null;

    return (
        <>
            <CategoryModal open={modal.open} updateTarget={modal.updateTarget} onClose={modal.close}/>
            <div
                className={"relative flex flex-col w-auto max-h-[calc(100vh-18rem)] overflow-y-auto shadow-md shadow-white rounded-xl bg-clip-border"}>
                <table className={"w-full text-left table-auto"}>
                    <thead>
                    <tr className={"border-b bg-green-900"}>
                        <th className={"p-4"}>Name</th>
                        <th className={"p-4"}>Color</th>
                        <th className={"p-4"}>Created At</th>
                        <th className={"p-4"}>Updated At</th>
                        <th className={"p-4"}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.get.data?.map((category: CategoryResponse) => (
                        <CategoryRow key={category.publicId} category={category}
                                    onDelete={categories.handleDeleteCategory}
                                    onEdit={modal.openForUpdate}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
            <div className={"mt-10"}>
                <button onClick={modal.openForCreate}
                        className={"p-3 bg-emerald-700 border-2 border-emerald-700 hover:bg-emerald-500 active:bg-emerald-600 active:scale-95 rounded-xl transition duration-100"}>New
                    Category
                </button>
            </div>
        </>
    );
}