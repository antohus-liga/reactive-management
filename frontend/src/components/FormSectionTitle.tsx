import type {ReactNode} from "react";

export default function FormSectionTitle({
                              children,
                          }: {
    children: ReactNode;
}) {
    return (
        <h2
            className="
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-zinc-500
                dark:text-zinc-400
            "
        >
            {children}
        </h2>
    );
}