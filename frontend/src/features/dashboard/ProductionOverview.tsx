import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip,} from "recharts";

import DashboardCard from "./DashboardCard";
import {useFetchProductionOrders} from "@/features/productionOrders/hooks.ts";
import Badge from "@/components/Badge.tsx";

export default function ProductionOverview() {
    const isDark = document.documentElement.classList.contains("dark");

    const STATUS_COLORS: Record<string, string> = {
        PENDING: "#d97706",
        IN_PROGRESS: "#2563eb",
        COMPLETED: "#059669",
        FAILED: "#dc2626",
    };

    const STATUS_BADGES: Record<
        string,
        "warning" | "info" | "success" | "danger"
    > = {
        PENDING: "warning",
        IN_PROGRESS: "info",
        COMPLETED: "success",
        FAILED: "danger",
    };

    const {
        data: productionOrders = [],
        isLoading,
    } = useFetchProductionOrders();


    if (isLoading) {
        return (
            <DashboardCard title="Production Status">
                <div className="h-72 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800"/>
            </DashboardCard>
        );
    }


    const statusCount = productionOrders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] ?? 0) + 1;
        return acc;
    }, {} as Record<string, number>);


    const data = Object.entries(statusCount).map(([status, value]) => ({
        name: status,
        value,
    }));


    const totalCost = productionOrders.reduce(
        (sum, order) => sum + order.totalCost,
        0
    );


    return (
        <DashboardCard title="Production Status">

            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={4}
                        >
                            {data.map((entry) => (
                                <Cell
                                    key={entry.name}
                                    fill={
                                        STATUS_COLORS[entry.name] ?? "#71717a"
                                    }
                                />
                            ))}
                        </Pie>


                        <Tooltip
                            formatter={(value) => [
                                `${value} orders`,
                                "Count",
                            ]}
                            contentStyle={{
                                borderRadius: "12px",
                                border: isDark
                                    ? "1px solid #3f3f46"
                                    : "1px solid #e4e4e7",
                                backgroundColor: isDark
                                    ? "#18181b"
                                    : "#ffffff",
                                color: isDark
                                    ? "#f4f4f5"
                                    : "#18181b",
                                boxShadow:
                                    "0 1px 3px rgba(0,0,0,0.08)",
                                fontSize: "13px",
                            }}
                            labelStyle={{
                                color: isDark
                                    ? "#f4f4f5"
                                    : "#18181b",
                                fontWeight: 600,
                            }}
                            itemStyle={{
                                color: isDark
                                    ? "#f4f4f5"
                                    : "#18181b",
                            }}
                        />

                    </PieChart>
                </ResponsiveContainer>
            </div>


            <div className="mt-4 grid grid-cols-2 gap-3">
                {data.map((entry) => (
                    <div
                        key={entry.name}
                        className="
                            flex
                            items-center
                            justify-between
                            rounded-lg
                            border
                            border-zinc-200
                            bg-zinc-50
                            px-3
                            py-2.5
                            dark:border-zinc-800
                            dark:bg-zinc-900/60
                        "
                    >
                        <Badge variant={STATUS_BADGES[entry.name]}>
                            {entry.name.replace("_", " ")}
                        </Badge>

                        <span
                            className="
                                text-sm
                                font-semibold
                                text-zinc-700
                                dark:text-zinc-300
                            "
                        >
                            {entry.value}
                        </span>
                    </div>
                ))}
            </div>


            <div className="mt-6 grid grid-cols-2 gap-4">

                <div
                    className="
                        rounded-lg
                        border
                        border-zinc-200
                        bg-zinc-50
                        p-4
                        dark:border-zinc-800
                        dark:bg-zinc-900/60
                    "
                >
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Total Orders
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {productionOrders.length}
                    </p>
                </div>


                <div
                    className="
                        rounded-lg
                        border
                        border-zinc-200
                        bg-zinc-50
                        p-4
                        dark:border-zinc-800
                        dark:bg-zinc-900/60
                    "
                >
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Production Cost
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "EUR",
                        }).format(totalCost)}
                    </p>
                </div>

            </div>

        </DashboardCard>
    );
}
