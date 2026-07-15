import {Outlet} from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle.tsx";
import LanguageSwitcher from "@/components/LanguageSwitcher.tsx";

export default function PublicShell() {
    return (
        <div className="min-h-screen max-h-full flex flex-col items-center justify-center gap-8">
            <div className="fixed flex top-4 right-4 z-50">
                <LanguageSwitcher/>
                <ThemeToggle/>
            </div>
            <Outlet/>
        </div>
    );
}
