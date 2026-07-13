import {Factory, Package, ShoppingCart} from "lucide-react";


import DashboardCard from "./DashboardCard";

import {useRecentActivity} from "@/features/dashboard/useRecentActivity";
const icons = {
    ORDER: <ShoppingCart size={18} />,
    PRODUCTION: <Factory size={18} />,
    MOVEMENT: <Package size={18} />,
};

export default function RecentActivity() {
    const {
        data = [],
        isLoading,
    } = useRecentActivity();

    if (isLoading) {
        return (
            <DashboardCard title="Recent Activity">
                <div className="h-72 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />
            </DashboardCard>
        );
    }

    return (
        <DashboardCard title="Recent Activity">
            <div className="space-y-3">
                {data.map((activity) => (
                    <div
                        key={activity.id}
                        className="
                            flex
                            gap-4
                            rounded-xl
                            border
                            border-zinc-200
                            bg-zinc-50
                            p-4
                            transition-colors
                            duration-150
                            hover:bg-zinc-100
                            dark:border-zinc-800
                            dark:bg-zinc-900/60
                            dark:hover:bg-zinc-800/80
                        "
                    >
                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-zinc-100
                                text-zinc-600
                                dark:bg-zinc-800
                                dark:text-zinc-300
                            "
                        >
                            {icons[activity.type]}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                {activity.title}
                            </p>

                            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                {activity.description}
                            </p>

                            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
                                {activity.date.toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
}
