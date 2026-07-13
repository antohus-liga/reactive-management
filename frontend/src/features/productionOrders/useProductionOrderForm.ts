import {type SubmitEvent, useState} from "react";
import {useFetchCompanies} from "@/features/companies/hooks.ts";
import {useCreateProductionOrder} from "@/features/productionOrders/hooks.ts";
import type {ProductionOrderRequest} from "@/features/productionOrders/api.ts";

export function useProductionOrderForm() {
    const getProducts = useFetchCompanies()

    const [production, setProduction] = useState<ProductionOrderRequest>({productPublicId: "", quantity: 0,})
    const create = useCreateProductionOrder();

    function handleSubmit(e: SubmitEvent<HTMLFormElement>, onClose: () => void) {
        e.preventDefault();
        create.mutate(production, {onSuccess: onClose});
    }

    return {
        production,
        setProduction,
        handleSubmit,
        getProducts,
        create,
    }
}