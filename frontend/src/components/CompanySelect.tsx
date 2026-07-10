import {useFetchCompanies} from "@/features/companies/hooks.ts";
import {CompanyRole} from "@/types/CompanyRole.ts";

export default function CompanySelect({value, onChange}: {
    value: string,
    onChange: (value: string) => void;
}) {
    const getCompanies = useFetchCompanies();

    return (
        <select value={value}
                onChange={(e) => onChange(e.target.value)}
                className={"p-2 rounded-lg ring-1 text-xl"}
                required={true}
        >
            <option value="" disabled>
                Select company
            </option>

            {getCompanies.data?.map((company) =>
                <option key={company.publicId} value={company.publicId}
                        style={{backgroundColor:
                                company.roles.includes(CompanyRole.CLIENT) && company.roles.includes(CompanyRole.SUPPLIER)
                                    ? "#4b4b78"
                                    : company.roles.includes(CompanyRole.CLIENT)
                                        ? "#8b3efe"
                                        : "#727272"}}>
                    {company.companyName + " | (Tax: " + company.taxId + ")"}
                </option>
            )}
        </select>
    );
}