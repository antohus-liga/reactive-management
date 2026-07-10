import {type SubmitEvent, useState} from "react";
import {useFetchCompanies} from "@/features/companies/hooks.ts";
import {useCreateOrder} from "@/features/orders/hooks.ts";
import type {OrderRequest} from "@/features/orders/api.ts";

export function useOrderForm() {
    const getCompanies = useFetchCompanies()

    const [order, setOrder] = useState<OrderRequest>({
        companyPublicId: "",
        withRole: ""
    })
    const create = useCreateOrder();

    function handleSubmit(e: SubmitEvent<HTMLFormElement>, onClose: () => void) {
        e.preventDefault();
        create.mutate(order, {onSuccess: onClose});
    }

    return {
        order,
        setOrder,
        handleSubmit,
        getCompanies,
        create,
    }
}