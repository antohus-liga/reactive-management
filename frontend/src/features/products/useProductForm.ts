import {type SubmitEvent, useState} from "react";
import type {ProductRequest, ProductResponse} from "@/features/products/api.ts";
import {useCreateProduct, useUpdateProduct} from "@/features/products/hooks.ts";
import {useFetchCategories} from "@/features/categories/hooks.ts";

export function useProductForm(initial: ProductResponse | null) {
    const getCategories = useFetchCategories()
    const [product, setProduct] = useState<ProductRequest>(() =>
        initial
            ? {
                description: initial.description,
                categoryPublicId: getCategories.data?.find(category => category.name === initial.categoryDescription)?.publicId ?? "",
                measurement: initial.measurement,
                fixedPrice: initial.fixedPrice,
                sellingMargin: initial.sellingMargin,
                quantity: initial.quantity,
            }
            : {
                description: "",
                categoryPublicId: "",
                measurement: "",
                fixedPrice: 0,
                sellingMargin: "",
                quantity: 0,
            }
    );

    const create = useCreateProduct();
    const update = useUpdateProduct();

    function handleSubmit(e: SubmitEvent<HTMLFormElement>, onClose: () => void) {
        e.preventDefault();
        if (!initial)
            create.mutate(product, {onSuccess: onClose});
        else
            update.mutate({publicId: initial.publicId, payload: product}, {onSuccess: onClose});
    }

    return {
        product,
        setProduct,
        handleSubmit,
        create,
        update,
    }
}


