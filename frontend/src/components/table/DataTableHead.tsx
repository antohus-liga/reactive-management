import type {ReactNode} from "react";

export function DataTableHead({
                                  children,
                              }: {
    children: ReactNode;
}) {
    return (
        <thead className="sticky top-0 z-10 bg-zinc-50 dark:bg-zinc-900">
        <tr>{children}</tr>
        </thead>
    );
}