import {AlertTriangle} from "lucide-react";

import DashboardCard from "./DashboardCard";
import {useFetchMaterials} from "@/features/materials/hooks.ts";
import {useFetchProducts} from "@/features/products/hooks.ts";

export default function InventoryAlerts() {

    const {
        data: materials = [],
        isLoading: materialsLoading,
    } = useFetchMaterials();


    const {
        data: products = [],
        isLoading: productsLoading,
    } = useFetchProducts();

    if (materialsLoading || productsLoading) {
        return (
            <DashboardCard title="Inventory Alerts">
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

    const lowMaterials =
        materials
            .filter(
                material =>
                    material.quantity <= 5
            )
            .sort(
                (a, b) =>
                    a.quantity - b.quantity
            )
            .slice(0, 5);

    const lowProducts =
        products
            .filter(
                product =>
                    product.quantity <= 5
            )
            .sort(
                (a, b) =>
                    a.quantity - b.quantity
            )
            .slice(0, 5);

    return (
        <DashboardCard title="Inventory Alerts">

            <div className="space-y-6">


                <InventorySection
                    title="Low Stock Materials"
                    items={
                        lowMaterials.map(
                            material => ({
                                name: material.description,
                                quantity: material.quantity,
                                measurement: material.measurement
                            })
                        )
                    }
                />

                <InventorySection
                    title="Low Stock Products"
                    items={
                        lowProducts.map(
                            product => ({
                                name: product.description,
                                quantity: product.quantity,
                                measurement: product.measurement
                            })
                        )
                    }
                />

            </div>

        </DashboardCard>
    );
}


function InventorySection({
                              title,
                              items
                          }: {
    title: string;
    items: {
        name: string;
        quantity: number;
        measurement: string;
    }[];
}) {

    return (
        <div>

            <div
                className="
                    mb-3
                    flex
                    items-center
                    gap-2
                "
            >

                <AlertTriangle
                    size={18}
                    className="text-yellow-400"
                />

                <h3
                    className="
                        font-medium
                        text-gray-200
                    "
                >
                    {title}
                </h3>

            </div>


            {
                items.length === 0 ? (

                    <p
                        className="
                            text-sm
                            text-gray-500
                        "
                    >
                        No alerts 🎉
                    </p>

                ) : (

                    <div className="space-y-2">

                        {
                            items.map(item => (
                                <div
                                    key={item.name}
                                    className="
                                        flex
                                        justify-between
                                        rounded-lg
                                        bg-gray-700/50
                                        px-4
                                        py-3
                                    "
                                >

                                    <span>
                                        {item.name}
                                    </span>


                                    <span
                                        className="
                                            text-yellow-400
                                            font-semibold
                                        "
                                    >
                                        {item.quantity}
                                        {" "}
                                        {item.measurement}
                                    </span>

                                </div>
                            ))
                        }

                    </div>

                )
            }

        </div>
    );
}