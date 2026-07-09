import {type SubmitEvent, useState} from "react";
import type {MovementRequest, MovementResponse} from "@/features/orders/api.ts";
import {useAddMovement} from "@/features/orders/hooks.ts";

export function useMovementsForm(orderPublicId: string, initial: MovementResponse | null) {
    const [movement, setMovement] = useState<MovementRequest>((): MovementRequest =>
        initial
            ? {
                movementType: initial.movementType,
                productPublicId: null,
                materialPublicId: null,
                discount: initial.discount,
                quantity: initial.quantity,
                notes: initial.notes,
            }
            : {
                movementType: "",
                productPublicId: null,
                materialPublicId: null,
                discount: null,
                quantity: 0,
                notes: null
            }
    );

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
