export default function Checkbox({label, checked, onChange}: {
    label: string,
    checked: boolean,
    onChange: (checked: boolean) => void
}) {
    return (
        <label className="flex items-center gap-2.5 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
            />
            <span>{label}</span>
        </label>
    );
}
