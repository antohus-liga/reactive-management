import {Factory, Package, ShoppingCart} from "lucide-react";


import DashboardCard from "./DashboardCard";

import {useRecentActivity} from "@/features/dashboard/useRecentActivity";

const icons = {
    ORDER: <ShoppingCart size={18}/>,
    PRODUCTION: <Factory size={18}/>,
    MOVEMENT: <Package size={18}/>
};


export default function RecentActivity() {

    const {
        data = [],
        isLoading
    } = useRecentActivity();


    if (isLoading) {
        return (
            <DashboardCard title="Recent Activity">

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


    return (

        <DashboardCard title="Recent Activity">

            <div className="space-y-4">

                {
                    data.map(activity => (

                        <div
                            key={activity.id}
                            className="
                            flex
                            gap-4
                            rounded-lg
                            bg-gray-700/40
                            p-4
                        "
                        >

                            <div
                                className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                bg-gray-700
                            "
                            >
                                {
                                    icons[activity.type]
                                }
                            </div>


                            <div>

                                <p
                                    className="
                                    font-medium
                                "
                                >
                                    {activity.title}
                                </p>


                                <p
                                    className="
                                    text-sm
                                    text-gray-400
                                "
                                >
                                    {activity.description}
                                </p>


                                <p
                                    className="
                                    mt-1
                                    text-xs
                                    text-gray-500
                                "
                                >
                                    {
                                        activity.date
                                            .toLocaleString()
                                    }
                                </p>

                            </div>

                        </div>

                    ))
                }

            </div>

        </DashboardCard>

    );
}