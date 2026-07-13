import type {ReactNode} from "react";

export function DataTableCell({
                                  children,
                                  className = "",
                              }: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <td
            className={`px-5 py-4 text-zinc-700 dark:text-zinc-200 ${className}`}
        >
            {children}
        </td>
    );
}