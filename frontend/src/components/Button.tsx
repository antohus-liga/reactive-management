import type {ReactNode} from "react";
import clsx from "clsx";

type ButtonProps = {
    children: ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger" | "success";
    className?: string;
    disabled?: boolean;
    icon?: ReactNode;
};

export default function Button(
    {
        children,
        icon,
        variant = "primary",
        className = "",
        ...props
    }: ButtonProps) {
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm",
        secondary: "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800",
        danger: "bg-red-600 hover:bg-red-700 text-white",
        success: "bg-green-600 hover:bg-green-700 text-white",
    };

    return (
        <button
            {...props}
            className={clsx(
                "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
                variants[variant],
                className
            )}
        >
            {icon && (<span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4"> {icon} </span>)}
            {children}
        </button>
    );
}
