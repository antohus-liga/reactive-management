import type {ReactNode} from "react";

export function DataTableRow({
                                 children,
                                 className = "",
                             }: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <tr
            className={`border-b border-zinc-200 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50 ${className}`}
        >
            {children}
        </tr>
    );
}