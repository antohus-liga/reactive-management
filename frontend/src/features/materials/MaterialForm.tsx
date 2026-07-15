import {DialogTitle} from "@headlessui/react";
import {getErrorMessage, getFieldErrors} from "@/lib/getErrorMessage.ts";
import TextField from "@/components/TextField.tsx";
import {useMaterialForm} from "@/features/materials/useMaterialForm.ts";
import type {MaterialResponse} from "@/features/materials/api.ts";
import CategorySelect from "@/components/CategorySelect.tsx";
import {TypeSelect} from "@/components/TypeSelect.tsx";
import {MeasurementType, MeasurementTypeLabel} from "@/types/MeasurementType.ts";
import FormSectionTitle from "@/components/FormSectionTitle";
import Button from "@/components/Button";
import {CategoryType} from "@/types/CategoryType.ts";
import {Boxes, Check, X} from "lucide-react";
import {useTranslation} from "react-i18next";

export default function MaterialForm({initial, onClose}: {
    initial: MaterialResponse | null,
    onClose: () => void,
}) {
    const form = useMaterialForm(initial);
    const {t} = useTranslation();

    const error = form.create.error ?? form.update.error;
    const fieldErrors = getFieldErrors(error);

    return (
        <form onSubmit={(e) => form.handleSubmit(e, onClose)}>
            <div className="px-6 py-5">
                <div className="flex items-start gap-4">
                    <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/10">
                        <Boxes className={"dark:invert"} size={18}/>
                    </div>

                    <div className="flex-1">
                        <DialogTitle as="h1" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            {initial ? t("updateMaterial") : t("createNewMaterial")}
                        </DialogTitle>
                        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
                            <section className="space-y-4">
                                <FormSectionTitle>
                                    {t("materialInfo")}
                                </FormSectionTitle>

                                <TextField
                                    label={t("description")} error={fieldErrors?.description} inputProps={{
                                    placeholder: t("descriptionPlaceholder"),
                                    value: form.material.description,
                                    onChange: (e) => form.setMaterial(prev => ({
                                        ...prev,
                                        description: e.target.value
                                    })),
                                }}
                                />

                                <TextField
                                    label={t("unitPrice")} error={fieldErrors?.unitPrice}
                                    inputProps={{
                                        type: "number",
                                        value: form.material.unitPrice,
                                        onChange: (e) => form.setMaterial(prev => ({
                                            ...prev,
                                            unitPrice: Number(e.target.value)
                                        })),
                                    }}
                                />

                                <TextField
                                    label={t("quantity")} error={fieldErrors?.quantity}
                                    inputProps={{
                                        disabled: !initial, type: "number",
                                        value: form.material.quantity,
                                        onChange: (e) => form.setMaterial(prev => ({
                                            ...prev,
                                            quantity: Number(e.target.value)
                                        })),
                                    }}
                                />


                                <label
                                    className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    {t("measurement")}
                                    <TypeSelect values={Object.values(MeasurementType)} labels={MeasurementTypeLabel}
                                                value={form.material.measurement}
                                                onChange={value => form.setMaterial(prev => ({
                                                    ...prev,
                                                    measurement: value
                                                }))}
                                                placeHolder={t("measurementPlaceholder")}/>
                                    {fieldErrors?.measurement &&
                                        <p className="text-red-400 text-xl">{fieldErrors.measurement}</p>}
                                </label>
                            </section>

                            <section className="space-y-4">
                                <FormSectionTitle>
                                    {t("category")}
                                </FormSectionTitle>

                                <label
                                    className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    {t("materialCategory")}
                                    <CategorySelect
                                        value={form.material.categoryPublicId}
                                        onChange={(value) => form.setMaterial(prev => ({
                                            ...prev,
                                            categoryPublicId: value
                                        }))}
                                        type={CategoryType.MATERIAL}
                                    />
                                </label>
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
