import {useState} from "react";
import type {CompanyType} from "@/types/CompanyType.ts";
import type {CompanyRole} from "@/types/CompanyRole.ts";
import {useCreateCompany, useFetchCompanies} from "@/features/companies/hooks.ts";
import type {SubmitEvent} from "react";

export default function useCompanies() {
    const [companyName, setCompanyName] = useState<string>("");
    const [companyType, setCompanyType] = useState<CompanyType | "">("");
    const [roles, setRoles] = useState<Array<CompanyRole>>([])
    const [taxId, setTaxId] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    const state = {
        companyName, setCompanyName,
        companyType, setCompanyType,
        roles, setRoles,
        taxId, setTaxId,
        phoneNumber, setPhoneNumber,
        email, setEmail,
        country, setCountry,
        address, setAddress,
    }

    const get = useFetchCompanies()
    const create = useCreateCompany();

    function toggleRole(role: CompanyRole, checked: boolean) {
        setRoles((current) =>
            checked
                ? [...current, role]
                : current.filter((r) => r !== role)
        )
    }

    function handleCreateCompany(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        create.mutate({
            companyName,
            companyType,
            roles,
            taxId,
            phoneNumber,
            email,
            country,
            address,
        })
    }

    return {
        state,
        handleCreateCompany,
        toggleRole,
        get,
        create,
    };
}