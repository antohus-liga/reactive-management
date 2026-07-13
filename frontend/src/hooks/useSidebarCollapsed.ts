import { useSyncExternalStore } from "react";

const STORAGE_KEY = "sidebar-collapsed";
const listeners = new Set<() => void>();

let collapsed = typeof window !== "undefined"
    ? localStorage.getItem(STORAGE_KEY) === "true"
    : false;

function subscribe(callback: () => void) {
    listeners.add(callback);
    return () => listeners.delete(callback);
}

function getSnapshot() {
    return collapsed;
}

function setCollapsed(value: boolean) {
    collapsed = value;
    localStorage.setItem(STORAGE_KEY, String(value));
    listeners.forEach(l => l());
}

export function useSidebarCollapsed() {
    const isCollapsed = useSyncExternalStore(subscribe, getSnapshot, () => false);
    const toggle = () => setCollapsed(!collapsed);
    return { isCollapsed, toggle };
}