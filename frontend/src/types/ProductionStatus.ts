export const ProductionStatus = {
    PENDING: "PENDING",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED",
}

export type ProductionStatus = typeof ProductionStatus[keyof typeof ProductionStatus];

export const ProductionStatusLabel: Record<ProductionStatus, string> = {
    PENDING: "Pending",
    IN_PROGRESS: "In progress",
    COMPLETED: "Completed",
    FAILED: "Failed",
}