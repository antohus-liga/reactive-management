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

export default function CompanyForm({
                                        initial,
                                        onClose,
                                    }: {
    initial: CompanyResponse | null;
    onClose: () => void;
}) {
    const form = useCompanyForm(initial);

    const error = form.create.error ?? form.update.error;
    const fieldErrors = getFieldErrors(error);

    return (
        <form onSubmit={(e) => form.handleSubmit(e, initial, onClose)}>

            <div className="px-6 py-5">

                <div className="flex items-start gap-4">

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-100
                            dark:bg-blue-500/10
                        "
                    >
                        <img
                            className="size-5"
                            src="/plus.png"
                            alt="Create company"
                        />
                    </div>


                    <div className="flex-1">

                        <DialogTitle
                            as="h1"
                            className="
                                text-xl
                                font-semibold
                                text-zinc-900
                                dark:text-zinc-100
                            "
                        >
                            {initial
                                ? "Update Company"
                                : "Create New Company"}
                        </DialogTitle>


                        <div
                            className="
                                mt-6
                                grid
                                grid-cols-1
                                gap-8
                                lg:grid-cols-2
                            "
                        >

                            <section className="space-y-4">

                                <FormSectionTitle>
                                    Company Information
                                </FormSectionTitle>


                                <TextField
                                    label="Company Name"
                                    error={fieldErrors?.companyName}
                                    inputProps={{
                                        placeholder:
                                            "Enter your company name",
                                        value:
                                        form.company.companyName,
                                        onChange: (e) =>
                                            form.setCompany(prev => ({
                                                ...prev,
                                                companyName:
                                                e.target.value
                                            })),
                                    }}
                                />


                                <label
                                    className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">

                                    Company Type

                                    <TypeSelect
                                        value={
                                            form.company.companyType as CompanyType
                                        }
                                        onChange={(companyType) =>
                                            form.setCompany(prev => ({
                                                ...prev,
                                                companyType,
                                            }))
                                        }
                                        values={
                                            Object.values(CompanyType)
                                        }
                                        labels={CompanyTypeLabel}
                                        placeHolder="Select a company type"
                                    />

                                    {fieldErrors?.companyType && (
                                        <p className="text-xs text-red-500">
                                            {fieldErrors.companyType}
                                        </p>
                                    )}

                                </label>


                                <TextField
                                    label="Tax ID"
                                    error={fieldErrors?.taxId}
                                    inputProps={{
                                        placeholder:
                                            "Enter company tax ID",
                                        value:
                                        form.company.taxId,
                                        onChange: (e) =>
                                            form.setCompany(prev => ({
                                                ...prev,
                                                taxId:
                                                e.target.value
                                            })),
                                    }}
                                />

                            </section>


                            <section className="space-y-4">

                                <FormSectionTitle>
                                    Company Contacts
                                </FormSectionTitle>


                                <TextField
                                    label="Phone Number"
                                    error={fieldErrors?.phoneNumber}
                                    inputProps={{
                                        placeholder:
                                            "Enter phone number",
                                        value:
                                        form.company.phoneNumber,
                                        onChange: (e) =>
                                            form.setCompany(prev => ({
                                                ...prev,
                                                phoneNumber:
                                                e.target.value
                                            })),
                                    }}
                                />


                                <TextField
                                    label="Email"
                                    error={fieldErrors?.email}
                                    inputProps={{
                                        type: "email",
                                        placeholder:
                                            "Enter email address",
                                        value:
                                        form.company.email,
                                        onChange: (e) =>
                                            form.setCompany(prev => ({
                                                ...prev,
                                                email:
                                                e.target.value
                                            })),
                                    }}
                                />

                            </section>


                            <section className="space-y-4">

                                <FormSectionTitle>
                                    Company Localization
                                </FormSectionTitle>


                                <label
                                    className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">

                                    Country

                                    <CountrySelect
                                        value={form.company.country}
                                        setValue={(country) =>
                                            form.setCompany(prev => ({
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
                                    label="Address"
                                    error={fieldErrors?.address}
                                    inputProps={{
                                        placeholder:
                                            "Enter company address",
                                        value:
                                        form.company.address,
                                        onChange: (e) =>
                                            form.setCompany(prev => ({
                                                ...prev,
                                                address:
                                                e.target.value
                                            })),
                                    }}
                                />

                            </section>


                            <section className="space-y-4">

                                <FormSectionTitle>
                                    Roles
                                </FormSectionTitle>


                                <div className="space-y-2">

                                    <label
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            rounded-lg
                                            border
                                            border-zinc-200
                                            px-3
                                            py-2
                                            dark:border-zinc-800
                                        "
                                    >
                                        <Checkbox
                                            label="Client"
                                            checked={
                                                form.company.roles.includes(
                                                    CompanyRole.CLIENT
                                                )
                                            }
                                            onChange={(checked) =>
                                                form.toggleRole(
                                                    CompanyRole.CLIENT,
                                                    checked
                                                )
                                            }
                                        />

                                        <Badge variant="info">
                                            Client
                                        </Badge>

                                    </label>


                                    <label
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            rounded-lg
                                            border
                                            border-zinc-200
                                            px-3
                                            py-2
                                            dark:border-zinc-800
                                        "
                                    >

                                        <Checkbox
                                            label="Supplier"
                                            checked={
                                                form.company.roles.includes(
                                                    CompanyRole.SUPPLIER
                                                )
                                            }
                                            onChange={(checked) =>
                                                form.toggleRole(
                                                    CompanyRole.SUPPLIER,
                                                    checked
                                                )
                                            }
                                        />

                                        <Badge>
                                            Supplier
                                        </Badge>

                                    </label>

                                </div>

                            </section>

                        </div>

                    </div>

                </div>


                <p
                    className={`
                        mt-4
                        text-sm
                        text-red-500
                        ${!fieldErrors && error ? "visible" : "invisible"}
                    `}
                >
                    {!fieldErrors && error
                        ? getErrorMessage(error)
                        : "Placeholder"}
                </p>

            </div>


            <div
                className="
                    flex
                    justify-end
                    gap-3
                    border-t
                    border-zinc-200
                    px-6
                    py-4
                    dark:border-zinc-800
                "
            >

                <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                >
                    Cancel
                </Button>


                <Button type="submit">
                    {initial ? "Update" : "Create"}
                </Button>

            </div>

        </form>
    );
}
