import type {CompanyResponse} from "@/features/companies/api.ts";
import {CompanyTypeLabel} from "@/types/CompanyType.ts";
import {countryLabels} from "@/features/auth/countryOptions.ts";
import type {Dispatch, SetStateAction} from "react";

export default function CompanyRow({company, onDelete, setOpen, setUpdateTarget}:
                                   {
                                       company: CompanyResponse,
                                       onDelete: (publicId: string) => void,
                                       setOpen: Dispatch<SetStateAction<boolean>>,
                                       setUpdateTarget: Dispatch<SetStateAction<CompanyResponse | null>>,
                                   }) {
    return (
        <>
            <tr className="odd:bg-sky-800 border-b bg-sky-700 hover:bg-sky-600 transition duration-200">
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
                                    setOpen(true);
                                    setUpdateTarget(company)
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