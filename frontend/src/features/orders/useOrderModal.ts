import {useState} from "react";
import type {OrderDetailsResponse} from "@/features/orders/api.ts";

export default function useOrderModal() {
    const [open, setOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState<OrderDetailsResponse | null>(null);
    const [orderPublicId, setOrderPublicId] = useState<string | null>(null);

    function openForCreate() {
        setOpen(true);
    }

    function openForMovements(orderDetails: OrderDetailsResponse | null, orderPublicId: string) {
        setOpen(true);
        setOrderDetails(orderDetails);
        setOrderPublicId(orderPublicId);
    }

    function close() {
        setOpen(false);
        setOrderPublicId(null);
        setOrderDetails(null);
    }

    return {
        open,
        orderDetails,
        orderPublicId,
        openForCreate,
        openForMovements,
        close,
    }
}