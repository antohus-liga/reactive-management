import DashboardStats from "@/features/dashboard/DashboardStats.tsx";
import RevenueChart from "@/features/dashboard/RevenueChart.tsx";
import ProductionOverview from "@/features/dashboard/ProductionOverview.tsx";
import InventoryAlerts from "@/features/dashboard/InventoryAlerts.tsx";
import RecentActivity from "@/features/dashboard/RecentActivity.tsx";

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <DashboardStats />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <RevenueChart />
                <ProductionOverview />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                <InventoryAlerts />
                <RecentActivity />
            </div>
        </div>
    );
}
