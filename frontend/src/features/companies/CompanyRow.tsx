import type {CompanyResponse} from "@/features/companies/api.ts";
import {CompanyTypeLabel} from "@/types/CompanyType.ts";
import {countryLabels} from "@/features/auth/countryOptions.ts";
import {CompanyRole} from "@/types/CompanyRole.ts";

export default function CompanyRow({company, onDelete, onEdit}: {
    company: CompanyResponse,
    onDelete: (publicId: string) => void,
    onEdit: (company: CompanyResponse) => void,
}) {

    const supplierColor = "#727272"
    const clientColor = "#8b3efe"
    const bothColor = "#4b4b78"

    const color =
        company.roles.includes(CompanyRole.SUPPLIER) && company.roles.includes(CompanyRole.CLIENT)
            ? bothColor
            : company.roles.includes(CompanyRole.CLIENT)
                ? clientColor
                : supplierColor
    return (
        <>
            <tr className={"border-b transition duration-200"} style={{backgroundColor: color}}>
                <td className={"p-4"}>{company.companyName}</td>
                <td className={"p-4"}>{CompanyTypeLabel[company.companyType]}</td>
                <td className={"p-4"}>{company.taxId}</td>
                <td className={"p-4"}>{company.phoneNumber}</td>
                <td className={"p-4"}>{company.email}</td>
                <td className={"p-4"}>{countryLabels[company.country] ?? company.country}</td>
                <td className={"p-4"}>{company.address}</td>
                <td className={"p-4"}>{new Date(company.createdAt).toLocaleString()}</td>
                <td className={"p-4"}>{new Date(company.updatedAt).toLocaleString()}</td>
                <td className={"p-4"}>
                    <div className={"flex gap-3"}>
                        <button className={"bg-blue-300 hover:bg-blue-400 p-2 rounded-lg transition outline-2"}
                                onClick={() => {
                                    onEdit(company)
                                }}>
                            <img className={"size-6"} src={"/edit.png"} alt={"Edit"}/>
                        </button>
                        <button className={"bg-red-300 hover:bg-red-400 p-2 rounded-lg transition outline-2"}
                                onClick={() => onDelete(company.publicId)}>
                            <img className={"size-6"} src={"/delete.png"} alt={"Delete"}/>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
}