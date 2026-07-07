export default function Checkbox({label, checked, onChange}: {
    label: string,
    checked: boolean,
    onChange: (checked: boolean) => void
}) {
    return (
        <label
            className="flex items-center gap-3 text-xl cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="h-5 w-5 rounded border-gray-500 bg-gray-700 text-sky-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0"
            />
            <span>{label}</span>
        </label>
    );
}
