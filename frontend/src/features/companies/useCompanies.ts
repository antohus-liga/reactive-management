import type {SubmitEvent} from "react";
import {useState} from "react";
import type {CompanyType} from "@/types/CompanyType.ts";
import type {CompanyRole} from "@/types/CompanyRole.ts";
import {useCreateCompany, useDeleteCompany, useFetchCompanies, useUpdateCompany} from "@/features/companies/hooks.ts";
import type {CompanyResponse} from "@/features/companies/api.ts";

export default function useCompanies() {
    const [companyName, setCompanyName] = useState<string>("");
    const [companyType, setCompanyType] = useState<CompanyType | "">("");
    const [roles, setRoles] = useState<Array<CompanyRole>>([])
    const [taxId, setTaxId] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [updateTarget, setUpdateTarget] = useState<CompanyResponse | null>(null);

    const state = {
        companyName, setCompanyName,
        companyType, setCompanyType,
        roles, setRoles,
        taxId, setTaxId,
        phoneNumber, setPhoneNumber,
        email, setEmail,
        country, setCountry,
        address, setAddress,
        open, setOpen,
        updateTarget, setUpdateTarget,
    }

    const get = useFetchCompanies()
    const create = useCreateCompany();
    const update = useUpdateCompany();
    const deleteCompany = useDeleteCompany();

    function toggleRole(role: CompanyRole, checked: boolean) {
        setRoles((current) =>
            checked
                ? [...current, role]
                : current.filter((r) => r !== role)
        )
    }

    function handleCreateCompany(e: SubmitEvent<HTMLFormElement>, updateTarget: CompanyResponse | null) {
        e.preventDefault();
        if (updateTarget === null) {
            create.mutate({
                companyName,
                companyType,
                roles,
                taxId,
                phoneNumber,
                email,
                country,
                address,
            }, {onSuccess: () => setOpen(false)});
            return;
        } else {
            update.mutate({
                publicId: updateTarget.publicId,
                payload: {
                    companyName,
                    companyType,
                    roles,
                    taxId,
                    phoneNumber,
                    email,
                    country,
                    address,
                }
            }, {
                onSuccess: () => {
                    setOpen(false);
                    setUpdateTarget(null)
                }
            });
        }
    }

    function handleDeleteCompany(publicId: string) {
        deleteCompany.mutate(publicId)
    }

    return {
        state,
        handleCreateCompany,
        handleDeleteCompany,
        toggleRole,
        get,
        create,
        update,
    };

}