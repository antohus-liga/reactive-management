import type {InputHTMLAttributes} from "react";
import {useTranslation} from "react-i18next";

export default function TextField({label, error, inputProps}: {
    label: string,
    error?: string,
    inputProps: InputHTMLAttributes<HTMLInputElement>
}) {
    const {t} = useTranslation();
    return (
        <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {label}
            <input type={"text"} required={true} {...inputProps}
                   className={`p-2 rounded-md ring-1 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-colors duration-150 outline-none focus:ring-2 ${
                       error
                           ? "ring-red-400 dark:ring-red-500 focus:ring-red-500"
                           : "ring-zinc-300 dark:ring-zinc-700 focus:ring-blue-500"
                   } disabled:bg-zinc-100 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-500 disabled:placeholder:text-zinc-400 dark:disabled:placeholder:text-zinc-600 disabled:ring-zinc-200 dark:disabled:ring-zinc-700 disabled:cursor-not-allowed disabled:opacity-80`}/>
            {error && <p className="text-red-500 text-xs font-normal">{t(error)}</p>}
        </label>
    );
}
