import {DialogTitle} from "@headlessui/react";
import {getErrorMessage, getFieldErrors} from "@/lib/getErrorMessage.ts";
import {useProductionOrderForm} from "@/features/productionOrders/useProductionOrderForm.ts";
import ProductSelect from "@/components/ProductSelect.tsx";
import TextField from "@/components/TextField.tsx";

import {Check, X} from "lucide-react";
import FormSection from "@/components/FormSection.tsx";
import Button from "@/components/Button.tsx";
import {useTranslation} from "react-i18next";

export default function ProductionOrderForm(
    {
        onClose
    }: {
        onClose: () => void
    }) {

    const form = useProductionOrderForm();
    const error = form.create.error;
    const fieldErrors = getFieldErrors(error);
    const {t} = useTranslation();

    if (form.getProducts.isLoading) return null;

    return (
        <form onSubmit={(e) => form.handleSubmit(e, onClose)}>
            <div className="px-6 py-5 bg-white dark:bg-zinc-900">
                <div className="flex items-start gap-4">
                    <div
                        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                        <Check size={20}/>
                    </div>

                    <div className="flex-1">
                        <DialogTitle as="h1" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            {t("createNewProductionOrder")}
                        </DialogTitle>

                        <div className="mt-5">
                            <FormSection title={t("product")}>
                                <ProductSelect
                                    value={form.production.productPublicId}
                                    onChange={value => form.setProduction(prev => ({
                                        ...prev,
                                        productPublicId: value,
                                    }))
                                    }
                                />

                                <TextField label={t("quantity")} error={fieldErrors?.quantity} inputProps={{
                                    type: "number", min: 1, max: 999999,
                                    value: form.production.quantity,
                                    onChange: e => form.setProduction(prev => ({
                                        ...prev,
                                        quantity: Number(e.target.value)
                                    }))
                                }}
                                />
                            </FormSection>
                        </div>
                    </div>
                </div>

                <p className={`mt-4 text-sm text-red-500 ${!fieldErrors && error ? "visible" : "invisible"}`}>
                    {!fieldErrors && error ? getErrorMessage(error) : "Placeholder"}
                </p>
            </div>

            <div
                className="flex flex-col-reverse gap-3 border-t border-zinc-200 bg-zinc-50 px-6 py-4 sm:flex-row sm:justify-end dark:border-zinc-800 dark:bg-zinc-900/50">

                <Button type="button" variant="secondary" icon={<X size={16}/>} onClick={onClose}>
                    {t("cancel")}
                </Button>

                <Button type="submit" variant="success" icon={<Check size={16}/>}>
                    {t("create")}
                </Button>
            </div>
        </form>
    );
}