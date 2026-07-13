import {useState} from "react";

export default function useProductionOrderModal() {
    const [open, setOpen] = useState(false);

    function openForCreate() {
        setOpen(true);
    }

    function close() {
        setOpen(false);
    }

    return {
        open,
        openForCreate,
        close,
    }
}