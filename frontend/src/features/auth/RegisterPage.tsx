import {Link} from "react-router-dom";
import {getErrorMessage, getFieldErrors} from "@/lib/getErrorMessage.ts";
import {CompanyType, CompanyTypeLabel} from "@/types/CompanyType.ts";
import {countryOptions} from "@/features/auth/countryOptions.ts";
import {useRegisterForm} from "@/features/auth/useRegisterForm.ts";
import {TypeSelect} from "@/components/TypeSelect.tsx";
import TextField from "@/components/TextField.tsx";

export default function RegisterPage() {
    const form = useRegisterForm()
    const fieldErrors = getFieldErrors(form.error)

    return (
        <>
            <div className="rounded-full relative w-40 h-40 flex items-center justify-center">
                <img src="/favicon.png" alt="logo"
                     className="absolute inset-0 w-full h-full object-contain opacity-35 dark:opacity-45"/>
            </div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 -mt-4 mb-2">Register</h1>
            <form
                onSubmit={form.handleSubmit}
                className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-2xl p-8 gap-6 flex flex-col">
                <div className="flex flex-col gap-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        Company Information
                    </h2>
                    <TextField label={"Company Name"} error={fieldErrors?.companyName} inputProps={{
                        placeholder: "Enter your company name",
                        value: form.companyName,
                        onChange: (e) => form.setCompanyName(e.target.value),
                    }}/>
                    <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Company Type
                        <TypeSelect value={form.companyType} onChange={form.setCompanyType}
                                    values={Object.values(CompanyType)}
                                    labels={CompanyTypeLabel} placeHolder={"Select a company type"}/>
                        {fieldErrors?.companyType &&
                            <p className="text-red-500 text-xs font-normal">{fieldErrors.companyType}</p>}
                    </label>
                    <TextField label={"Tax ID"} error={fieldErrors?.taxId} inputProps={{
                        placeholder: "Enter your company tax ID",
                        value: form.taxId,
                        onChange: (e) => form.setTaxId(e.target.value),
                    }}/>
                </div>
                <hr className="border-zinc-200 dark:border-zinc-800"/>
                <div className="flex flex-col gap-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Company
                        Contacts</h2>
                    <TextField label={"Phone number"} error={fieldErrors?.phoneNumber} inputProps={{
                        placeholder: "Enter your company phone number",
                        value: form.phoneNumber,
                        onChange: (e) => form.setPhoneNumber(e.target.value),
                    }}/>
                    <TextField label={"Email"} error={fieldErrors?.email} inputProps={{
                        name: "email",
                        type: "email",
                        placeholder: "Enter your company email address",
                        value: form.email,
                        onChange: (e) => form.setEmail(e.target.value),
                    }}/>
                </div>
                <hr className="border-zinc-200 dark:border-zinc-800"/>
                <div className="flex flex-col gap-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Company
                        Localization</h2>
                    <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Country
                        <CountrySelect value={form.country} setValue={form.setCountry}/>
                        {fieldErrors?.country &&
                            <p className="text-red-500 text-xs font-normal">{fieldErrors.country}</p>}
                    </label>
                    <TextField label={"Address"} error={fieldErrors?.address} inputProps={{
                        placeholder: "Enter your company address",
                        value: form.address,
                        onChange: (e) => form.setAddress(e.target.value),
                    }}/>
                </div>
                <hr className="border-zinc-200 dark:border-zinc-800"/>
                <div className="flex flex-col gap-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Password</h2>
                    <TextField label={"Account Password"} error={fieldErrors?.password} inputProps={{
                        name: "password",
                        type: "password",
                        value: form.password,
                        onChange: (e) => form.setPassword(e.target.value),
                    }}/>
                </div>
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className={`text-red-500 text-sm text-center ${!fieldErrors && form.error ? "visible" : "invisible"}`}>
                        {!fieldErrors && form.error ? getErrorMessage(form.error) : "Placeholder"}
                    </p>
                    <button
                        disabled={form.isPending}
                        type={"submit"}
                        className="w-full sm:w-fit sm:min-w-64 mt-2 disabled:opacity-50 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-medium rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                    >
                        Register
                    </button>
                    <Link
                        className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-2 transition-colors duration-150"
                        to="/signin"
                    >
                        or sign in
                    </Link>
                </div>
            </form>
        </>
    );
}

export function CountrySelect({value, setValue, error}: {
    value: string,
    setValue: (value: string) => void,
    error?: string
}) {
    return (
        <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            className={`p-2 pr-8 rounded-md ring-1 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors duration-150 outline-none focus:ring-2 appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.25em_1.25em] bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%221.5%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19.5%208.25l-7.5%207.5-7.5-7.5%22%2F%3E%3C%2Fsvg%3E')] ${
                error
                    ? "ring-red-400 dark:ring-red-500 focus:ring-red-500"
                    : "ring-zinc-300 dark:ring-zinc-700 focus:ring-blue-500"
            }`}
        >
            <option value="" disabled className="text-zinc-400 dark:text-zinc-500">
                Select country
            </option>
            {countryOptions.map((country) => (
                <option key={country.value} value={country.value}>
                    {country.label}
                </option>
            ))}
        </select>
    );
}
