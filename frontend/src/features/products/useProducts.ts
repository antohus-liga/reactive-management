import {useDeleteProduct, useFetchProducts} from "@/features/products/hooks.ts";

export default function useProducts() {
    const get = useFetchProducts()
    const deleteProduct = useDeleteProduct();

    function handleDeleteProduct(publicId: string) {
        deleteProduct.mutate(publicId)
    }

    return {
        handleDeleteProduct,
        get,
    };
}
