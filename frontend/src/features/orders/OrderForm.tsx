import {DialogTitle} from "@headlessui/react";
import {getErrorMessage, getFieldErrors} from "@/lib/getErrorMessage.ts";
import {useOrderForm} from "@/features/orders/useOrderForm.ts";
import {TypeSelect} from "@/components/TypeSelect.tsx";
import {CompanyRoleLabel} from "@/types/CompanyRole.ts";
import CompanySelect from "@/components/CompanySelect.tsx";

import {Building2, Check, ShoppingCart, X,} from "lucide-react";
import FormSection from "@/components/FormSection.tsx";
import Button from "@/components/Button.tsx";

export default function OrderForm({
                                      onClose,
                                  }: {
    onClose: () => void;
}) {

    const form = useOrderForm();
    const error = form.create.error;
    const fieldErrors = getFieldErrors(error);

    if (form.getCompanies.isLoading) return null;

    const company =
        form.getCompanies.data?.find(
            c => c.publicId === form.order.companyPublicId
        );

    const availableRoles =
        company?.roles ?? [];

    return (
        <form onSubmit={(e) => form.handleSubmit(e, onClose)}>
            <div className="px-6 py-5">
                <div className="flex items-start gap-4">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/10">
                        <ShoppingCart size={18} className="text-blue-600 dark:text-blue-400"/>
                    </div>

                    <div className="flex-1">
                        <DialogTitle as="h1" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            Create Order
                        </DialogTitle>

                        <div className="mt-6">
                            <FormSection
                                title="Order Details"
                                icon={<Building2 size={16}/>}
                                description="Select the company and the role associated with this order."
                            >
                                <CompanySelect
                                    value={form.order.companyPublicId}
                                    onChange={(value) =>
                                        form.setOrder(prev => ({
                                            ...prev,
                                            companyPublicId: value,
                                            withRole: "",
                                        }))
                                    }
                                />

                                <label
                                    className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Company Role
                                    <TypeSelect
                                        values={availableRoles}
                                        labels={CompanyRoleLabel}
                                        value={form.order.withRole}
                                        onChange={(value) =>
                                            form.setOrder(prev => ({
                                                ...prev,
                                                withRole: value,
                                            }))
                                        }
                                        placeHolder="Select a role"
                                    />
                                    {fieldErrors?.withRole && (
                                        <p className="text-xs text-red-500">
                                            {fieldErrors.withRole}
                                        </p>
                                    )}
                                </label>
                            </FormSection>
                        </div>
                    </div>
                </div>
                <p className={`mt-6 text-sm text-red-500 ${!fieldErrors && error ? "visible" : "invisible"}`}>
                    {!fieldErrors && error
                        ? getErrorMessage(error)
                        : "Placeholder"}
                </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">
                <Button type="button" variant="secondary" icon={<X size={16}/>} onClick={onClose}>
                    Cancel
                </Button>

                <Button type="submit" icon={<Check size={16}/>}>
                    Create Order
                </Button>
            </div>
        </form>

    );
}
