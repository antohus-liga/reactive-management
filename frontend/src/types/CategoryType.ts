export const CategoryType = {
    MATERIAL: "MATERIAL",
    PRODUCT: "PRODUCT",
}

export type CategoryType = typeof CategoryType[keyof typeof CategoryType];