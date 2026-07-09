import {useState} from "react";
import type {ProductRecipeResponse, ProductResponse} from "@/features/products/api.ts";

export default function useProductModal() {
    const [open, setOpen] = useState(false);
    const [recipe, setRecipe] = useState<ProductRecipeResponse | null>(null);
    const [productPublicId, setProductPublicId] = useState<string | null>(null);
    const [updateTarget, setUpdateTarget] = useState<ProductResponse | null>(null);

    function openForCreate() {
        setOpen(true);
        setUpdateTarget(null);
    }

    function openForUpdate(updateTarget: ProductResponse) {
        setOpen(true);
        setUpdateTarget(updateTarget);
    }

    function openForRecipe(recipe: ProductRecipeResponse | null, productPublicId: string) {
        setOpen(true);
        setRecipe(recipe);
        setProductPublicId(productPublicId);
    }

    function close() {
        setOpen(false);
        setUpdateTarget(null);
        setProductPublicId(null);
        setRecipe(null);
    }

    return {
        open,
        recipe,
        productPublicId,
        updateTarget,
        openForCreate,
        openForUpdate,
        openForRecipe,
        close,
    }
}