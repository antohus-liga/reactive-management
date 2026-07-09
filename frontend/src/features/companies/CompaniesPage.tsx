import NewCompanyModal from "./NewCompanyModal";
import CompanyRow from "@/features/companies/CompanyRow.tsx";
import type {CompanyResponse} from "@/features/companies/api.ts";
import useCompanies from "@/features/companies/useCompanies.ts";
import useCompanyModal from "@/features/companies/useCompanyModal.ts";

export default function CompaniesPage() {
    const companies = useCompanies();
    const modal = useCompanyModal();

    if (companies.get.isLoading) return null;
    if (companies.get.isError) return null;

    return (
        <>
            <NewCompanyModal open={modal.open} updateTarget={modal.updateTarget} onClose={modal.close}/>
            <div
                className={"relative flex flex-col w-auto max-h-[calc(100vh-18rem)] overflow-y-auto shadow-md shadow-white rounded-xl bg-clip-border"}>
                <table className={"w-full text-left table-auto"}>
                    <thead>
                    <tr className={"border-b bg-sky-900"}>
                        <th className={"p-4"}>Company Name</th>
                        <th className={"p-4"}>Company Type</th>
                        <th className={"p-4"}>Tax ID</th>
                        <th className={"p-4"}>Phone Number</th>
                        <th className={"p-4"}>Email</th>
                        <th className={"p-4"}>Country</th>
                        <th className={"p-4"}>Address</th>
                        <th className={"p-4"}>Created At</th>
                        <th className={"p-4"}>Updated At</th>
                        <th className={"p-4"}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {companies.get.data?.map((company: CompanyResponse) => (
                        <CompanyRow key={company.publicId} company={company} onDelete={companies.handleDeleteCompany}
                                    onEdit={modal.openForUpdate}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
            <div className={"mt-10"}>
                <button onClick={() => modal.openForCreate()}
                        className={"p-3 bg-emerald-700 border-2 border-emerald-700 hover:bg-emerald-500 active:bg-emerald-600 active:scale-95 rounded-xl transition duration-100"}>New
                    Company
                </button>
            </div>
        </>
    );
}