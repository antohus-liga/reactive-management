import type {CompanyResponse} from "@/features/companies/api.ts";
import {useState} from "react";

export default function useCompanyModal() {
    const [open, setOpen] = useState<boolean>(false);
    const [updateTarget, setUpdateTarget] = useState<CompanyResponse | null>(null);

    function openForCreate() {
        setOpen(true);
        setUpdateTarget(null);
    }

    function openForUpdate(company: CompanyResponse) {
        setOpen(true);
        setUpdateTarget(company);
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