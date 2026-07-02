import {Link} from "react-router-dom";
import {getErrorMessage, getFieldErrors} from "@/lib/getErrorMessage.ts";
import {CompanyType, CompanyTypeLabel} from "@/types/CompanyType.ts";
import {countryOptions} from "@/features/auth/countryOptions.ts";
import {useRegisterForm} from "@/features/auth/useRegisterForm.ts";
import type {Dispatch, SetStateAction} from "react";

export function RegisterPage() {
    const {
        companyName,
        setCompanyName,
        companyType,
        setCompanyType,
        taxId,
        setTaxId,
        phoneNumber,
        setPhoneNumber,
        email,
        setEmail,
        country,
        setCountry,
        address,
        setAddress,
        password,
        setPassword,
        handleSubmit,
        isPending,
        error,
    } = useRegisterForm()
    const fieldErrors = getFieldErrors(error)

    return (
        <div className={"h-full flex flex-col items-center justify-center gap-16 bg-gray-900 text-white p-8"}>
            <div className="rounded-full relative w-70 h-70 flex items-center justify-center">
                <img
                    src="/favicon.png"
                    alt="logo"
                    className="absolute inset-0 w-full h-full object-contain opacity-20"
                />
                <div className={"relative flex flex-col justify-center items-center gap-20"}>
                    <h1 className={"text-6xl font-mono"}>Register</h1>
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className={"bg-gray-700 drop-shadow-xl drop-shadow-emerald-200 rounded-lg p-8 gap-6 flex flex-col text-2xl"}>
                <div className={"flex flex-col gap-4"}>
                    <h2 className={"text-3xl font-mono font-bold"}>Company Information</h2>
                    <label className={"flex flex-col gap-2"}>
                        Company Name
                        <input type="text" placeholder={"Enter your company name"}
                               required={true}
                               value={companyName}
                               onChange={(e) => setCompanyName(e.target.value)}
                               className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
                        {fieldErrors?.companyName && <p className="text-red-400 text-xl">{fieldErrors.companyName}</p>}
                    </label>
                    <label className={"flex flex-col gap-2"}>
                        Company Type
                        <CompanyTypeSelect value={companyType} setValue={setCompanyType}/>
                        {fieldErrors?.companyType && <p className="text-red-400 text-xl">{fieldErrors.companyType}</p>}
                    </label>
                    <label className={"flex flex-col gap-2"}>
                        Tax ID
                        <input type="text" placeholder={"Enter your company tax ID"}
                               required={true}
                               value={taxId}
                               onChange={(e) => setTaxId(e.target.value)}
                               className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
                        {fieldErrors?.taxId && <p className="text-red-400 text-xl">{fieldErrors.taxId}</p>}
                    </label>
                </div>
                <hr className={"w-full"}/>
                <div className={"flex flex-col gap-4"}>
                    <h2 className={"text-3xl font-mono font-bold"}>Company Contacts</h2>
                    <label className={"flex flex-col gap-2"}>
                        Phone number
                        <input type="text" placeholder={"Enter your company phone number"}
                               required={true}
                               value={phoneNumber}
                               onChange={(e) => setPhoneNumber(e.target.value)}
                               className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
                        {fieldErrors?.phoneNumber && <p className="text-red-400 text-xl">{fieldErrors.phoneNumber}</p>}
                    </label>
                    <label className={"flex flex-col gap-2"}>
                        Email
                        <input name="email" type="email" placeholder={"Enter your company email address"}
                               required={true}
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
                        {fieldErrors?.email && <p className="text-red-400 text-xl">{fieldErrors.email}</p>}
                    </label>
                </div>
                <hr className={"w-full"}/>
                <div className={"flex flex-col gap-4"}>
                    <h2 className={"text-3xl font-mono font-bold"}>Company Localization</h2>
                    <label className={"flex flex-col gap-2"}>
                        Country
                        <CountrySelect value={country} setValue={setCountry} />
                        {fieldErrors?.country && <p className="text-red-400 text-xl">{fieldErrors.country}</p>}
                    </label>
                    <label className={"flex flex-col gap-2"}>
                        Address
                        <input type="text" placeholder={"Enter your company address"}
                               required={true}
                               value={address}
                               onChange={(e) => setAddress(e.target.value)}
                               className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
                        {fieldErrors?.address && <p className="text-red-400 text-xl">{fieldErrors.address}</p>}
                    </label>
                </div>
                <hr className={"w-full"}/>
                <div className={"flex flex-col gap-4"}>
                    <h2 className={"text-3xl font-mono font-bold"}>Company Contacts</h2>
                    <label className={"flex flex-col gap-2"}>
                        Account Password
                        <input name="password" type="password"
                               required={true}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className={"p-2 rounded-lg ring-1 text-xl placeholder:text-lg"}/>
                        {fieldErrors?.password && <p className="text-red-400 text-xl">{fieldErrors.password}</p>}
                    </label>
                </div>
                <div className={"flex flex-col justify-center items-center gap-4"}>
                    <p className={`text-red-400 text-xl ${!fieldErrors && error ? "visible" : "invisible"}`}>
                        {!fieldErrors && error ? getErrorMessage(error) : "Placeholder"}
                    </p>
                    <button
                        disabled={isPending}
                        type={"submit"}
                        className={"mt-8 w-fit disabled:blur-xs bg-emerald-400 p-4 text-2xl font-bold border-2 border-emerald-500 rounded-xl hover:bg-emerald-600 transition duration-200"}
                    >
                        Register
                    </button>
                    <Link className={"text-xl underline hover:-translate-y-1 transition-transform duration-400"}
                          to={`/signin`}>or sign in</Link>
                </div>
            </form>
        </div>
    );
}

export function CompanyTypeSelect({value, setValue,}: {
    value: CompanyType | "",
    setValue: Dispatch<SetStateAction<CompanyType | "">>
}) {
    return (
        <select
            value={value}
            onChange={(e) =>
                setValue(e.target.value as CompanyType)
            }
            className={"p-2 rounded-lg ring-1 text-xl"}
            required={true}
        >
            <option value="" disabled>
                Select company type
            </option>

            {Object.values(CompanyType).map((type) => (
                <option key={type} value={type}>
                    {CompanyTypeLabel[type]}
                </option>
            ))}
        </select>
    );
}

export function CountrySelect({value, setValue}: {value: string, setValue: Dispatch<SetStateAction<string>>}) {
    return (
        <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            className={"p-2 rounded-lg ring-1 text-xl"}
        >
            <option value="" disabled>
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
