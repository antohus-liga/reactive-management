import type {IngredientRequest, ProductRecipeRequest, ProductRecipeResponse,} from "@/features/products/api.ts";
import {type SubmitEvent, useState} from "react";
import {useReplaceProductRecipe,} from "@/features/products/hooks.ts";

export function useRecipeForm(productPublicId: string, initial: ProductRecipeResponse | null) {
    const [recipe, setRecipe] = useState<ProductRecipeRequest>((): ProductRecipeRequest =>
        initial
            ? {
                ingredients: initial.ingredients.map((ingredient): IngredientRequest =>
                    ({
                        materialPublicId: ingredient.materialPublicId,
                        quantity: ingredient.quantityNeeded,
                    })
                )
            }
            : {
                ingredients: []
            }
    );

    const replaceRecipe = useReplaceProductRecipe();

    function handleSubmit(e: SubmitEvent<HTMLFormElement>, onClose: () => void) {
        e.preventDefault();
        replaceRecipe.mutate({publicId: productPublicId, payload: recipe}, {onSuccess: onClose});
    }

    return {
        recipe,
        setRecipe,
        handleSubmit,
        replaceRecipe,
    }
}
