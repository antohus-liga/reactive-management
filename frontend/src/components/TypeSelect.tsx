export function TypeSelect<T extends string>({values, labels, value, onChange, placeHolder}: {
    values: readonly T[],
    labels: Record<T, string>,
    value: T | "",
    onChange: (value: T) => void,
    placeHolder: string
}) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as T)}
            className={"p-2 rounded-lg ring-1 text-xl"}
            required={true}
        >
            <option value="" disabled>
                {placeHolder}
            </option>
            {values.map(v => (
                <option key={v} value={v}>
                    {labels[v]}
                </option>
            ))}
        </select>
    );
}