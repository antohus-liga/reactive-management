import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import {type Dispatch, type SetStateAction} from "react";
import CompanyForm from "@/features/companies/CompanyForm.tsx";
import type {CompanyResponse} from "@/features/companies/api.ts";

export default function NewCompanyModal(
    {open, setOpen, updateTarget, setUpdateTarget}: {
        open: boolean,
        setOpen: Dispatch<SetStateAction<boolean>>,
        updateTarget?: CompanyResponse,
        setUpdateTarget: (value: CompanyResponse | undefined) => void,
    }) {

    return (
        <div>
            <Dialog open={open} onClose={() => {
                setOpen(false);
                setUpdateTarget(undefined);
            }} className="relative w-10 z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="ml-20 mt-10 fixed inset-0 z-10 w-screen overflow-hidden">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform w-fit overflow-hidden rounded-lg text-left shadow-xl bg-gray-800 outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            {open && <CompanyForm key={updateTarget?.publicId} initial={updateTarget} setOpen={setOpen} setUpdateTarget={setUpdateTarget}/>}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
