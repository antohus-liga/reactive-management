import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import type {ProductRecipeResponse, ProductResponse} from "@/features/products/api.ts";
import ProductForm from "@/features/products/ProductForm.tsx";
import {useFetchCategories} from "@/features/categories/hooks.ts";
import RecipeForm from "@/features/products/RecipeForm.tsx";

export default function OrderModal(
    {open, updateTarget, productPublicId, recipe, onClose}: {
        open: boolean,
        updateTarget: ProductResponse | null,
        productPublicId: string | null,
        recipe: ProductRecipeResponse | null,
        onClose: () => void,
    }) {
    const getCategories = useFetchCategories();
    if (getCategories.isLoading) return null;

    return (
        <div>
            <Dialog open={open} onClose={onClose} className="relative w-10 z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="ml-20 mt-10 fixed inset-0 z-10 w-screen overflow-hidden">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform w-fit overflow-hidden rounded-lg text-left shadow-xl bg-gray-800 outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            {open && !productPublicId && !recipe &&
                                <ProductForm key={updateTarget?.publicId} initial={updateTarget} onClose={onClose}/>}
                            {open && !updateTarget && !!productPublicId &&
                                <RecipeForm initial={recipe} productId={productPublicId} onClose={onClose}/>}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
