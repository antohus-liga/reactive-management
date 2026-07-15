import {useCompanyForm} from "@/features/companies/useCompanyForm.ts";
import {DialogTitle} from "@headlessui/react";
import {CountrySelect} from "@/features/auth/RegisterPage.tsx";
import {CompanyType, CompanyTypeLabel} from "@/types/CompanyType.ts";
import {CompanyRole} from "@/types/CompanyRole.ts";
import {getErrorMessage, getFieldErrors} from "@/lib/getErrorMessage.ts";
import type {CompanyResponse} from "@/features/companies/api.ts";
import Checkbox from "@/components/Checkbox.tsx";
import TextField from "@/components/TextField.tsx";
import {TypeSelect} from "@/components/TypeSelect.tsx";
import FormSectionTitle from "@/components/FormSectionTitle.tsx";
import Button from "@/components/Button";
import Badge from "@/components/Badge.tsx";
import {Building2, Check, X} from "lucide-react";
import {useTranslation} from "react-i18next";

export default function CompanyForm(
    {
        initial,
        onClose,
    }: {
        initial: CompanyResponse | null;
        onClose: () => void;
    }) {
    const {t} = useTranslation();
    const form = useCompanyForm(initial);

    const error = form.create.error ?? form.update.error;
    const fieldErrors = getFieldErrors(error);

    return (
        <form onSubmit={(e) => form.handleSubmit(e, initial, onClose)}>
            <div className="px-6 py-5">
                <div className="flex items-start gap-4">
                    <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/10">
                        <Building2 className="dark:invert" size={16}/>
                    </div>

                    <div className="flex-1">
                        <DialogTitle as="h1" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            {initial ? t("updateCompany") : t("createNewCompany") }
                        </DialogTitle>

                        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
                            <section className="space-y-4">
                                <FormSectionTitle>
                                    {t("companyInfo")}
                                </FormSectionTitle>

                                <TextField
                                    label={t("companyName")} error={fieldErrors?.companyName}
                                    inputProps={{
                                        placeholder: t("companyNamePlaceholder"),
                                        value: form.company.companyName,
                                        onChange: (e) =>
                                            form.setCompany(prev => ({
                                                ...prev,
                                                companyName: e.target.value
                                            })),
                                    }}
                                />

                                <label
                                    className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    {t("companyType")}
                                    <TypeSelect
                                        value={form.company.companyType as CompanyType}
                                        onChange={(companyType) =>
                                            form.setCompany(prev => ({
                                                ...prev,
                                                companyType,
                                            }))
                                        }
                                        values={Object.values(CompanyType)}
                                        labels={CompanyTypeLabel} placeHolder={t("companyTypePlaceholder")}
                                    />

                                    {fieldErrors?.companyType && (
                                        <p className="text-xs text-red-500">
                                            {fieldErrors.companyType}
                                        </p>
                                    )}
                                </label>

                                <TextField
                                    label={t("taxId")} error={fieldErrors?.taxId}
                                    inputProps={{
                                        placeholder: t("taxIdPlaceholder"),
                                        value: form.company.taxId,
                                        onChange: (e) =>
                                            form.setCompany(prev => ({
                                                ...prev,
                                                taxId: e.target.value
                                            })),
                                    }}
                                />
                            </section>

                            <section className="space-y-4">
                                <FormSectionTitle>
                                    {t("companyContacts")}
                                </FormSectionTitle>

                                <TextField
                                    label={t("phone")} error={fieldErrors?.phoneNumber}
                                    inputProps={{
                                        placeholder: t("phonePlaceholder"),
                                        value: form.company.phoneNumber,
                                        onChange: (e) =>
                                            form.setCompany(prev => ({
                                                ...prev,
                                                phoneNumber: e.target.value
                                            })),
                                    }}
                                />

                                <TextField
                                    label={t("email")} error={fieldErrors?.email}
                                    inputProps={{
                                        type: "email", placeholder: t("emailPlaceholder"),
                                        value: form.company.email,
                                        onChange: (e) =>
                                            form.setCompany(prev => ({
                                                ...prev,
                                                email: e.target.value
                                            })),
                                    }}
                                />
                            </section>

                            <section className="space-y-4">
                                <FormSectionTitle>
                                    {t("companyLocalization")}
                                </FormSectionTitle>

                                <label
                                    className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    {t("country")}
                                    <CountrySelect
                                        value={form.company.country}
                                        setValue={(country) => form.setCompany(prev => ({
                                            ...prev,
                                            country,
                                        }))
                                        }
                                    />

                                    {fieldErrors?.country && (
                                        <p className="text-xs text-red-500">
                                            {fieldErrors.country}
                                        </p>
                                    )}
                                </label>

                                <TextField
                                    label={t("address")} error={fieldErrors?.address}
                                    inputProps={{
                                        placeholder: t("addressPlaceholder"),
                                        value: form.company.address,
                                        onChange: (e) => form.setCompany(prev => ({
                                            ...prev,
                                            address: e.target.value
                                        })),
                                    }}
                                />
                            </section>

                            <section className="space-y-4">
                                <FormSectionTitle>
                                    {t("roles")}
                                </FormSectionTitle>

                                <div className="space-y-2">
                                    <label
                                        className="flex items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                                        <Checkbox
                                            label={t("client")}
                                            checked={form.company.roles.includes(CompanyRole.CLIENT)}
                                            onChange={(checked) => form.toggleRole(CompanyRole.CLIENT, checked)}
                                        />

                                        <Badge variant="info">
                                            {t("client")}
                                        </Badge>
                                    </label>

                                    <label
                                        className="flex items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                                        <Checkbox
                                            label={t("supplier")}
                                            checked={form.company.roles.includes(CompanyRole.SUPPLIER)}
                                            onChange={(checked) => form.toggleRole(CompanyRole.SUPPLIER, checked)}
                                        />
                                        <Badge>
                                            {t("supplier")}
                                        </Badge>
                                    </label>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                <p className={`mt-4 text-sm text-red-500 ${!fieldErrors && error ? "visible" : "invisible"}`}>
                    {!fieldErrors && error ? getErrorMessage(error) : "Placeholder"}
                </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">
                <Button type="button" variant="secondary" icon={<X/>} onClick={onClose}>
                    {t("cancel")}
                </Button>

                <Button type="submit" icon={<Check/>}>
                    {initial ? t("update") : t("create")}
                </Button>
            </div>
        </form>
    );
}
