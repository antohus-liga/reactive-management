import type {ReactNode} from "react";

type DataTableProps = {
    children: ReactNode;
    loading?: boolean;
    empty?: boolean;
    emptyMessage?: string;
    loadingRows?: number;
};

export default function DataTable({
                                      children,
                                      loading = false,
                                      empty = false,
                                      emptyMessage = "No data available.",
                                      loadingRows = 8,
                                  }: DataTableProps) {
    if (loading) {
        return (
            <div
                className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="animate-pulse divide-y divide-zinc-200 dark:divide-zinc-800">
                    {Array.from({length: loadingRows}).map((_, i) => (
                        <div
                            key={i}
                            className="h-14 bg-zinc-100 dark:bg-zinc-800"
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div
            className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="max-h-[calc(100vh-16rem)] overflow-auto">
                <table className="min-w-full border-collapse text-sm">
                    {children}
                </table>

                {empty && (
                    <div
                        className="flex items-center justify-center border-t border-zinc-200 px-6 py-16 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                        {emptyMessage}
                    </div>
                )}
            </div>
        </div>
    );
}