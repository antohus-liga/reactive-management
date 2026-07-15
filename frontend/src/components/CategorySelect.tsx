import type {CategoryType} from "@/types/CategoryType.ts";
import {useFetchCategories} from "@/features/categories/hooks.ts";
import {useTranslation} from "react-i18next";

export default function CategorySelect({value, onChange, type}: {
    value: string,
    onChange: (value: string) => void,
    type: CategoryType,
}) {
    const getCategories = useFetchCategories();
    const {t} = useTranslation();
    return (
        <select value={value}
                onChange={(e) => onChange(e.target.value)}
                className="p-2 pr-8 rounded-md ring-1 ring-zinc-300 dark:ring-zinc-700 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors duration-150 outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.25em_1.25em] bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%221.5%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19.5%208.25l-7.5%207.5-7.5-7.5%22%2F%3E%3C%2Fsvg%3E')]"
                required={true}
        >
            <option value="" disabled>
                {t("categoryPlaceholder")}
            </option>
            {getCategories.data?.filter(cat => cat.types.includes(type)).map((category) => (
                <option key={category.publicId} value={category.publicId}>
                    {category.name}
                </option>
            ))}
        </select>
    );
}
