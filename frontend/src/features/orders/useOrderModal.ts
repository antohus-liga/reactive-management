import {useState} from "react";

export default function useOrderModal() {
    const [open, setOpen] = useState(false);
    const [orderPublicId, setOrderPublicId] = useState<string | null>(null);

    function openForCreate() {
        setOpen(true);
    }

    function openForMovements(orderPublicId: string) {
        setOpen(true);
        setOrderPublicId(orderPublicId);
    }

    function close() {
        setOpen(false);
        setOrderPublicId(null);
    }

    return {
        open,
        orderPublicId,
        openForCreate,
        openForMovements,
        close,
    }
}