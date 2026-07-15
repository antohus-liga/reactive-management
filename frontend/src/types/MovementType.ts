export const MovementType = {
    INBOUND: "INBOUND",
    OUTBOUND: "OUTBOUND"
}

export type MovementType = typeof MovementType[keyof typeof MovementType];

export const MovementTypeLabel = {
    INBOUND: "inbound",
    OUTBOUND: "outbound",
}
