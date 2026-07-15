import CompanyRow from "@/features/companies/CompanyRow.tsx";
import type {CompanyResponse} from "@/features/companies/api.ts";
import useCompanies from "@/features/companies/useCompanies.ts";
import useCompanyModal from "@/features/companies/useCompanyModal.ts";
import DataTable from "@/components/table/DataTable.tsx";
import {DataTableHeader} from "@/components/table/DataTableHeader.tsx";
import {DataTableHead} from "@/components/table/DataTableHead";
import Button from "@/components/Button.tsx";
import CompanyForm from "@/features/companies/CompanyForm.tsx";
import Modal from "@/components/Modal.tsx";
import {Plus} from "lucide-react";
import {useMemo, useState} from "react";
import {useTranslation} from "react-i18next";

export default function CompaniesPage() {
    const {t} = useTranslation();
    const companies = useCompanies();
    const modal = useCompanyModal();
    const [nameFilter, setNameFilter] = useState("");

    const filteredCompanies = useMemo(() => {
        if (!nameFilter.trim()) return companies.get.data;
        return companies.get.data?.filter((company: CompanyResponse) =>
            company.companyName?.toLowerCase().includes(nameFilter.toLowerCase())
        );
    }, [companies.get.data, nameFilter]);

    return (
        <>
            <Modal open={modal.open} onClose={modal.close}>
                <CompanyForm initial={modal.updateTarget} onClose={modal.close}/>
            </Modal>

            <input
                type="text"
                placeholder={t("filterByCompany")}
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="mb-4 px-3 py-2 border rounded-md w-full max-w-sm"
            />

            <DataTable
                loading={companies.get.isLoading}
                empty={!companies.get.isLoading && filteredCompanies?.length === 0}
                emptyMessage={t("companiesNotFound")}
            >
                <DataTableHead>
                    <DataTableHeader>{t("companyName")}</DataTableHeader>
                    <DataTableHeader>{t("companyType")}</DataTableHeader>
                    <DataTableHeader>{t("taxId")}</DataTableHeader>
                    <DataTableHeader>{t("phone")}</DataTableHeader>
                    <DataTableHeader>{t("email")}</DataTableHeader>
                    <DataTableHeader>{t("country")}</DataTableHeader>
                    <DataTableHeader>{t("address")}</DataTableHeader>
                    <DataTableHeader>{t("role")}</DataTableHeader>
                    <DataTableHeader>{t("createdAt")}</DataTableHeader>
                    <DataTableHeader>{t("updatedAt")}</DataTableHeader>
                    <DataTableHeader className="text-right">{t("actions")}</DataTableHeader>
                </DataTableHead>
                <tbody>
                {filteredCompanies?.map((company: CompanyResponse) => (
                    <CompanyRow key={company.publicId} company={company} onDelete={companies.handleDeleteCompany}
                                onEdit={modal.openForUpdate}
                    />
                ))}
                </tbody>
            </DataTable>
            <Button className={"mt-5"} onClick={modal.openForCreate} icon={<Plus size={16}/>}>
                {t("newCompany")}
            </Button>
        </>
    );
}
