import {Boxes, ClipboardList, DollarSign, Factory, Package} from "lucide-react";

import StatCard from "./StatCard";

import {useFetchProducts} from "@/features/products/hooks.ts";
import {useFetchMaterials} from "@/features/materials/hooks.ts";
import {useFetchOrders} from "@/features/orders/hooks.ts";
import {useFetchProductionOrders} from "@/features/productionOrders/hooks.ts";
import {useDashboardSales} from "@/features/dashboard/useDashboardSales.ts";

export default function DashboardStats() {

    const {
        data: products = [],
        isLoading: productsLoading,
    } = useFetchProducts();


    const {
        data: materials = [],
        isLoading: materialsLoading,
    } = useFetchMaterials();


    const {
        data: orders = [],
        isLoading: ordersLoading,
    } = useFetchOrders();


    const {
        data: productionOrders = [],
        isLoading: productionLoading,
    } = useFetchProductionOrders();


    const {
        sales,
        isLoading: salesLoading,
    } = useDashboardSales();

    const inventoryValue =
        products.reduce(
            (total, product) =>
                total + (product.quantity * product.price),
            0
        )
        +
        materials.reduce(
            (total, material) =>
                total + (material.quantity * material.unitPrice),
            0
        );


    const openOrders =
        orders.filter(
            order => !order.isCompleted
        ).length;


    const runningProduction =
        productionOrders.filter(
            order => order.status === "IN_PROGRESS"
        ).length;


    const formatCurrency = (value: number) =>
        new Intl.NumberFormat(
            "pt-PT",
            {
                style: "currency",
                currency: "EUR"
            }
        ).format(value);


    const stats = [
        {
            title: "Total Sales",
            value: formatCurrency(sales),
            icon: <DollarSign size={22}/>,
            description: "Product sales"
        },
        {
            title: "Inventory Value",
            value: formatCurrency(inventoryValue),
            icon: <Package size={22}/>,
        },
        {
            title: "Products",
            value: products.length,
            icon: <Boxes size={22}/>,
        },
        {
            title: "Materials",
            value: materials.length,
            icon: <Package size={22}/>,
        },
        {
            title: "Open Orders",
            value: openOrders,
            icon: <ClipboardList size={22}/>,
        },
        {
            title: "Production",
            value: runningProduction,
            icon: <Factory size={22}/>,
            description: "Currently running"
        }
    ];


    const isLoading =
        productsLoading ||
        materialsLoading ||
        ordersLoading ||
        productionLoading ||
        salesLoading;


    if (isLoading) {
        return (
            <div
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-6
                    gap-5
                "
            >
                {
                    Array.from({length: 6})
                        .map((_, index) => (
                            <div
                                key={index}
                                className="
                                    h-32
                                    rounded-xl
                                    bg-gray-800
                                    animate-pulse
                                "
                            />
                        ))
                }
            </div>
        )
    }


    return (
        <div
            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-6
                gap-5
            "
        >
            {
                stats.map(stat => (
                    <StatCard
                        key={stat.title}
                        {...stat}
                    />
                ))
            }
        </div>
    );
}
