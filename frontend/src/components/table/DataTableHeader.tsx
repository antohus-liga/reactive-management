import type {ReactNode} from "react";

export function DataTableHeader({
                                    children,
                                    className = "",
                                }: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <th
            className={`border-b border-zinc-200 px-5 py-3 text-left text-sm font-semibold text-zinc-600 dark:border-zinc-800 dark:text-zinc-300 ${className}`}
        >
            {children}
        </th>
    );
}