import {type ReactNode} from "react";

type FormSectionProps = {
    title: string;
    description?: string;
    icon?: ReactNode;
    children: ReactNode;
};

export default function FormSection(
    {
        title,
        description,
        icon,
        children,
    }: FormSectionProps) {
    return (
        <section className="space-y-4">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    {icon && (<span className="text-zinc-500 dark:text-zinc-400"> {icon} </span>)}

                    <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
                        {title}
                    </h2>
                </div>

                {description && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {description}
                    </p>
                )}
            </div>

            <div className="space-y-4">
                {children}
            </div>
        </section>
    );
}