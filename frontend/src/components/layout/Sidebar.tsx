import {Link, useLocation} from "react-router-dom";

import {
    LayoutDashboard,
    Building2,
    Package,
    Boxes,
    Tags,
    ClipboardList,
    Factory,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";
import {useSidebarCollapsed} from "@/hooks/useSidebarCollapsed.ts";
import {useTranslation} from "react-i18next";

export default function Sidebar() {
    const location = useLocation();
    const path = location.pathname;
    const { isCollapsed, toggle } = useSidebarCollapsed();
    const {t} = useTranslation();

    const navItems = [
        {to: "/dashboard", label: t("dashboard"), icon: LayoutDashboard},
        {to: "/companies", label: t("companies"), icon: Building2},
        {to: "/products", label: t("products"), icon: Package},
        {to: "/materials", label: t("materials"), icon: Boxes},
        {to: "/categories", label: t("categories"), icon: Tags},
        {to: "/orders", label: t("orders"), icon: ClipboardList},
        {to: "/production-orders", label: t("production"), icon: Factory},
    ];

    return (
        <aside
            className={`bg-white dark:bg-zinc-900 fixed top-16 left-0 bottom-0 border-r border-zinc-200 dark:border-zinc-800 z-40 flex flex-col items-stretch py-6 overflow-y-auto overflow-x-hidden transition-all duration-200 ${
                isCollapsed ? "w-16" : "w-40"
            }`}
        >
            <ul className="flex flex-col gap-1 px-2 text-sm">
                {navItems.map(({to, label, icon: Icon}) => {
                    const isActive = path === to;
                    return (
                        <li key={to}>
                            <Link
                                to={to}
                                title={isCollapsed ? label : undefined}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-medium border-l-2 transition-colors duration-150 ${
                                    isActive
                                        ? "bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-700 dark:text-blue-400"
                                        : "border-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                                }`}
                            >
                                <Icon className="size-4.5 shrink-0" strokeWidth={2}/>
                                <span
                                    className={`truncate transition-all duration-200 ${
                                        isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                                    }`}
                                >
                                {label}
                            </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <div className="mt-auto px-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <button
                    onClick={toggle}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150"
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {isCollapsed ? <PanelLeftOpen className="size-4.5 shrink-0"/> : <PanelLeftClose className="size-4.5 shrink-0"/>}
                    <span
                        className={`truncate transition-all duration-200 ${
                            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                        }`}
                    >
                    {t("collapse")}
                </span>
                </button>
            </div>
        </aside>
    );
}
