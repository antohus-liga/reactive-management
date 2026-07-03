import {Outlet} from "react-router-dom";
import Topbar from "@/components/layout/Topbar.tsx";
import Sidebar from "@/components/layout/Sidebar.tsx";

export default function AppShell() {
    return (
        <>
            <Topbar/>
            <div className={"flex min-h-screen max-h-full"}>
                <Sidebar/>
                <main className={"flex-1 overflow-y-auto p-8"}>
                    <Outlet/>
                </main>
            </div>
        </>
    )
}