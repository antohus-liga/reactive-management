export function TypeSelect<T extends string>({type, labels, value, onChange, placeHolder}: {
    type: Record<string, T>,
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

            {Object.values(type).map(v => (
                <option key={v} value={v}>
                    {labels[v]}
                </option>
            ))}
        </select>
    );
}