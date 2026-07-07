import {type SubmitEvent, useState} from "react";
import type {CompanyRequest, CompanyResponse} from "@/features/companies/api.ts";
import type {CompanyRole} from "@/types/CompanyRole.ts";
import {useCreateCompany, useUpdateCompany} from "@/features/companies/hooks.ts";

export function useCompanyForm() {
    const [company, setCompany] = useState<CompanyRequest>({
        address: "", companyType: "", country: "", email: "", phoneNumber: "", roles: [], taxId: "", companyName: ""
    });

    const create = useCreateCompany();
    const update = useUpdateCompany();

    function toggleRole(role: CompanyRole, checked: boolean) {
        const roles = checked
            ? [...company.roles, role]
            : company.roles.filter((r) => r !== role)
        setCompany(prev => ({...prev, roles: roles}))
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>, setOpen: (open: boolean) => void, setUpdateTarget: (updateTarget: CompanyResponse | undefined) => void, updateTarget?: CompanyResponse) {
        e.preventDefault();
        if (!updateTarget) {
            create.mutate(company, {onSuccess: () => setOpen(false)});
        } else {
            update.mutate({publicId: updateTarget.publicId, payload: company}, {
                onSuccess: () => {
                    setUpdateTarget(undefined);
                    setOpen(false);
                }
            });
        }
    }

    return {
        company,
        setCompany,
        handleSubmit,
        toggleRole,
        create,
        update,
    }
}


