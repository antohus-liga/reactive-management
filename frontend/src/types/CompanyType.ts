export const CompanyType = {
    SOLE_PROPRIETORSHIP: "SOLE_PROPRIETORSHIP",
    PARTNERSHIP: "PARTNERSHIP",
    LIMITED_LIABILITY_COMPANY: "LIMITED_LIABILITY_COMPANY",
    CORPORATION: "CORPORATION",
    COOPERATIVE: "COOPERATIVE",
    NONPROFIT_ORGANISATION: "NONPROFIT_ORGANISATION",
} as const;

export type CompanyType =
    typeof CompanyType[keyof typeof CompanyType];

export const CompanyTypeLabel: Record<CompanyType, string> = {
    SOLE_PROPRIETORSHIP: "Sole Proprietorship",
    PARTNERSHIP: "Partnership",
    LIMITED_LIABILITY_COMPANY: "Limited Liability Company",
    CORPORATION: "Corporation",
    COOPERATIVE: "Cooperative",
    NONPROFIT_ORGANISATION: "Nonprofit Organisation",
};