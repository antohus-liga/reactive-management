import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {type Dispatch, type SetStateAction, type SubmitEvent} from "react";
import {CompanyTypeSelect, CountrySelect} from "@/features/auth/RegisterPage.tsx";
import type {CompanyType} from "@/types/CompanyType.ts";
import {CompanyRole} from "@/types/CompanyRole.ts";
import {getErrorMessage} from "@/lib/getErrorMessage.ts";

export default function NewCompanyModal(
    {open, setOpen, form, error, fieldErrors, handleCreateCompany, toggleRole}: {
        open: boolean,
        setOpen: Dispatch<SetStateAction<boolean>>,
        form: {
            companyName: string, setCompanyName: Dispatch<SetStateAction<string>>
            companyType: CompanyType | "", setCompanyType: Dispatch<SetStateAction<CompanyType | "">>
            roles: CompanyRole[], setRoles: Dispatch<SetStateAction<CompanyRole[]>>
            taxId: string, setTaxId: Dispatch<SetStateAction<string>>
            phoneNumber: string, setPhoneNumber: Dispatch<SetStateAction<string>>
            email: string, setEmail: Dispatch<SetStateAction<string>>
            country: string, setCountry: Dispatch<SetStateAction<string>>
            address: string, setAddress: Dispatch<SetStateAction<string>>
        },
        error: Error | null,
        fieldErrors: Record<string, string> | undefined
        handleCreateCompany: (e: SubmitEvent<HTMLFormElement>) => void,
        toggleRole: (role: CompanyRole, checked: boolean) => void,
    }) {

    return (
        <div>
            <Dialog open={open} onClose={setOpen} className="relative w-10 z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="ml-20 mt-10 fixed inset-0 z-10 w-screen overflow-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform w-fit overflow-auto rounded-lg text-left shadow-xl bg-gray-800 outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <form onSubmit={handleCreateCompany}>
                                <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                                    <div className="sm:flex sm:items-start">
                                        <div
                                            className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
                                            <img className={"size-2/3"} src={"/plus.png"} alt={"Plus"}/>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <DialogTitle as="h1" className="text-3xl font-semibold text-white">
                                                Create New Company
                                            </DialogTitle>
                                            <div className="mt-2 grid grid-cols-2 items-stretch gap-12 text-white">
                                                <div className={"flex flex-col gap-4"}>
                                                    <h2 className={"text-2xl font-mono font-bold"}>Company
                                                        Information</h2>
                                                    <label className={"flex flex-col gap-2 text-xl"}>
                                                        Company Name
                                                        <input type="text" placeholder={"Enter your company name"}
                                                               required={true}
                                                               value={form.companyName}
                                                               onChange={(e) => form.setCompanyName(e.target.value)}
                                                               className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
                                                        {fieldErrors?.companyName &&
                                                            <p className="text-red-400 text-xl">{fieldErrors.companyName}</p>}
                                                    </label>
                                                    <label className={"flex flex-col gap-2 text-xl"}>
                                                        Company Type
                                                        <CompanyTypeSelect
                                                            value={form.companyType}
                                                            setValue={form.setCompanyType}
                                                        />
                                                        {fieldErrors?.companyType &&
                                                            <p className="text-red-400 text-xl">{fieldErrors.companyType}</p>}
                                                    </label>
                                                    <label className={"flex flex-col gap-2 text-xl"}>
                                                        Tax ID
                                                        <input type="text" placeholder={"Enter your company tax ID"}
                                                               required={true}
                                                               value={form.taxId}
                                                               onChange={(e) => form.setTaxId(e.target.value)}
                                                               className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
                                                        {fieldErrors?.taxId &&
                                                            <p className="text-red-400 text-xl">{fieldErrors.taxId}</p>}
                                                    </label>
                                                </div>
                                                <div className={"flex flex-col gap-4"}>
                                                    <h2 className={"text-2xl font-mono font-bold"}>Company
                                                        Contacts</h2>
                                                    <label className={"flex flex-col gap-2 text-xl"}>
                                                        Phone number
                                                        <input type="text"
                                                               placeholder={"Enter your company phone number"}
                                                               required={true}
                                                               value={form.phoneNumber}
                                                               onChange={(e) => form.setPhoneNumber(e.target.value)}
                                                               className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
                                                        {fieldErrors?.phoneNumber &&
                                                            <p className="text-red-400 text-xl">{fieldErrors.phoneNumber}</p>}
                                                    </label>
                                                    <label className={"flex flex-col gap-2 text-xl"}>
                                                        Email
                                                        <input name="email" type="email"
                                                               placeholder={"Enter your company email address"}
                                                               required={true}
                                                               value={form.email}
                                                               onChange={(e) => form.setEmail(e.target.value)}
                                                               className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
                                                        {fieldErrors?.email &&
                                                            <p className="text-red-400 text-xl">{fieldErrors.email}</p>}
                                                    </label>
                                                </div>
                                                <div className={"flex flex-col gap-4"}>
                                                    <h2 className={"text-2xl font-mono font-bold"}>Company
                                                        Localization</h2>
                                                    <label className={"flex flex-col gap-2 text-xl"}>
                                                        Country
                                                        <CountrySelect
                                                            value={form.country}
                                                            setValue={form.setCountry}
                                                        />
                                                        {fieldErrors?.country &&
                                                            <p className="text-red-400 text-xl">{fieldErrors.country}</p>}
                                                    </label>
                                                    <label className={"flex flex-col gap-2 text-xl"}>
                                                        Address
                                                        <input type="text"
                                                               placeholder={"Enter your company address"}
                                                               required={true}
                                                               value={form.address}
                                                               onChange={(e) => form.setAddress(e.target.value)}
                                                               className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
                                                        {fieldErrors?.address &&
                                                            <p className="text-red-400 text-xl">{fieldErrors.address}</p>}
                                                    </label>
                                                </div>
                                                <div className={"flex flex-col gap-4"}>
                                                    <h2 className={"text-2xl font-mono font-bold"}>Roles</h2>
                                                    <label
                                                        className="flex items-center gap-3 text-xl cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={form.roles.includes(CompanyRole.CLIENT)}
                                                            onChange={(e) => toggleRole(CompanyRole.CLIENT, e.target.checked)}
                                                            className="h-5 w-5 rounded border-gray-500 bg-gray-700 text-sky-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0"
                                                        />
                                                        <span>Client</span>
                                                    </label>

                                                    <label
                                                        className="flex items-center gap-3 text-xl cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={form.roles.includes(CompanyRole.SUPPLIER)}
                                                            onChange={(e) => toggleRole(CompanyRole.SUPPLIER, e.target.checked)}
                                                            className="h-5 w-5 rounded border-gray-500 bg-gray-700 text-sky-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0"
                                                        />
                                                        <span>Supplier</span>
                                                    </label>
                                                    {fieldErrors?.roles &&
                                                        <p className="text-red-400 text-xl">{fieldErrors.roles}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`text-red-400 text-xl ${!fieldErrors && error ? "visible" : "invisible"}`}>
                                        {!fieldErrors && error ? getErrorMessage(error) : "Placeholder"}
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
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
