import type {InputHTMLAttributes} from "react";

export default function TextField({label, error, inputProps}: {
    label: string,
    error?: string,
    inputProps: InputHTMLAttributes<HTMLInputElement>
}) {
    return (
        <label className={"flex flex-col gap-2 text-xl"}>
            {label}
            <input type={"text"} required={true} {...inputProps}
                   className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg disabled:bg-gray-800 disabled:text-gray-400 disabled:placeholder:text-gray-500 disabled:ring-gray-600 disabled:cursor-not-allowed disabled:opacity-80"}/>
            {error && <p className="text-red-400 text-xl">{error}</p>}
        </label>
    );
}
