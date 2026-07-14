import type {ReactNode} from "react";
import {Plus} from "lucide-react";
import FormSection from "@/components/FormSection.tsx";
import Button from "@/components/Button.tsx";

type RepeaterFieldProps = {
    title: string;
    description?: string;
    emptyText?: string;
    addLabel?: string;
    onAdd: () => void;
    children: ReactNode;
};

export default function RepeaterField(
    {
        title,
        description,
        emptyText = "No items.",
        addLabel = "Add Item",
        onAdd,
        children,
    }:
    RepeaterFieldProps) {
    const hasChildren = Array.isArray(children)
        ? children.length > 0
        : !!children;

    return (
        <FormSection title={title} description={description}>
            <div className="space-y-4">
                {hasChildren
                    ? (children)
                    : (
                        <div
                            className="rounded-xl border border-dashed border-zinc-300 px-6 py-10 text-center dark:border-zinc-700">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {emptyText}
                            </p>
                        </div>
                    )}

                <Button type="button" variant="secondary" icon={<Plus/>} onClick={onAdd}>
                    {addLabel}
                </Button>

            </div>
        </FormSection>
    );
}