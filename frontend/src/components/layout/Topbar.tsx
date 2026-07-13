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
import ThemeToggle from "@/components/ThemeToggle.tsx";

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
                className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 z-50 px-6 flex items-center shadow-sm">
                <div className="mr-auto">
                    <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{title}</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end text-sm leading-tight">
                        <span className="font-medium text-zinc-700 dark:text-zinc-200">{user?.companyName}</span>
                        <span className="text-zinc-400 dark:text-zinc-500">{user?.email}</span>
                    </div>

                    <div className="w-px bg-zinc-200 dark:bg-zinc-700 h-8"/>

                    <ThemeToggle/>

                    <button
                        className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 rounded-md transition-colors duration-150 p-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                        onClick={() => setOpen(true)}
                        aria-label="Settings"
                    >
                        <img className="dark:invert size-5" src="/settings.png" alt="Settings"/>
                    </button>
                    <button
                        className="bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-md transition-colors duration-150 px-3 py-2 text-sm font-medium cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
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
            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="relative transform w-full max-w-2xl overflow-hidden rounded-lg text-left shadow-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95"
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
            className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-lg p-8 gap-6 flex flex-col">
            <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex flex-col gap-4 flex-1">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Company
                        Information</h2>
                    <TextField label={"Company Name"} error={fieldErrors?.companyName} inputProps={{
                        placeholder: "Enter your company name",
                        value: update.companyName,
                        onChange: e => setUpdate(prev => ({
                            ...prev,
                            companyName: e.target.value
                        })),
                    }}/>
                    <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Company Type
                        <TypeSelect values={Object.values(CompanyType)} labels={CompanyTypeLabel}
                                    value={update.companyType}
                                    onChange={value => setUpdate(prev => ({
                                        ...prev,
                                        companyType: value
                                    }))}
                                    placeHolder={"Select your company type"}/>
                        {fieldErrors?.companyType &&
                            <p className="text-red-500 text-xs font-normal">{fieldErrors.companyType}</p>}
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
                <div className="hidden sm:block w-px bg-zinc-200 dark:bg-zinc-800"/>
                <div className="flex flex-col gap-4 flex-1">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Company
                        Contacts</h2>
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
            <hr className="border-zinc-200 dark:border-zinc-800"/>
            <div className="flex flex-col gap-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Company
                    Localization</h2>
                <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Country
                    <CountrySelect value={update.country} setValue={value => setUpdate(prev => ({
                        ...prev,
                        country: value
                    }))}/>
                    {fieldErrors?.country && <p className="text-red-500 text-xs font-normal">{fieldErrors.country}</p>}
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
            <div className="flex flex-col justify-center items-center gap-3">
                <p className={`text-red-500 text-sm ${!fieldErrors && error ? "visible" : "invisible"}`}>
                    {!fieldErrors && error ? getErrorMessage(error) : "Placeholder"}
                </p>
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="w-fit disabled:opacity-50 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 px-4 py-2 text-sm font-medium border border-zinc-200 dark:border-zinc-700 rounded-md transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={editUser.isPending}
                        type="submit"
                        className="w-fit disabled:opacity-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium border border-blue-600 rounded-md transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </form>
    );
}
