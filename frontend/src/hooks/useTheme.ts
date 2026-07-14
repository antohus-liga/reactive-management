import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === "undefined") return "light";
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") return stored;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

    return { theme, toggleTheme };
}