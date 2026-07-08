import type {ProductResponse} from "@/features/products/api.ts";

export default function ProductRow({product, onDelete, onEdit}: {
    product: ProductResponse,
    onDelete: (publicId: string) => void,
    onEdit: (product: ProductResponse) => void,
}) {

    const color = product.categoryColor;
    return (
        <>
            <tr className={"border-b transition duration-200"} style={{backgroundColor: `${color}90`}}>
                <td className={"p-4"}>{product.description}</td>
                <td className={"p-4 flex items-center gap-4"}>
                    <div className={"p-3 w-10 h-10 outline-1"} style={{backgroundColor: `${color}`}}/>
                    {product.categoryDescription}
                </td>
                <td className={"p-4"}>{product.fixedPrice ? `(Fixed) ${product.fixedPrice}` : `(Margin) ${product.sellingMargin}`}</td>
                <td className={"p-4"}>{product.quantity}</td>
                <td className={"p-4"}>{product.productionCost}</td>
                <td className={"p-4"}>{product.price}</td>
                <td className={"p-4"}>{new Date(product.createdAt).toLocaleString()}</td>
                <td className={"p-4"}>{new Date(product.updatedAt).toLocaleString()}</td>
                <td className={"p-4"}>
                    <div className={"flex gap-3"}>
                        <button className={"bg-blue-300 hover:bg-blue-400 p-2 rounded-lg transition outline-2"}
                                onClick={() => {
                                    onEdit(product)
                                }}>
                            <img className={"size-6"} src={"/edit.png"} alt={"Edit"}/>
                        </button>
                        <button className={"bg-red-300 hover:bg-red-400 p-2 rounded-lg transition outline-2"}
                                onClick={() => onDelete(product.publicId)}>
                            <img className={"size-6"} src={"/delete.png"} alt={"Delete"}/>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
}
