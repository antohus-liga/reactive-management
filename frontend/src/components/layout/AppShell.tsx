import {Outlet} from "react-router-dom";

export default function AppShell() {
    return (
        <div className={"flex min-h-screen max-h-full bg-gray-900 text-white"}>
            <main className={"flex-1 overflow-y-auto p-8"}>
                <Outlet/>
            </main>
        </div>
    )
}