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
        <div
            className="
                rounded-xl
                border border-gray-700
                bg-gray-800/80
                p-5
                shadow-lg
            "
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-400">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-white">
                        {value}
                    </p>
                </div>

                {icon && (
                    <div className="rounded-lg bg-gray-700 p-3 text-gray-200">
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
                                    ? "text-emerald-400"
                                    : "text-red-400"
                            }
                        >
                            {trend.value}
                        </span>
                    )}

                    {description && (
                        <span className="text-gray-400">
                            {description}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}