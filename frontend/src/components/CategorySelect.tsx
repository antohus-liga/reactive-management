import {useFetchCategories} from "@/features/categories/hooks.ts";
import type {CategoryType} from "@/types/CategoryType.ts";

export default function CategorySelect({value, onChange, type}: {
    value: string,
    onChange: (value: string) => void,
    type: CategoryType,
}) {
    const getCategories = useFetchCategories();

    return (
        <select value={value}
                onChange={(e) => onChange(e.target.value)}
                className={"p-2 rounded-lg ring-1 text-xl"}
                required={true}
        >
            <option value="" disabled>
                Select category
            </option>

            {getCategories.data?.filter(cat => cat.types.includes(type)).map((category) => (
                <option key={category.publicId} value={category.publicId}>
                    {category.name}
                </option>
            ))}
        </select>
    );
}
