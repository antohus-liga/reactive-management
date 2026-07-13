import type {ReactNode} from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: ReactNode;
    description?: string;
    trend?: {
        value: string;
        positive?: boolean;
    };
}
export default function StatCard({
                                     title,
                                     value,
                                     icon,
                                     description,
                                     trend,
                                 }: StatCardProps) {
    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {title}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                        {value}
                    </p>
                </div>
                {icon && (
                    <div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 p-3 text-blue-600 dark:text-blue-400">
                        {icon}
                    </div>
                )}
            </div>
            {(description || trend) && (
                <div className="mt-4 flex items-center gap-2 text-sm">
                    {trend && (
                        <span
                            className={
                                trend.positive
                                    ? "text-emerald-600 dark:text-emerald-400 font-medium"
                                    : "text-red-600 dark:text-red-400 font-medium"
                            }
                        >
                            {trend.value}
                        </span>
                    )}
                    {description && (
                        <span className="text-zinc-500 dark:text-zinc-400">
                            {description}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
