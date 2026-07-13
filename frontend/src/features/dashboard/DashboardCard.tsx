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
            className={`
                rounded-xl
                border border-gray-700
                bg-gray-800/80
                shadow-lg
                p-6
                ${className}
            `}
        >
            {(title || headerAction) && (
                <div className="mb-5 flex items-center justify-between">
                    {title && (
                        <h2 className="text-lg font-semibold text-gray-100">
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