import {DialogTitle} from "@headlessui/react";
import {getErrorMessage, getFieldErrors} from "@/lib/getErrorMessage.ts";
import {useMovementsForm} from "@/features/orders/useMovementsForm.ts";
import {TypeSelect} from "@/components/TypeSelect.tsx";
import {MovementType, MovementTypeLabel} from "@/types/MovementType.ts";
import {useFetchOrders} from "@/features/orders/hooks.ts";
import {CompanyRole} from "@/types/CompanyRole.ts";
import ProductSelect from "@/components/ProductSelect.tsx";
import MaterialSelect from "@/components/MaterialSelect.tsx";
import TextField from "@/components/TextField.tsx";
import {ArrowRightLeft, Check, Package, X,} from "lucide-react";
import Badge from "@/components/Badge.tsx";
import FormSection from "@/components/FormSection.tsx";
import Button from "@/components/Button.tsx";
import {useTranslation} from "react-i18next";

export default function MovementForm(
    {
        orderId,
        onClose,
    }: {
        orderId: string;
        onClose: () => void;
    }) {

    const getOrders = useFetchOrders();
    const currOrder =
        getOrders.data?.find(
            order => order.publicId === orderId
        );
    const {t} = useTranslation();

    const form = useMovementsForm(orderId);
    const error = form.addMovement.error;
    const fieldErrors = getFieldErrors(error);

    const isClientOrder = currOrder?.withRole === CompanyRole.CLIENT;

    return (
        <form onSubmit={(e) => form.handleSubmit(e, onClose)}>
            <div className="px-6 py-5">
                <div className="flex items-start gap-4">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/10">
                        <ArrowRightLeft size={18} className="text-blue-600 dark:text-blue-400"/>
                    </div>

                    <div className="flex-1">
                        <DialogTitle as="h1" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            {t("createMovement")}
                        </DialogTitle>

                        {currOrder && (
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {t("orderType")}
                                </span>

                                <Badge variant={isClientOrder ? "info" : "neutral"}>
                                    {isClientOrder ? t("client") : t("supplier")}
                                </Badge>
                            </div>
                        )}

                        <div className="mt-6">
                            <FormSection title={t("movementDetails")} icon={<Package size={16}/>}
                                         description={t("movementHint")}
                            >
                                <label
                                    className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    {t("movementType")}

                                    <TypeSelect values={Object.values(MovementType)}
                                                labels={MovementTypeLabel} value={form.movement.movementType}
                                                onChange={(value) => form.setMovement(prev => ({
                                                    ...prev,
                                                    movementType:
                                                    value,
                                                }))}
                                                placeHolder={t("movementTypePlaceholder")}
                                    />
                                </label>

                                <label
                                    className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    {isClientOrder
                                        ? (
                                            <>
                                                {t("product")}
                                                <ProductSelect
                                                    value={form.movement.productPublicId ?? ""}
                                                    onChange={(value) => form.setMovement(prev => ({
                                                        ...prev,
                                                        productPublicId: value,
                                                    }))}
                                                />
                                            </>
                                        )
                                        : (
                                            <>
                                                {t("material")}
                                                <MaterialSelect
                                                    value={form.movement.materialPublicId ?? ""}
                                                    onChange={(value) => form.setMovement(prev => ({
                                                        ...prev,
                                                        materialPublicId: value,
                                                    }))}
                                                />
                                            </>
                                        )}
                                </label>

                                <TextField label={t("quantity")} error={fieldErrors?.quantity}
                                           inputProps={{
                                               type: "number", min: 1, max: 999999,
                                               value: form.movement.quantity,
                                               onChange: e => form.setMovement(prev => ({
                                                   ...prev,
                                                   quantity: Number(e.target.value),
                                               }))
                                           }}
                                />
                                <TextField
                                    label={t("discountOpt")} error={fieldErrors?.discount}
                                    inputProps={{
                                        value: form.movement.discount ?? "", required: false,
                                        onChange: e => form.setMovement(prev => ({
                                            ...prev,
                                            discount: e.target.value === "" ? null : e.target.value,
                                        }))
                                    }}
                                />
                            </FormSection>
                        </div>
                    </div>
                </div>

                <p className={`mt-6 text-sm text-red-500 ${!fieldErrors && error ? "visible" : "invisible"}`}>
                    {!fieldErrors && error ? getErrorMessage(error) : "Placeholder"}
                </p>

            </div>
            <div className="flex justify-end gap-3 border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">
                <Button type="button" variant="secondary" icon={<X size={16}/>} onClick={onClose}>
                    {t("cancel")}
                </Button>

                <Button type="submit" icon={<Check size={16}/>}>
                    {t("createMovement")}
                </Button>
            </div>
        </form>
    );
}
