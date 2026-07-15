import {useCurrentUser, useLogout, useUpdateUser} from "@/features/auth/hooks.ts";
import {useMatches} from "react-router-dom";
import {type SubmitEvent, useState} from "react";
import {TypeSelect} from "@/components/TypeSelect.tsx";
import {getErrorMessage, getFieldErrors} from "@/lib/getErrorMessage.ts";
import type {UserUpdatePayload} from "@/features/auth/api.ts";
import {CompanyType, CompanyTypeLabel} from "@/types/CompanyType.ts";
import TextField from "@/components/TextField.tsx";
import {CountrySelect} from "@/features/auth/RegisterPage.tsx";
import ThemeToggle from "@/components/ThemeToggle.tsx";
import LanguageSwitcher from "@/components/LanguageSwitcher.tsx";
import {useTranslation} from "react-i18next";
import Modal from "@/components/Modal.tsx";
import {Settings, LogOut} from "lucide-react";
import Button from "@/components/Button.tsx";

export default function Topbar() {
    const {data: user} = useCurrentUser()
    const logout = useLogout()
    const matches = useMatches()
    const title = (matches.at(-1)?.handle as { title?: string } | undefined)?.title ?? "";
    const {t} = useTranslation();

    const [open, setOpen] = useState(false);

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <UserForm onClose={() => setOpen(false)}/>
            </Modal>
            <header
                className="fixed top-0 left-0 right-0 h-16 bg-slate-200 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 z-50 px-6 flex items-center shadow-sm">
                <div className="mr-auto">
                    <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{t(title)}</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end text-sm leading-tight">
                        <span className="font-medium text-zinc-700 dark:text-zinc-200">{user?.companyName}</span>
                        <span className="text-zinc-400 dark:text-zinc-500">{user?.email}</span>
                    </div>

                    <div className="w-px bg-zinc-200 dark:bg-zinc-700 h-8"/>

                    <LanguageSwitcher/>
                    <ThemeToggle/>

                    <button
                        className="bg-slate-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-md transition-colors duration-150 p-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                        onClick={() => setOpen(true)}
                        aria-label="Settings"
                    >
                        <Settings className={"dark:text-zinc-300"} size={20}/>
                    </button>
                    <button
                        className="bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-md transition-colors duration-150 p-2 text-sm font-medium cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
                        onClick={() => logout.mutate()}
                    >
                        <LogOut size={20}/>
                    </button>
                </div>
            </header>
        </>
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
    const {t} = useTranslation();

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
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        {t("companyInfo")}
                    </h2>
                    <TextField label={t("companyName")} error={fieldErrors?.companyName} inputProps={{
                        placeholder: t("companyNamePlaceholder"),
                        value: update.companyName,
                        onChange: e => setUpdate(prev => ({
                            ...prev,
                            companyName: e.target.value
                        })),
                    }}/>
                    <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {t("companyType")}
                        <TypeSelect values={Object.values(CompanyType)} labels={CompanyTypeLabel}
                                    value={update.companyType}
                                    onChange={value => setUpdate(prev => ({
                                        ...prev,
                                        companyType: value
                                    }))}
                                    placeHolder={t("companyTypePlaceholder")}/>
                        {fieldErrors?.companyType &&
                            <p className="text-red-500 text-xs font-normal">{fieldErrors.companyType}</p>}
                    </label>
                    <TextField label={t("taxId")} error={fieldErrors?.taxId} inputProps={{
                        placeholder: t("taxIdPlaceholder"),
                        value: update.taxId,
                        onChange: e => setUpdate(prev => ({
                            ...prev,
                            taxId: e.target.value
                        })),
                    }}/>
                </div>
                <div className="hidden sm:block w-px bg-zinc-200 dark:bg-zinc-800"/>
                <div className="flex flex-col gap-4 flex-1">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        {t("companyContacts")}
                    </h2>
                    <TextField label={t("phone")} error={fieldErrors?.phoneNumber} inputProps={{
                        placeholder: t("phonePlaceholder"),
                        value: update.phoneNumber,
                        onChange: e => setUpdate(prev => ({
                            ...prev,
                            phoneNumber: e.target.value
                        })),
                    }}/>
                    <TextField label={t("email")} error={fieldErrors?.email} inputProps={{
                        type: "email",
                        placeholder: t("emailPlaceholder"),
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
                <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {t("companyLocalization")}
                </h2>
                <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {t("country")}
                    <CountrySelect value={update.country} setValue={value => setUpdate(prev => ({
                        ...prev,
                        country: value
                    }))}/>
                    {fieldErrors?.country && <p className="text-red-500 text-xs font-normal">{fieldErrors.country}</p>}
                </label>
                <TextField label={t("address")} error={fieldErrors?.address} inputProps={{
                    placeholder: t("addressPlaceholder"),
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
                        {t("cancel")}
                    </button>
                    <button
                        disabled={editUser.isPending}
                        type="submit"
                        className="w-fit disabled:opacity-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium border border-blue-600 rounded-md transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                    >
                        {t("confirm")}
                    </button>
                </div>
            </div>
        </form>
    );
}
