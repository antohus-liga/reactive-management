import {type SubmitEvent, useState} from "react";
import type {CategoryRequest, CategoryResponse} from "@/features/categories/api.ts";
import {useCreateCategory, useUpdateCategory} from "@/features/categories/hooks.ts";
import type {CategoryType} from "@/types/CategoryType.ts";

export function useCategoryForm(initial: CategoryResponse | null) {
    const [category, setCategory] = useState<CategoryRequest>(() =>
        initial
            ? {
                name: initial.name,
                colorHex: initial.colorHex,
                types: initial.types,
            }
            : {
                name: "",
                colorHex: "#f59e0b",
                types: [],
            }
    );

    const create = useCreateCategory();
    const update = useUpdateCategory();

    function toggleType(type: CategoryType, checked: boolean) {
        const types = checked
            ? [...category.types, type]
            : category.types.filter((t) => t !== type)
        setCategory(prev => ({...prev, types: types}))
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>, onClose: () => void) {
        e.preventDefault();
        if (!initial)
            create.mutate(category, {onSuccess: onClose});
        else
            update.mutate({publicId: initial.publicId, payload: category}, {onSuccess: onClose});
    }

    return {
        category,
        setCategory,
        handleSubmit,
        toggleType,
        create,
        update,
    }
}


