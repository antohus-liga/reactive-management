export const MeasurementType = {
        // Count
        UNIT: "UNIT",
        PAIR: "PAIR",
        DOZEN: "DOZEN",

        // Weight
        MG: "MG",
        G: "G",
        KG: "KG",
        TON: "TON",

        // Volume
        ML: "ML",
        L: "L",

        // Length
        MM: "MM",
        CM: "CM",
        M: "M",
        KM: "KM",

        // Area
        CM2: "CM2",
        M2: "M2",

        // Volume (3D)
        CM3: "CM3",
        M3: "M3",

        // Packaging
        PACK: "PACK",
        BOX: "BOX",
        BAG: "BAG",
        BOTTLE: "BOTTLE",
        CAN: "CAN",
        ROLL: "ROLL",
        SHEET: "SHEET",
        PALLET: "PALLET",
}

export type MeasurementType = typeof MeasurementType[keyof typeof MeasurementType];

export const MeasurementTypeLabel: Record<MeasurementType, string> = {
    // Count
    UNIT: "pcs",
    PAIR: "pr",
    DOZEN: "dz",

    // Weight
    MG: "mg",
    G: "g",
    KG: "kg",
    TON: "t",

    // Volume
    ML: "ml",
    L: "L",

    // Length
    MM: "mm",
    CM: "cm",
    M: "m",
    KM: "km",

    // Area
    CM2: "cm²",
    M2: "m²",

    // Volume (3D)
    CM3: "cm³",
    M3: "m³",

    // Packaging
    PACK: "Pack",
    BOX: "Box",
    BAG: "Bag",
    BOTTLE: "Bottle",
    CAN: "Can",
    ROLL: "Roll",
    SHEET: "Sheet",
    PALLET: "Pallet",
};