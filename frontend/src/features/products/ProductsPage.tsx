import useProducts from "@/features/products/useProducts.ts";
import useProductModal from "@/features/products/useProductModal.ts";
import ProductRow from "@/features/products/ProductRow.tsx";
import type {ProductResponse} from "@/features/products/api.ts";
import Modal from "@/components/Modal.tsx";
import DataTable from "@/components/table/DataTable.tsx";
import {DataTableHead} from "@/components/table/DataTableHead.tsx";
import {DataTableHeader} from "@/components/table/DataTableHeader.tsx";
import Button from "@/components/Button.tsx";
import ProductForm from "@/features/products/ProductForm.tsx";
import {Plus} from "lucide-react";
import RecipeForm from "@/features/products/RecipeForm.tsx";

export default function ProductsPage() {
    const products = useProducts();
    const modal = useProductModal();

    return (
        <>
            <Modal open={modal.open} onClose={modal.close}>
                {!modal.productPublicId && !modal.recipe &&
                    <ProductForm initial={modal.updateTarget} onClose={modal.close}/>}
                {!modal.updateTarget && !!modal.productPublicId &&
                    <RecipeForm initial={modal.recipe} productId={modal.productPublicId ?? ""} onClose={modal.close}/>}
            </Modal>
            <DataTable
                loading={products.get.isLoading}
                empty={!products.get.isLoading && products.get.data?.length === 0}
                emptyMessage="No companies found."
            >
                <DataTableHead>
                    <DataTableHeader>Description</DataTableHeader>
                    <DataTableHeader>Category</DataTableHeader>
                    <DataTableHeader>Price Rule</DataTableHeader>
                    <DataTableHeader>Quantity</DataTableHeader>
                    <DataTableHeader>Production Cost</DataTableHeader>
                    <DataTableHeader>Price</DataTableHeader>
                    <DataTableHeader>Created At</DataTableHeader>
                    <DataTableHeader>Updated At</DataTableHeader>
                    <DataTableHeader className="text-right">Actions</DataTableHeader>
                </DataTableHead>
                <tbody>
                {products.get.data?.map((product: ProductResponse) => (
                    <ProductRow
                        key={product.publicId}
                        product={product}
                        onDelete={products.handleDeleteProduct}
                        onEdit={modal.openForUpdate}
                        onRecipeReplace={modal.openForRecipe}
                    />
                ))}
                </tbody>
            </DataTable>
            <Button
                icon={<Plus size={16}/>}
                className={"mt-5"}
                onClick={modal.openForCreate}
            >
                New Product
            </Button>
        </>
    );
}
