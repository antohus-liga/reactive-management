import type {CompanyResponse} from "@/features/companies/api.ts";
import {CompanyTypeLabel} from "@/types/CompanyType.ts";
import useCountryOptions from "@/features/auth/useCountryOptions.ts";
import Button from "@/components/Button.tsx";
import Badge from "@/components/Badge.tsx";
import {CompanyRole} from "@/types/CompanyRole.ts";
import {Pencil, Trash2} from "lucide-react";
import {useTranslation} from "react-i18next";

export default function CompanyRow(
    {
        company,
        onDelete,
        onEdit,
    }: {
        company: CompanyResponse;
        onDelete: (publicId: string) => void;
        onEdit: (company: CompanyResponse) => void;
    }) {
    const {t} = useTranslation();
    const {countryLabels} = useCountryOptions();

    return (
        <tr className="border-b border-zinc-200 transition-colors duration-150 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {company.companyName}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {t(CompanyTypeLabel[company.companyType])}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {company.taxId}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {company.phoneNumber}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {company.email}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {countryLabels[company.country] ?? company.country}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {company.address}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {company.roles.includes(CompanyRole.SUPPLIER) &&
                company.roles.includes(CompanyRole.CLIENT) ? (
                    <Badge variant="indigo">
                        {t("supplierAndClient")}
                    </Badge>
                ) : company.roles.includes(CompanyRole.CLIENT) ? (
                    <Badge variant="info">
                        {t("client")}
                    </Badge>
                ) : (
                    <Badge variant="neutral">
                        {t("supplier")}
                    </Badge>
                )}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {new Date(company.createdAt).toLocaleString()}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {new Date(company.updatedAt).toLocaleString()}
            </td>

            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={() => onEdit(company)} icon={<Pencil size={16}/>}>
                        {t("edit")}
                    </Button>

                    <Button variant="danger" onClick={() => onDelete(company.publicId)} icon={<Trash2 size={16}/>}>
                        {t("delete")}
                    </Button>
                </div>
            </td>
        </tr>
    );
}
