import {DialogTitle} from "@headlessui/react";
import {getErrorMessage, getFieldErrors} from "@/lib/getErrorMessage.ts";
import type {CategoryResponse} from "@/features/categories/api.ts";
import {useCategoryForm} from "./useCategoryForm";
import {CategoryType} from "@/types/CategoryType.ts";
import TextField from "@/components/TextField.tsx";
import Checkbox from "@/components/Checkbox.tsx";
import FormSectionTitle from "@/components/FormSectionTitle.tsx";
import Badge from "@/components/Badge";
import Button from "@/components/Button.tsx";
import {Check, Tags, X} from "lucide-react";
import {useTranslation} from "react-i18next";

export default function CategoryForm(
    {
        initial,
        onClose,
    }: {
        initial: CategoryResponse | null;
        onClose: () => void;
    }) {
    const form = useCategoryForm(initial);
    const {t} = useTranslation();

    const error = form.create.error ?? form.update.error;
    const fieldErrors = getFieldErrors(error);

    return (
        <form onSubmit={(e) => form.handleSubmit(e, onClose)}>
            <div className="px-6 py-5">
                <div className="flex items-start gap-4">
                    <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/10">
                        <Tags className={"dark:invert"} size={18}/>
                    </div>
                    <div className="flex-1">
                        <DialogTitle as="h1" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            {initial ? t("updateCategory") : t("createNewCategory")}
                        </DialogTitle>
                        <div className="mt-6 space-y-6">
                            <section className="space-y-4">
                                <FormSectionTitle>
                                    {t("categoryInfo")}
                                </FormSectionTitle>
                                <TextField label={t("name")} error={fieldErrors?.name} inputProps={{
                                    placeholder: t("namePlaceholder"),
                                    value: form.category.name,
                                    onChange: (e) => form.setCategory(prev => ({
                                        ...prev,
                                        name:
                                        e.target.value,
                                    })),
                                }}
                                />

                                <label
                                    className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Color
                                    <div className="flex items-center gap-3">
                                        <input type="color" required value={form.category.colorHex}
                                               onChange={(e) =>
                                                   form.setCategory(prev => ({
                                                       ...prev,
                                                       colorHex:
                                                       e.target.value,
                                                   }))
                                               }
                                               className="h-10 w-14 cursor-pointer rounded-lg border border-zinc-300 bg-transparent p-1 dark:border-zinc-700"
                                        />

                                        <span
                                            className="rounded-md bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                                            {form.category.colorHex}
                                        </span>
                                    </div>

                                    {fieldErrors?.colorHex && (
                                        <p className="text-xs text-red-500">{fieldErrors.colorHex}</p>
                                    )}
                                </label>
                            </section>

                            <section className="space-y-3">
                                <FormSectionTitle>
                                    {t("categoryTypes")}
                                </FormSectionTitle>

                                <div className="space-y-2">
                                    <label
                                        className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                                        <Checkbox label={t("material")}
                                                  checked={form.category.types.includes(CategoryType.MATERIAL)}
                                                  onChange={(checked) => form.toggleType(CategoryType.MATERIAL, checked)}
                                        />

                                        <Badge variant="info">{t("material")}</Badge>
                                    </label>

                                    <label
                                        className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                                        <Checkbox label={t("product")}
                                                  checked={form.category.types.includes(CategoryType.PRODUCT)}
                                                  onChange={(checked) => form.toggleType(CategoryType.PRODUCT, checked)}
                                        />
                                        <Badge variant="neutral">{t("product")}</Badge>
                                    </label>
                                </div>
                                {fieldErrors?.types && (
                                    <p className="text-xs text-red-500">{fieldErrors.types}</p>
                                )}
                            </section>
                        </div>
                    </div>
                </div>

                <p className={`mt-4 text-sm text-red-500 ${!fieldErrors && error ? "visible" : "invisible"}`}>
                    {!fieldErrors && error ? getErrorMessage(error) : "Placeholder"}
                </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">
                <Button type="button" variant="secondary" icon={<X/>} onClick={onClose}>
                    {t("cancel")}
                </Button>

                <Button type="submit" icon={<Check/>}>
                    {initial ? t("update") : t("create")}
                </Button>
            </div>
        </form>
    );
}
