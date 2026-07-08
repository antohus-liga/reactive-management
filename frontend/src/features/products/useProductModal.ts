import {useState} from "react";
import type {ProductResponse} from "@/features/products/api.ts";

export default function useProductModal() {
    const [open, setOpen] = useState(false);
    const [updateTarget, setUpdateTarget] = useState<ProductResponse | null>(null);

    function openForCreate() {
        setOpen(true);
        setUpdateTarget(null);
    }

    function openForUpdate(updateTarget: ProductResponse) {
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