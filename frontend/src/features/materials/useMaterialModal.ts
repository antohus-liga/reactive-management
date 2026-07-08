import {useState} from "react";
import type {MaterialResponse} from "@/features/materials/api.ts";

export default function useMaterialModal() {
    const [open, setOpen] = useState(false);
    const [updateTarget, setUpdateTarget] = useState<MaterialResponse | null>(null);

    function openForCreate() {
        setOpen(true);
        setUpdateTarget(null);
    }

    function openForUpdate(updateTarget: MaterialResponse) {
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