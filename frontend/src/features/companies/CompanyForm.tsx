import {useCompanyForm} from "@/features/companies/useCompanyForm.ts";
import {DialogTitle} from "@headlessui/react";
import {CompanyTypeSelect, CountrySelect} from "@/features/auth/RegisterPage.tsx";
import {type InputHTMLAttributes, useEffect} from "react";
import type {CompanyType} from "@/types/CompanyType.ts";
import {CompanyRole} from "@/types/CompanyRole.ts";
import {getErrorMessage, getFieldErrors} from "@/lib/getErrorMessage.ts";
import type {CompanyResponse} from "@/features/companies/api.ts";

interface CompanyFormProps {
    setOpen: (value: boolean) => void,
    initial?: CompanyResponse,
    setUpdateTarget: (value: CompanyResponse | undefined) => void,
}

export default function CompanyForm({setOpen, initial, setUpdateTarget}: CompanyFormProps) {
    const form = useCompanyForm();
    const error = form.create.error ?? form.update.error;
    const fieldErrors = getFieldErrors(error);

    useEffect(() => {
        if (initial)
            form.setCompany({
                companyName: initial.companyName,
                companyType: initial.companyType,
                taxId: initial.taxId,
                phoneNumber: initial.phoneNumber,
                email: initial.email,
                country: initial.country,
                address: initial.address,
                roles: initial.roles,
            });
        else
            form.setCompany({
                companyName: "",
                companyType: "",
                taxId: "",
                phoneNumber: "",
                email: "",
                country: "",
                address: "",
                roles: [],
            })
    }, [form, initial])

    return (
        <form onSubmit={(e) => form.handleSubmit(e, setOpen, setUpdateTarget, initial)}>
            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                <div className="sm:flex sm:items-start">
                    <div
                        className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
                        <img className={"size-2/3"} src={"/plus.png"} alt={"Plus"}/>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <DialogTitle as="h1" className="text-3xl font-semibold text-white">
                            {initial ? "Update Company" : "Create New Company"}
                        </DialogTitle>
                        <div className="mt-2 grid grid-cols-2 items-stretch gap-12 text-white">
                            <div className={"flex flex-col gap-4"}>
                                <h2 className={"text-2xl font-mono font-bold"}>Company
                                    Information</h2>
                                <TextField label={"Company Name"} error={fieldErrors?.companyName} inputProps={{
                                    placeholder: "Enter your company name", value: form.company.companyName,
                                    onChange: (e) => form.setCompany(prev => ({
                                        ...prev,
                                        companyName: e.target.value
                                    }))
                                }}/>
                                <label className={"flex flex-col gap-2 text-xl"}>
                                    Company Type
                                    <CompanyTypeSelect
                                        value={form.company.companyType as CompanyType}
                                        onChange={(companyType) => {
                                            form.setCompany(prev => ({
                                                ...prev,
                                                companyType: companyType
                                            }));
                                            console.log(form.company.companyType)
                                        }}/>
                                    {fieldErrors?.companyType &&
                                        <p className="text-red-400 text-xl">{fieldErrors.companyType}</p>}
                                </label>
                                <TextField label={"Tax ID"} error={fieldErrors?.taxId} inputProps={{
                                    placeholder: "Enter your company tax ID", value: form.company.taxId,
                                    onChange: (e) => form.setCompany(prev => ({
                                        ...prev,
                                        taxId: e.target.value
                                    }))
                                }}/>
                            </div>
                            <div className={"flex flex-col gap-4"}>
                                <h2 className={"text-2xl font-mono font-bold"}>Company
                                    Contacts</h2>
                                <TextField label={"Phone number"} error={fieldErrors?.phoneNumber} inputProps={{
                                    placeholder: "Enter your company phone number", value: form.company.phoneNumber,
                                    onChange: (e) => form.setCompany(prev => ({
                                        ...prev,
                                        phoneNumber: e.target.value
                                    }))
                                }}/>
                                <TextField label={"Email"} error={fieldErrors?.email} inputProps={{
                                    placeholder: "Enter your company email address", value: form.company.email,
                                    onChange: (e) => form.setCompany(prev => ({
                                        ...prev,
                                        email: e.target.value
                                    }))
                                }}/>
                            </div>
                            <div className={"flex flex-col gap-4"}>
                                <h2 className={"text-2xl font-mono font-bold"}>Company
                                    Localization</h2>
                                <label className={"flex flex-col gap-2 text-xl"}>
                                    Country
                                    <CountrySelect
                                        value={form.company.country}
                                        setValue={(country) => form.setCompany(prev => ({
                                            ...prev,
                                            country: country,
                                        }))}
                                    />
                                    {fieldErrors?.country &&
                                        <p className="text-red-400 text-xl">{fieldErrors.country}</p>}
                                </label>
                                <TextField label={"Address"} error={fieldErrors?.address} inputProps={{
                                    placeholder: "Enter your company address", value: form.company.address,
                                    onChange: (e) => form.setCompany(prev => ({
                                        ...prev,
                                        address: e.target.value
                                    }))
                                }}/>
                            </div>
                            <div className={"flex flex-col gap-4"}>
                                <h2 className={"text-2xl font-mono font-bold"}>Roles</h2>
                                <RoleCheckbox label={"Client"} checked={form.company.roles.includes(CompanyRole.CLIENT)}
                                              onChange={(checked) => form.toggleRole(CompanyRole.CLIENT, checked)}
                                />
                                <RoleCheckbox label={"Supplier"}
                                              checked={form.company.roles.includes(CompanyRole.SUPPLIER)}
                                              onChange={(checked) => form.toggleRole(CompanyRole.SUPPLIER, checked)}
                                />
                                {fieldErrors?.roles && <p className="text-red-400 text-xl">{fieldErrors.roles}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <p className={`text-red-400 text-xl ${!fieldErrors && error ? "visible" : "invisible"}`}>
                    {!fieldErrors && error ? (getErrorMessage(error)) : "Placeholder"}
                </p>
            </div>
            <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                    Create
                </button>
                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

function TextField({label, error, inputProps}: {
    label: string,
    error?: string,
    inputProps: InputHTMLAttributes<HTMLInputElement>
}) {
    return (
        <label className={"flex flex-col gap-2 text-xl"}>
            {label}
            <input {...inputProps} required={true} type={"text"}
                   className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
            {error && <p className="text-red-400 text-xl">{error}</p>}
        </label>
    );
}

function RoleCheckbox({label, checked, onChange}: {
    label: string,
    checked: boolean,
    onChange: (checked: boolean) => void
}) {
    return (
        <label
            className="flex items-center gap-3 text-xl cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="h-5 w-5 rounded border-gray-500 bg-gray-700 text-sky-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0"
            />
            <span>{label}</span>
        </label>
    );
}