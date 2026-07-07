import {useState} from "react";
import type {CategoryResponse} from "@/features/categories/api.ts";

export default function useCategoryModal() {
    const [open, setOpen] = useState(false);
    const [updateTarget, setUpdateTarget] = useState<CategoryResponse | null>(null);

    function openForCreate() {
        setOpen(true);
        setUpdateTarget(null);
    }

    function openForUpdate(updateTarget: CategoryResponse) {
        setOpen(true);
        setUpdateTarget(updateTarget);
    }

    function close() {
        setOpen(false);
        setUpdateTarget(null);
    }

    return {
        open,
        updateTarget,
        openForCreate,
        openForUpdate,
        close,
    }
}