import {useCurrentUser, useLogout, useUpdateUser} from "@/features/auth/hooks.ts";
import {useMatches} from "react-router-dom";
import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import {type SubmitEvent, useState} from "react";
import {TypeSelect} from "@/components/TypeSelect.tsx";
import {getErrorMessage, getFieldErrors} from "@/lib/getErrorMessage.ts";
import type {UserUpdatePayload} from "@/features/auth/api.ts";
import {CompanyType, CompanyTypeLabel} from "@/types/CompanyType.ts";
import TextField from "@/components/TextField.tsx";
import {CountrySelect} from "@/features/auth/RegisterPage.tsx";

export default function Topbar() {
    const {data: user} = useCurrentUser()
    const logout = useLogout()
    const matches = useMatches()
    const title =
        (matches.at(-1)?.handle as { title?: string } | undefined)?.title ?? "";

    const [open, setOpen] = useState(false);

    return (
        <>
            <UserModal open={open} setOpen={setOpen}/>
            <header
                className="fixed top-0 left-0 right-0 h-20 bg-gray-700 border-b border-gray-500 z-50 px-6 flex items-center">
                <div className={"mr-auto"}>
                    <h1 className={"text-4xl"}>{title}</h1>
                </div>
                <div className={"flex items-center gap-4"}>
                    <h2>{user?.companyName}</h2>
                    <div className={"w-px bg-white h-12"}/>
                    <h2>{user?.email}</h2>
                    <div className={"w-px bg-white h-12"}/>
                    <button
                        className={"bg-gray-500 hover:bg-gray-400 border-2 border-gray-300 rounded-lg transition duration-200 p-2 text-xl cursor-pointer"}
                        onClick={() => setOpen(true)}
                    >
                        <img className={"size-9"} src={"/settings.png"} alt={"Settings"}/>
                    </button>
                    <button
                        className={"bg-red-700 hover:bg-red-600 border-2 border-red-500 rounded-lg transition duration-200 p-3 text-xl cursor-pointer"}
                        onClick={() => logout.mutate()}
                    >
                        Sign Out
                    </button>
                </div>
            </header>
        </>
    );
}

function UserModal({open, setOpen}: { open: boolean, setOpen: (value: boolean) => void }) {
    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} className="relative w-10 z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="ml-20 mt-10 fixed inset-0 z-10 w-screen overflow-hidden">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform w-fit overflow-hidden rounded-lg text-left shadow-xl bg-gray-800 outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <UserForm onClose={() => setOpen(false)}/>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

function UserForm({onClose}: { onClose: () => void }) {
    const editUser = useUpdateUser();
    const user = useCurrentUser().data ?? null;

    const [update, setUpdate] = useState<UserUpdatePayload>({
        companyName: user?.companyName ?? "",
        companyType: user?.companyType as CompanyType ?? "",
        address: user?.address ?? "",
        country: user?.country ?? "",
        email: user?.email ?? "",
        phoneNumber: user?.phoneNumber ?? "",
        taxId: user?.taxId ?? "",
    });

    const error = editUser.error;
    const fieldErrors = getFieldErrors(error);

    if (!user) return null;

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        editUser.mutate(update, {onSuccess: onClose});
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={"bg-gray-700 text-white drop-shadow-xl drop-shadow-emerald-200 rounded-lg p-8 gap-6 flex flex-col text-2xl"}>
            <div className={"flex gap-4"}>
                <div className={"flex flex-col gap-4"}>
                    <h2 className={"text-2xl font-mono font-bold"}>Company Information</h2>
                    <TextField label={"Company Name"} error={fieldErrors?.companyName} inputProps={{
                        placeholder: "Enter your company name",
                        value: update.companyName,
                        onChange: e => setUpdate(prev => ({
                            ...prev,
                            companyName: e.target.value
                        })),
                    }}/>
                    <label className={"flex flex-col gap-2"}>
                        Company Type
                        <TypeSelect values={Object.values(CompanyType)} labels={CompanyTypeLabel}
                                    value={update.companyType}
                                    onChange={value => setUpdate(prev => ({
                                        ...prev,
                                        companyType: value
                                    }))}
                                    placeHolder={"Select your company type"}/>
                        {fieldErrors?.companyType && <p className="text-red-400 text-xl">{fieldErrors.companyType}</p>}
                    </label>
                    <TextField label={"Tax ID"} error={fieldErrors?.taxId} inputProps={{
                        placeholder: "Enter your company tax ID",
                        value: update.taxId,
                        onChange: e => setUpdate(prev => ({
                            ...prev,
                            taxId: e.target.value
                        })),
                    }}/>
                </div>
                <div className={"flex flex-col gap-4"}>
                    <h2 className={"text-2xl font-mono font-bold"}>Company Contacts</h2>
                    <TextField label={"Phone Number"} error={fieldErrors?.phoneNumber} inputProps={{
                        placeholder: "Enter your company phone number",
                        value: update.phoneNumber,
                        onChange: e => setUpdate(prev => ({
                            ...prev,
                            phoneNumber: e.target.value
                        })),
                    }}/>
                    <TextField label={"Email"} error={fieldErrors?.email} inputProps={{
                        type: "email",
                        placeholder: "Enter your company email",
                        value: update.email,
                        onChange: e => setUpdate(prev => ({
                            ...prev,
                            email: e.target.value
                        })),
                    }}/>
                </div>
            </div>
            <hr className={"w-full"}/>
            <div className={"flex flex-col gap-4"}>
                <h2 className={"text-2xl font-mono font-bold"}>Company Localization</h2>
                <label className={"flex flex-col gap-2"}>
                    Country
                    <CountrySelect value={update.country} setValue={value => setUpdate(prev => ({
                        ...prev,
                        country: value
                    }))}/>
                    {fieldErrors?.country && <p className="text-red-400 text-xl">{fieldErrors.country}</p>}
                </label>
                <TextField label={"Address"} error={fieldErrors?.address} inputProps={{
                    placeholder: "Enter your company address",
                    value: update.address,
                    onChange: e => setUpdate(prev => ({
                        ...prev,
                        address: e.target.value
                    })),
                }}/>
            </div>
            <div className={"flex flex-col justify-center items-center gap-4"}>
                <p className={`text-red-400 text-xl ${!fieldErrors && error ? "visible" : "invisible"}`}>
                    {!fieldErrors && error ? getErrorMessage(error) : "Placeholder"}
                </p>
                <div className={"flex gap-2"}>
                    <button
                        type={"button"}
                        className={"mt-2 w-fit disabled:blur-xs bg-gray-400 p-2 text-lg border-2 border-gray-500 rounded-xl hover:bg-gray-600 transition duration-200"}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={editUser.isPending}
                        type={"submit"}
                        className={"mt-2 w-fit disabled:blur-xs bg-green-500 p-2 text-lg border-2 border-green-600 rounded-xl hover:bg-green-700 transition duration-200"}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </form>
    );
}
