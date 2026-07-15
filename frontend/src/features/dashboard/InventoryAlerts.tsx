import {AlertTriangle} from "lucide-react";

import DashboardCard from "./DashboardCard";
import {useFetchMaterials} from "@/features/materials/hooks.ts";
import {useFetchProducts} from "@/features/products/hooks.ts";
import Badge from "@/components/Badge.tsx";
import {MeasurementTypeLabel} from "@/types/MeasurementType.ts";
import {useTranslation} from "react-i18next";

export default function InventoryAlerts() {
    const {t} = useTranslation();
    const {data: materials = [], isLoading: materialsLoading,} = useFetchMaterials();
    const {data: products = [], isLoading: productsLoading,} = useFetchProducts();

    if (materialsLoading || productsLoading) {
        return (
            <DashboardCard title={t("inventoryAlerts")}>
                <div className="h-72 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800"/>
            </DashboardCard>
        );
    }

    const lowMaterials = materials
        .filter((material) => material.quantity <= 5)
        .sort((a, b) => a.quantity - b.quantity)
        .slice(0, 5);

    const lowProducts = products
        .filter((product) => product.quantity <= 5)
        .sort((a, b) => a.quantity - b.quantity)
        .slice(0, 5);

    return (
        <DashboardCard title={t("inventoryAlerts")}>
            <div className="space-y-8">
                <InventorySection
                    title={t("lowStockMaterials")}
                    items={lowMaterials.map((material) => ({
                        name: material.description,
                        quantity: material.quantity,
                        measurement: t(MeasurementTypeLabel[material.measurement]),
                    }))}
                />

                <InventorySection
                    title={t("lowStockProducts")}
                    items={lowProducts.map((product) => ({
                        name: product.description,
                        quantity: product.quantity,
                        measurement: t(MeasurementTypeLabel[product.measurement]),
                    }))}
                />
            </div>
        </DashboardCard>
    );
}


function InventorySection(
    {
        title,
        items,
    }: {
        title: string;
        items: {
            name: string;
            quantity: number;
            measurement: string;
        }[];
    }) {
    const {t} = useTranslation();

    return (
        <section>
            <div className="mb-4 flex items-center gap-2">
                <div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                    <AlertTriangle size={16}/>
                </div>

                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {title}
                </h3>
            </div>

            {items.length === 0 ? (
                <div
                    className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-4 py-5 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
                    {t("noLowStock")}
                </div>
            ) : (
                <div className="space-y-2">
                    {items.map((item) => (
                        <div
                            key={item.name}
                            className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/70"
                        >
                            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                {item.name}
                            </span>

                            <Badge variant={item.quantity <= 1 ? "danger" : "warning"}>
                                {item.quantity} {item.measurement}
                            </Badge>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
