import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import type {ReactNode} from "react";

export default function Modal(
    {
        open,
        onClose,
        children,
    }: {
        open: boolean;
        onClose: () => void;
        children: ReactNode;
    }
) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            className="relative z-50"
        >

            <DialogBackdrop
                transition
                className="
                    fixed
                    inset-0
                    bg-zinc-950/40
                    backdrop-blur-sm
                    transition-opacity

                    data-closed:opacity-0
                    data-enter:duration-200
                    data-enter:ease-out
                    data-leave:duration-150
                    data-leave:ease-in
                "
            />


            <div
                className="
                    fixed
                    inset-0
                    z-50
                    flex
                    min-h-full
                    items-center
                    justify-center
                    p-4
                "
            >

                <DialogPanel
                    transition
                    className="
                        w-full
                        max-w-2xl
                        overflow-hidden
                        rounded-xl
                        border
                        border-zinc-200
                        bg-white
                        shadow-xl

                        transition-all

                        dark:border-zinc-800
                        dark:bg-zinc-900

                        data-closed:translate-y-4
                        data-closed:opacity-0

                        data-enter:duration-200
                        data-enter:ease-out

                        data-leave:duration-150
                        data-leave:ease-in

                        data-closed:sm:translate-y-0
                        data-closed:sm:scale-95
                    "
                >
                    {open && children}
                </DialogPanel>

            </div>

        </Dialog>
    );
}
