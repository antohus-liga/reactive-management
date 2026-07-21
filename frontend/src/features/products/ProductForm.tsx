import {DialogTitle} from "@headlessui/react";
import {translateError, getFieldErrors} from "@/lib/getErrorMessage.ts";
import TextField from "@/components/TextField.tsx";
import CategorySelect from "@/components/CategorySelect.tsx";
import {CategoryType} from "@/types/CategoryType.ts";
import {TypeSelect} from "@/components/TypeSelect.tsx";
import {MeasurementType, MeasurementTypeLabel} from "@/types/MeasurementType.ts";
import type {ProductResponse} from "@/features/products/api.ts";
import {useProductForm} from "@/features/products/useProductForm.ts";

import {Check, CircleDollarSign, Package, Tag, X,} from "lucide-react";
import FormSection from "@/components/FormSection.tsx";
import Button from "@/components/Button.tsx";
import Badge from "@/components/Badge.tsx";
import {useTranslation} from "react-i18next";

export default function ProductForm(
    {
        initial,
        onClose,
    }: {
        initial: ProductResponse | null;
        onClose: () => void;
    }) {
    const form = useProductForm(initial);
    const {t} = useTranslation();

    const error = form.create.error ?? form.update.error;
    const fieldErrors = getFieldErrors(error);

    return (
        <form onSubmit={(e) => form.handleSubmit(e, onClose)}>
            <div className="px-6 py-5">
                <div className="flex items-start gap-4">
                    <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/10">
                        <Package className={"dark:invert"} size={18}/>
                    </div>
                    <div className="flex-1">
                        <DialogTitle as="h1" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            {initial ? t("updateProduct") : t("createProduct")}
                        </DialogTitle>
                        <div className="mt-6 space-y-8">
                            <FormSection title={t("productInfo")} icon={<Package size={16}/>}>
                                <TextField label={t("description")} error={fieldErrors?.description} inputProps={{
                                    placeholder: t("descriptionPlaceholder"),
                                    value: form.product.description,
                                    onChange: (e) => form.setProduct(prev => ({
                                        ...prev,
                                        description:
                                        e.target.value,
                                    })),
                                }}
                                />

                                <label
                                    className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    {t("measurement")}
                                    <TypeSelect values={Object.values(MeasurementType)} labels={MeasurementTypeLabel}
                                                value={form.product.measurement}
                                                onChange={(value) => form.setProduct(prev => ({
                                                    ...prev,
                                                    measurement:
                                                    value,
                                                }))}
                                                placeHolder={t("measurementPlaceholder")}
                                    />

                                    {fieldErrors?.measurement && (
                                        <p className="text-xs text-red-500">
                                            {fieldErrors.measurement}
                                        </p>
                                    )}
                                </label>
                            </FormSection>
                            <FormSection title={t("pricing")} icon={<CircleDollarSign size={16}/>}
                                         description={t("pricingDescription")}
                            >

                                {form.product.fixedPrice && (
                                    <Badge variant="success">
                                        {t("fixedPricing")}
                                    </Badge>
                                )}

                                {form.product.sellingMargin && (
                                    <Badge variant="warning">
                                        {t("marginPricing")}
                                    </Badge>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <TextField label={t("fixedPrice")} error={fieldErrors?.fixedPrice} inputProps={{
                                        disabled: !!form.product.sellingMargin, type: "number", required: false,
                                        value: form.product.fixedPrice ?? "",
                                        onChange: (e) => form.setProduct(prev => ({
                                            ...prev,
                                            fixedPrice: e.target.value ? Number(e.target.value) : null,
                                        })),
                                    }}
                                    />

                                    <TextField label={t("sellingMargin")} error={fieldErrors?.sellingMargin}
                                               inputProps={{
                                                   disabled: !!form.product.fixedPrice,
                                                   required: false,
                                                   value: form.product.sellingMargin ?? "",
                                                   onChange: (e) => form.setProduct(prev => ({
                                                       ...prev,
                                                       sellingMargin: e.target.value || null,
                                                   })),
                                               }}
                                    />
                                </div>
                            </FormSection>
                            <FormSection title={t("categoryAndInventory")} icon={<Tag size={16}/>}>
                                <CategorySelect value={form.product.categoryPublicId}
                                                onChange={(value) => form.setProduct(prev => ({
                                                    ...prev,
                                                    categoryPublicId: value,
                                                }))}
                                                type={CategoryType.PRODUCT}
                                />

                                <TextField label={t("quantity")} error={fieldErrors?.quantity} inputProps={{
                                    disabled: !initial, type: "number",
                                    value: form.product.quantity,
                                    onChange: (e) => form.setProduct(prev => ({
                                        ...prev,
                                        quantity: Number(e.target.value),
                                    })),
                                }}
                                />

                                {!initial && (
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        {t("quantityDescription")}
                                    </p>
                                )}
                            </FormSection>
                        </div>
                    </div>
                </div>
                <p className={`mt-6 text-sm text-red-500 ${!fieldErrors && error ? "visible" : "invisible"}`}>
                    {!fieldErrors && error ? translateError(t, error) : "Placeholder"}
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
