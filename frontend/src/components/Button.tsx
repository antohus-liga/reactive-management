import type {ButtonHTMLAttributes} from "react";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "danger"
    | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
    primary: `
        bg-blue-600
        text-white
        hover:bg-blue-700
        focus:ring-blue-500
        disabled:bg-blue-300
    `,

    secondary: `
        border
        border-zinc-300
        bg-white
        text-zinc-700
        hover:bg-zinc-50
        focus:ring-zinc-400
        dark:border-zinc-700
        dark:bg-zinc-900
        dark:text-zinc-200
        dark:hover:bg-zinc-800
    `,

    danger: `
        bg-red-600
        text-white
        hover:bg-red-700
        focus:ring-red-500
        disabled:bg-red-300
    `,

    ghost: `
        text-zinc-600
        hover:bg-zinc-100
        focus:ring-zinc-400
        dark:text-zinc-300
        dark:hover:bg-zinc-800
    `,
};

export default function Button({
                                   variant = "primary",
                                   className = "",
                                   children,
                                   ...props
                               }: ButtonProps) {
    return (
        <button
            className={`
                inline-flex
                items-center
                justify-center
                rounded-md
                px-4
                py-2
                text-sm
                font-medium
                shadow-sm
                transition-colors
                duration-150

                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                dark:focus:ring-offset-zinc-900

                disabled:cursor-not-allowed
                disabled:opacity-50

                ${variants[variant]}

                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}