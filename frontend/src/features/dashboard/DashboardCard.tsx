import type {ReactNode} from "react";

interface DashboardCardProps {
    title?: string;
    children: ReactNode;
    className?: string;
    headerAction?: ReactNode;
}
export default function DashboardCard(
    {
        title,
        children,
        className = "",
        headerAction,
    }: DashboardCardProps) {
    return (
        <section
            className={`rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6 ${className}`}
        >
            {(title || headerAction) && (
                <div className="mb-5 flex items-center justify-between">
                    {title && (
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            {title}
                        </h2>
                    )}
                    {headerAction}
                </div>
            )}
            {children}
        </section>
    );
}
