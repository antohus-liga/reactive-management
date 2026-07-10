import {useFetchProducts} from "@/features/products/hooks.ts";

export default function ProductSelect({value, onChange}: {
    value: string,
    onChange: (value: string) => void,
}) {
    const getProducts = useFetchProducts();

    return (
        <select value={value}
                onChange={(e) => onChange(e.target.value)}
                className={"p-2 rounded-lg ring-1 text-xl"}
                required={true}
        >
            <option value="" disabled>
                Select product
            </option>

            {getProducts.data?.map((product) => (
                <option key={product.publicId} value={product.publicId}>
                    {product.description}
                </option>
            ))}
        </select>
    );
}
