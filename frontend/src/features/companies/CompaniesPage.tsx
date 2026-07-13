import NewCompanyModal from "./NewCompanyModal";
import CompanyRow from "@/features/companies/CompanyRow.tsx";
import type {CompanyResponse} from "@/features/companies/api.ts";
import useCompanies from "@/features/companies/useCompanies.ts";
import useCompanyModal from "@/features/companies/useCompanyModal.ts";
import DataTable from "@/components/table/DataTable.tsx";
import {DataTableHeader} from "@/components/table/DataTableHeader.tsx";
import {DataTableHead} from "@/components/table/DataTableHead";
import Button from "@/components/Button.tsx";

export default function CompaniesPage() {
    const companies = useCompanies();
    const modal = useCompanyModal();

    return (
        <>
            <NewCompanyModal
                open={modal.open}
                updateTarget={modal.updateTarget}
                onClose={modal.close}
            />

            <DataTable
                loading={companies.get.isLoading}
                empty={!companies.get.isLoading && companies.get.data?.length === 0}
                emptyMessage="No companies found."
            >
                <DataTableHead>
                    <DataTableHeader>Company Name</DataTableHeader>
                    <DataTableHeader>Company Type</DataTableHeader>
                    <DataTableHeader>Tax ID</DataTableHeader>
                    <DataTableHeader>Phone Number</DataTableHeader>
                    <DataTableHeader>Email</DataTableHeader>
                    <DataTableHeader>Country</DataTableHeader>
                    <DataTableHeader>Address</DataTableHeader>
                    <DataTableHeader>Created At</DataTableHeader>
                    <DataTableHeader>Updated At</DataTableHeader>
                    <DataTableHeader>Role</DataTableHeader>
                    <DataTableHeader className="text-right">Actions</DataTableHeader>
                </DataTableHead>

                <tbody>
                {companies.get.data?.map((company: CompanyResponse) => (
                    <CompanyRow
                        key={company.publicId}
                        company={company}
                        onDelete={companies.handleDeleteCompany}
                        onEdit={modal.openForUpdate}
                    />
                ))}
                </tbody>
            </DataTable>
            <Button className={"mt-5"}>
                <button
                    onClick={modal.openForCreate}
                >
                    New Company
                </button>
            </Button>
        </>
    );
}
