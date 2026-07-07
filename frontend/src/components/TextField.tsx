import type {InputHTMLAttributes} from "react";

export default function TextField({label, error, inputProps}: {
    label: string,
    error?: string,
    inputProps: InputHTMLAttributes<HTMLInputElement>
}) {
    return (
        <label className={"flex flex-col gap-2 text-xl"}>
            {label}
            <input type={"text"} {...inputProps} required={true}
                   className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
            {error && <p className="text-red-400 text-xl">{error}</p>}
        </label>
    );
}
