import {type SubmitEvent, useState} from "react";
import type {MovementRequest} from "@/features/orders/api.ts";
import {useAddMovement} from "@/features/orders/hooks.ts";

export function useMovementsForm(orderPublicId: string) {
    const [movement, setMovement] = useState<MovementRequest>({
        movementType: "",
        productPublicId: null,
        materialPublicId: null,
        discount: null,
        quantity: 0,
        notes: null
    });

    const addMovement = useAddMovement();

    function handleSubmit(e: SubmitEvent<HTMLFormElement>, onClose: () => void) {
        e.preventDefault();
        addMovement.mutate({publicId: orderPublicId, payload: movement}, {onSuccess: onClose});
    }

    return {
        movement,
        setMovement,
        handleSubmit,
        addMovement,
    }
}
