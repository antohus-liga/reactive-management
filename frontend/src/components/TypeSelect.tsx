import {useTranslation} from "react-i18next";

export function TypeSelect<T extends string>({values, labels, value, onChange, placeHolder, error}: {
    values: readonly T[],
    labels: Record<T, string>,
    value: T | "",
    onChange: (value: T) => void,
    placeHolder: string,
    error?: string
}) {
    const {t} = useTranslation();
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as T)}
            className={`p-2 pr-8 rounded-md ring-1 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors duration-150 outline-none focus:ring-2 appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.25em_1.25em] bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%221.5%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19.5%208.25l-7.5%207.5-7.5-7.5%22%2F%3E%3C%2Fsvg%3E')] ${
                error
                    ? "ring-red-400 dark:ring-red-500 focus:ring-red-500"
                    : "ring-zinc-300 dark:ring-zinc-700 focus:ring-blue-500"
            }`}
            required={true}
        >
            <option value="" disabled className="text-zinc-400 dark:text-zinc-500">
                {placeHolder}
            </option>
            {values.map(v => (
                <option key={v} value={v}>
                    {t(labels[v])}
                </option>
            ))}
        </select>
    );
}
