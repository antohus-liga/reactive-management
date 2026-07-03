import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import useNewCompanyModal from "@/features/companies/useNewCompanyModal.ts";
import type {Dispatch, SetStateAction} from "react";
import {CompanyTypeSelect, CountrySelect} from "@/features/auth/RegisterPage.tsx";

export default function NewCompanyModal({open, setOpen}: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
    const modal = useNewCompanyModal()

    return (
        <div>
            <Dialog open={open} onClose={setOpen} className="relative w-10 z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="ml-20 mt-10 fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <form>
                                <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div
                                            className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
                                            <img className={"size-2/3"} src={"/plus.png"} alt={"Plus"}/>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <DialogTitle as="h1" className="text-3xl font-semibold text-white">
                                                Create New Company
                                            </DialogTitle>
                                            <div className="mt-2 flex flex-col text-white gap-4">
                                                <div className={"flex flex-col gap-4"}>
                                                    <h2 className={"text-2xl font-mono font-bold"}>Company
                                                        Information</h2>
                                                    <label className={"flex flex-col gap-2 text-xl"}>
                                                        Company Name
                                                        <input type="text" placeholder={"Enter your company name"}
                                                               required={true}
                                                               value={modal.companyName}
                                                               onChange={(e) => modal.setCompanyName(e.target.value)}
                                                               className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
                                                        {/*{fieldErrors?.companyName && <p className="text-red-400 text-xl">{fieldErrors.companyName}</p>}*/}
                                                    </label>
                                                    <label className={"flex flex-col gap-2 text-xl"}>
                                                        Company Type
                                                        <CompanyTypeSelect
                                                            value={modal.companyType}
                                                            setValue={modal.setCompanyType}
                                                        />
                                                        {/*{fieldErrors?.companyType &&*/}
                                                        {/*    <p className="text-red-400 text-xl">{fieldErrors.companyType}</p>}*/}
                                                    </label>
                                                    <label className={"flex flex-col gap-2 text-xl"}>
                                                        Tax ID
                                                        <input type="text" placeholder={"Enter your company tax ID"}
                                                               required={true}
                                                               value={modal.taxId}
                                                               onChange={(e) => modal.setTaxId(e.target.value)}
                                                               className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
                                                        {/*{fieldErrors?.taxId &&*/}
                                                        {/*    <p className="text-red-400 text-xl">{fieldErrors.taxId}</p>}*/}
                                                    </label>
                                                </div>
                                                <hr className={"w-full"}/>
                                                <div className={"flex flex-col gap-4"}>
                                                    <h2 className={"text-2xl font-mono font-bold"}>Company Contacts</h2>
                                                    <label className={"flex flex-col gap-2 text-xl"}>
                                                        Phone number
                                                        <input type="text"
                                                               placeholder={"Enter your company phone number"}
                                                               required={true}
                                                               value={modal.phoneNumber}
                                                               onChange={(e) => modal.setPhoneNumber(e.target.value)}
                                                               className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
                                                        {/*{fieldErrors?.phoneNumber &&*/}
                                                        {/*    <p className="text-red-400 text-xl">{fieldErrors.phoneNumber}</p>}*/}
                                                    </label>
                                                    <label className={"flex flex-col gap-2 text-xl"}>
                                                        Email
                                                        <input name="email" type="email"
                                                               placeholder={"Enter your company email address"}
                                                               required={true}
                                                               value={modal.email}
                                                               onChange={(e) => modal.setEmail(e.target.value)}
                                                               className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
                                                        {/*{fieldErrors?.email &&*/}
                                                        {/*    <p className="text-red-400 text-xl">{fieldErrors.email}</p>}*/}
                                                    </label>
                                                </div>
                                                <hr className={"w-full"}/>
                                                <div className={"flex flex-col gap-4"}>
                                                    <h2 className={"text-3xl font-mono font-bold"}>Company
                                                        Localization</h2>
                                                    <label className={"flex flex-col gap-2 text-xl"}>
                                                        Country
                                                        <CountrySelect
                                                            value={modal.country}
                                                            setValue={modal.setCountry}
                                                        />
                                                        {/*{fieldErrors?.country &&*/}
                                                        {/*    <p className="text-red-400 text-xl">{fieldErrors.country}</p>}*/}
                                                    </label>
                                                    <label className={"flex flex-col gap-2 text-xl"}>
                                                        Address
                                                        <input type="text" placeholder={"Enter your company address"}
                                                               required={true}
                                                               value={modal.address}
                                                               onChange={(e) => modal.setAddress(e.target.value)}
                                                               className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
                                                        {/*{fieldErrors?.address &&*/}
                                                        {/*    <p className="text-red-400 text-xl">{fieldErrors.address}</p>}*/}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="submit"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            setOpen(false)
                                        }}
                                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500 sm:ml-3 sm:w-auto"
                                    >
                                        Create
                                    </button>
                                    <button
                                        type="button"
                                        data-autofocus
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
