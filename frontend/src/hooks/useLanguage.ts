import {useSyncExternalStore} from "react";
import i18n from "@/i18n/index.ts";

export type LanguageCode = "en" | "pt" | "de" | "fr";

export const LANGUAGES: { code: LanguageCode; label: string }[] = [
    {code: "en", label: "English"},
    {code: "pt", label: "Português"},
    {code: "de", label: "Deutsch"},
    {code: "fr", label: "Français"},
];

const STORAGE_KEY = "language";
const listeners = new Set<() => void>();

function getInitialLanguage(): LanguageCode {
    if (typeof window === "undefined") return "en";
    const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (stored && LANGUAGES.some(l => l.code === stored)) return stored;
    // Fall back to whatever i18next already resolved (e.g. via browser detector)
    const detected = i18n.language?.split("-")[0] as LanguageCode | undefined;
    if (detected && LANGUAGES.some(l => l.code === detected)) return detected;
    return "en";
}

let language: LanguageCode = getInitialLanguage();

// Keep i18next in sync with our persisted choice on load
if (typeof window !== "undefined" && i18n.language !== language) {
    i18n.changeLanguage(language);
}

function subscribe(callback: () => void) {
    listeners.add(callback);
    return () => listeners.delete(callback);
}

function getSnapshot() {
    return language;
}

function setLanguage(value: LanguageCode) {
    language = value;
    localStorage.setItem(STORAGE_KEY, value);
    i18n.changeLanguage(value);
    listeners.forEach(l => l());
}

export function useLanguage() {
    const currentLanguage = useSyncExternalStore(subscribe, getSnapshot, () => "en" as LanguageCode);
    return {language: currentLanguage, setLanguage};
}