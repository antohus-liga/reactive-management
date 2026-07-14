import {Outlet} from "react-router-dom";
import Topbar from "@/components/layout/Topbar.tsx";
import Sidebar from "@/components/layout/Sidebar.tsx";
import {useSidebarCollapsed} from "@/hooks/useSidebarCollapsed.ts";

export default function AppShell() {
    const {isCollapsed} = useSidebarCollapsed();

    return (
        <>
            <Topbar/>
            <div className="flex">
                <Sidebar/>
                <main
                    className={`mt-16 flex-1 overflow-y-auto p-8 transition-all duration-200 ${isCollapsed ? "ml-16" : "ml-40"}`}>
                    <Outlet/>
                </main>
            </div>
        </>
    )
}
