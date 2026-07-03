export const CompanyRoles = {
    CLIENT: "CLIENT",
    SUPPLIER: "SUPPLIER",
}

export type CompanyRole = typeof CompanyRoles[keyof typeof CompanyRoles];

export const CompanyRolesLabel = {
    CLIENT: "Client",
    SUPPLIER: "Supplier",
}