type ColorSwatchProps = {
    color: string;
    label: string;
};

export default function ColorSwatch(
    {
        color,
        label,
    }: ColorSwatchProps) {
    return (
        <div className="flex items-center gap-3">
            <span className="h-8 w-8 shrink-0 rounded-md border border-zinc-200 shadow-sm dark:border-zinc-700"
                  style={{backgroundColor: color}} aria-hidden
            />

            <span className="text-sm text-zinc-700 dark:text-zinc-300">
                {label}
            </span>
        </div>
    );
}