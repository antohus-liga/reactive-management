import useProducts from "@/features/products/useProducts.ts";
import useProductModal from "@/features/products/useProductModal.ts";
import ProductRow from "@/features/products/ProductRow.tsx";
import type {ProductResponse} from "@/features/products/api.ts";
import ProductModal from "@/features/products/ProductModal.tsx";

export default function ProductsPage() {
    const products = useProducts();
    const modal = useProductModal();

    if (products.get.isLoading) return null;
    if (products.get.isError) return null;

    return (
        <>
            <ProductModal open={modal.open} updateTarget={modal.updateTarget} onClose={modal.close}
                          productPublicId={modal.productPublicId} recipe={modal.recipe}/>
            <div
                className={"relative flex flex-col w-auto max-h-[calc(100vh-18rem)] overflow-y-auto shadow-md shadow-white rounded-xl bg-clip-border"}>
                <table className={"w-full text-left table-auto bg-black"}>
                    <thead>
                    <tr className={"border-b bg-black"}>
                        <th className={"p-4"}>Description</th>
                        <th className={"p-4"}>Category</th>
                        <th className={"p-4"}>Price Rule</th>
                        <th className={"p-4"}>Quantity</th>
                        <th className={"p-4"}>Production Cost</th>
                        <th className={"p-4"}>Price</th>
                        <th className={"p-4"}>Created At</th>
                        <th className={"p-4"}>Updated At</th>
                        <th className={"p-4"}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.get.data?.map((product: ProductResponse) => (
                        <ProductRow key={product.publicId} product={product} onDelete={products.handleDeleteProduct}
                                    onEdit={modal.openForUpdate} onRecipeReplace={modal.openForRecipe}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
            <div className={"mt-10"}>
                <button onClick={() => modal.openForCreate()}
                        className={"p-3 bg-emerald-700 border-2 border-emerald-700 hover:bg-emerald-500 active:bg-emerald-600 active:scale-95 rounded-xl transition duration-100"}>New
                    Product
                </button>
            </div>
        </>
    );
}
