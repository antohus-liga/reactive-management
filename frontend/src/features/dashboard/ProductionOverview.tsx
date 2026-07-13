import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip,} from "recharts";

import DashboardCard from "./DashboardCard";
import {useFetchProductionOrders} from "@/features/productionOrders/hooks.ts";

export default function ProductionOverview() {
    const STATUS_COLORS: Record<string, string> = {
        PENDING: "#f59e0b",
        IN_PROGRESS: "#3b82f6",
        COMPLETED: "#10b981",
        FAILED: "#ef4444",
    };

    const {
        data: productionOrders = [],
        isLoading,
    } = useFetchProductionOrders();


    if (isLoading) {
        return (
            <DashboardCard title="Production Status">
                <div
                    className="
                        h-72
                        rounded-lg
                        bg-gray-700
                        animate-pulse
                    "
                />
            </DashboardCard>
        )
    }


    const statusCount =
        productionOrders.reduce(
            (acc, order) => {

                acc[order.status] =
                    (acc[order.status] ?? 0) + 1;

                return acc;

            },
            {} as Record<string, number>
        );


    const data =
        Object.entries(statusCount)
            .map(
                ([status, value]) => ({
                    name: status,
                    value
                })
            );


    const totalCost =
        productionOrders.reduce(
            (sum, order) =>
                sum + order.totalCost,
            0
        );


    return (
        <DashboardCard title="Production Status">

            <div className="h-72">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                        >
                            {
                                data.map(
                                    (entry) => (
                                        <Cell
                                            key={entry.name}
                                            fill={
                                                STATUS_COLORS[entry.name]
                                                ??
                                                "#6b7280"
                                            }
                                        />
                                    )
                                )
                            }

                        </Pie>


                        <Tooltip/>


                        <Legend/>

                    </PieChart>

                </ResponsiveContainer>

            </div>


            <div
                className="
                    mt-5
                    grid
                    grid-cols-2
                    gap-4
                "
            >

                <div>
                    <p className="text-sm text-gray-400">
                        Total Orders
                    </p>

                    <p className="text-xl font-semibold">
                        {productionOrders.length}
                    </p>
                </div>


                <div>
                    <p className="text-sm text-gray-400">
                        Production Cost
                    </p>

                    <p className="text-xl font-semibold">
                        {new Intl.NumberFormat(
                            "en-US",
                            {
                                style: "currency",
                                currency: "EUR"
                            }
                        ).format(totalCost)}
                    </p>
                </div>

            </div>

        </DashboardCard>
    );
}