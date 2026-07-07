import {useDeleteCompany, useFetchCompanies} from "@/features/companies/hooks.ts";

export default function useCompanies() {
    const get = useFetchCompanies()
    const deleteCompany = useDeleteCompany();

    function handleDeleteCompany(publicId: string) {
        deleteCompany.mutate(publicId)
    }

    return {
        handleDeleteCompany,
        get,
    };
}