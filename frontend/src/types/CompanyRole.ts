export const CompanyRole = {
    CLIENT: "CLIENT",
    SUPPLIER: "SUPPLIER",
}

export type CompanyRole = typeof CompanyRole[keyof typeof CompanyRole];

export const CompanyRoleLabel = {
    CLIENT: "client",
    SUPPLIER: "supplier",
}