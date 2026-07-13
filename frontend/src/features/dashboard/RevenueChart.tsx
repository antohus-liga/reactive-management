import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";


import DashboardCard from "./DashboardCard";
import {useRevenueChart} from "@/features/dashboard/useRevenueChart.ts";

export default function RevenueChart(){

    const {
        data = [],
        isLoading
    } = useRevenueChart();



    if(isLoading){
        return (
            <DashboardCard title="Revenue">
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



    const formatted =
        data.map(item=>({
            ...item,
            date:
                new Date(item.date)
                    .toLocaleDateString(
                        "en-US",
                        {
                            month:"short",
                            day:"numeric"
                        }
                    )
        }));



    return (
        <DashboardCard title="Revenue">

            <div className="h-72">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <AreaChart
                        data={formatted}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />


                        <XAxis
                            dataKey="date"
                        />


                        <YAxis />


                        <Tooltip
                            formatter={
                                (value)=>
                                    `€${value}`
                            }
                        />


                        <Area
                            type="monotone"
                            dataKey="revenue"
                            fillOpacity={0.3}
                            strokeWidth={2}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </DashboardCard>
    );
}