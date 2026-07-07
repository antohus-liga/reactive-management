import {useDeleteCategory, useFetchCategories} from "@/features/categories/hooks.ts";

export default function useCategories() {
    const get = useFetchCategories()
    const deleteCategory = useDeleteCategory();

    function handleDeleteCategory(publicId: string) {
        deleteCategory.mutate(publicId)
    }

    return {
        handleDeleteCategory,
        get,
    };
}
