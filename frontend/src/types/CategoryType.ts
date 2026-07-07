export const CategoryType = {
    MATERIAL: "MATERIAL",
    PRODUCT: "PRODUCT",
}

export type CategoryType = typeof CategoryType[keyof typeof CategoryType];

export const CategoryTypeLabel: Record<CategoryType, string> = {
    MATERIAL: "Material",
    PRODUCT: "Product",
}