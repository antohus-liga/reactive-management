import type {ReactNode} from "react";

type BadgeVariant =
    | "neutral"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "indigo";

interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
    neutral: `
        bg-zinc-100
        text-zinc-700 
        
        dark:bg-zinc-800
        dark:text-zinc-300
    `,

    info: `
        bg-blue-100
        text-blue-700

        dark:bg-blue-500/10
        dark:text-blue-300
    `,

    success: `
        bg-emerald-100
        text-emerald-700

        dark:bg-emerald-500/10
        dark:text-emerald-300
    `,

    warning: `
        bg-amber-100
        text-amber-700

        dark:bg-amber-500/10
        dark:text-amber-300
    `,

    danger: `
        bg-red-100
        text-red-700

        dark:bg-red-500/10
        dark:text-red-300
    `,

    indigo: `
        bg-indigo-100
        text-indigo-700

        dark:bg-indigo-500/10
        dark:text-indigo-300
    `,
};

export default function Badge(
    {
        children,
        variant = "neutral",
    }: BadgeProps) {
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${variants[variant]}`}>
            {children}
        </span>
    );
}