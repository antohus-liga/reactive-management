import {type SubmitEvent, useState} from "react";
import {useFetchCategories} from "@/features/categories/hooks.ts";
import type {MaterialRequest, MaterialResponse} from "@/features/materials/api.ts";
import {useCreateMaterial, useUpdateMaterial} from "@/features/materials/hooks.ts";

export function useMaterialForm(initial: MaterialResponse | null) {
    const getCategories = useFetchCategories()
    const [material, setMaterial] = useState<MaterialRequest>(() =>
        initial
            ? {
                description: initial.description,
                categoryPublicId: getCategories.data?.find(category => category.name === initial.categoryDescription)?.publicId ?? "",
                measurement: initial.measurement,
                unitPrice: initial.unitPrice,
                quantity: initial.quantity,
            }
            : {
                description: "",
                categoryPublicId: "",
                measurement: "",
                unitPrice: 0,
                quantity: 0,
            }
    );

    const create = useCreateMaterial();
    const update = useUpdateMaterial();

    function handleSubmit(e: SubmitEvent<HTMLFormElement>, onClose: () => void) {
        e.preventDefault();
        if (!initial)
            create.mutate(material, {onSuccess: onClose});
        else
            update.mutate({publicId: initial.publicId, payload: material}, {onSuccess: onClose});
    }

    return {
        material,
        setMaterial,
        handleSubmit,
        create,
        update,
    }
}


