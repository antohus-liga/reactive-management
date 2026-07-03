import {useEffect, useState} from "react";
import type {CompanyResponse} from "@/features/companies/api.ts";
import {CompanyTypeLabel} from "@/types/CompanyType.ts";

export default function CompanyRow({ company }: { company: CompanyResponse }) {
    const [menu, setMenu] = useState<{
        x: number;
        y: number;
    } | null>(null);

    useEffect(() => {
        function closeMenu() {
            setMenu(null);
        }

        window.addEventListener("click", closeMenu);

        return () => window.removeEventListener("click", closeMenu);
    }, []);

    return (
        <>
            <tr className="odd:bg-sky-800 border-b bg-sky-700 hover:bg-sky-600 transition duration-200"
                onContextMenu={(e) => {
                    e.preventDefault();

                    setMenu({
                        x: e.clientX,
                        y: e.clientY,
                    });
                }}
            >
                <td className={"p-4"}>{company.companyName}</td>
                <td className={"p-4"}>{CompanyTypeLabel[company.companyType]}</td>
                <td className={"p-4"}>{company.taxId}</td>
                <td className={"p-4"}>{company.phoneNumber}</td>
                <td className={"p-4"}>{company.email}</td>
                <td className={"p-4"}>{company.country}</td>
                <td className={"p-4"}>{company.address}</td>
                <td className={"p-4"}>{company.createdAt}</td>
                <td className={"p-4"}>{company.updatedAt}</td>
            </tr>

            {menu && (
                <div
                    className="fixed flex flex-col p-4 bg-gray-800 border rounded shadow-lg"
                    style={{
                        left: menu.x,
                        top: menu.y,
                    }}
                >
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            )}
        </>
    );
}