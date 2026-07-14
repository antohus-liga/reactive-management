import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";


import DashboardCard from "./DashboardCard";
import {useRevenueChart} from "@/features/dashboard/useRevenueChart.ts";

export default function RevenueChart() {
    const isDark = document.documentElement.classList.contains("dark");

    const {
        data = [],
        isLoading,
    } = useRevenueChart();

    if (isLoading) {
        return (
            <DashboardCard title="Revenue">
                <div className="h-72 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800"/>
            </DashboardCard>
        );
    }

    const formatted = data.map((item) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString("en-UK", {
            month: "short",
            day: "numeric",
        }),
    }));

    return (
        <DashboardCard title="Revenue">
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formatted}>
                        <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="#2563eb"
                                    stopOpacity={0.22}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#2563eb"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            stroke="#e4e4e7"
                            strokeDasharray="4 4"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#71717a",
                                fontSize: 12,
                            }}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#71717a",
                                fontSize: 12,
                            }}
                        />

                        <Tooltip
                            formatter={(value) => ` ${new Intl.NumberFormat("pt-PT", {
                                style: "currency",
                                currency: "EUR",
                            }).format(Number(value ?? 0))}
                            `}
                            contentStyle={{
                                borderRadius: "12px",
                                border: isDark ? "1px solid #3f3f46" : "1px solid #e4e4e7",
                                backgroundColor: isDark ? "#18181b" : "#ffffff",
                                color: isDark ? "#f4f4f5" : "#18181b",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                                fontSize: "13px",
                            }}
                            labelStyle={{
                                color: isDark ? "#f4f4f5" : "#18181b",
                                fontWeight: 600,
                            }}
                            itemStyle={{
                                color: isDark ? "#f4f4f5" : "#18181b",
                            }}
                            cursor={{
                                stroke: isDark ? "#52525b" : "#d4d4d8",
                                strokeDasharray: "4 4",
                            }}
                        />

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#2563eb"
                            strokeWidth={2.5}
                            fill="url(#revenueGradient)"
                            activeDot={{
                                r: 4,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </DashboardCard>
    );
}
