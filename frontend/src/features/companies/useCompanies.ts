import {useState} from "react";
import {useDeleteCompany, useFetchCompanies} from "@/features/companies/hooks.ts";
import type {CompanyResponse} from "@/features/companies/api.ts";

export default function useCompanies() {
    const [open, setOpen] = useState<boolean>(false);
    const [updateTarget, setUpdateTarget] = useState<CompanyResponse | undefined>(undefined);

    const state = {
        open, setOpen,
        updateTarget, setUpdateTarget,
    }

    const get = useFetchCompanies()
    const deleteCompany = useDeleteCompany();

    function handleDeleteCompany(publicId: string) {
        deleteCompany.mutate(publicId)
    }

    return {
        state,
        handleDeleteCompany,
        get,
    };
}