import {Outlet} from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle.tsx";

export default function PublicShell() {
    return (
        <div className="min-h-screen max-h-full flex flex-col items-center justify-center gap-8">
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle/>
            </div>
            <Outlet/>
        </div>
    );
}
