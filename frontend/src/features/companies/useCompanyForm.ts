import {type SubmitEvent, useState} from "react";
import type {CompanyRequest, CompanyResponse} from "@/features/companies/api.ts";
import type {CompanyRole} from "@/types/CompanyRole.ts";
import {useCreateCompany, useUpdateCompany} from "@/features/companies/hooks.ts";

export function useCompanyForm(initial: CompanyResponse | null) {
    const [company, setCompany] = useState<CompanyRequest>(() =>
        initial
            ? {
                companyName: initial.companyName,
                companyType: initial.companyType,
                taxId: initial.taxId,
                phoneNumber: initial.phoneNumber,
                email: initial.email,
                country: initial.country,
                address: initial.address,
                roles: initial.roles,
            }
            : {
                address: "",
                companyType: "",
                country: "",
                email: "",
                phoneNumber: "",
                roles: [],
                taxId: "",
                companyName: ""
            }
    );

    const create = useCreateCompany();
    const update = useUpdateCompany();

    function toggleRole(role: CompanyRole, checked: boolean) {
        const roles = checked
            ? [...company.roles, role]
            : company.roles.filter((r) => r !== role)
        setCompany(prev => ({...prev, roles: roles}))
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>, updateTarget: CompanyResponse | null, onClose: () => void) {
        e.preventDefault();
        if (!updateTarget)
            create.mutate(company, {onSuccess: onClose});
        else
            update.mutate({publicId: updateTarget.publicId, payload: company}, {onSuccess: onClose,});
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


