import {useSignInForm} from "@/features/auth/useSignInForm.ts";
import {getErrorMessage} from "@/lib/getErrorMessage.ts";
import {Link} from "react-router-dom";
import TextField from "@/components/TextField.tsx";
import {useTranslation} from "react-i18next";

export default function SignInPage() {
    const form = useSignInForm();
    const {t} = useTranslation();
    return (
        <>
            <div className="rounded-full relative w-40 h-40 flex items-center justify-center">
                <img
                    src="/favicon.png"
                    alt="logo"
                    className="absolute inset-0 w-full h-full object-contain opacity-35 dark:opacity-45"
                />
            </div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 -mt-4 mb-2">{t("signIn")}</h1>
            <form
                onSubmit={form.handleSubmit}
                className="w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-2xl p-8 gap-5 flex flex-col justify-center items-stretch">
                <TextField label={t("email")} inputProps={{
                    name: "email",
                    type: "email",
                    value: form.email,
                    onChange: (e) => form.setEmail(e.target.value),
                }}/>
                <TextField label={t("password")} inputProps={{
                    name: "password",
                    type: "password",
                    value: form.password,
                    onChange: (e) => form.setPassword(e.target.value),
                }}/>
                <p className={`text-red-500 text-sm text-center ${form.error ? "visible" : "invisible"}`}>
                    {form.error ? getErrorMessage(form.error) : "Placeholder"}
                </p>
                <button
                    disabled={form.isPending}
                    type={"submit"}
                    className="w-full mt-2 disabled:opacity-50 bg-blue-600 hover:bg-blue-700 text-white p-3 text-sm font-medium rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                >
                    {t("signIn")}
                </button>
                <Link
                    className="text-sm text-center text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-2 transition-colors duration-150"
                    to="/register"
                >
                    {t("orRegister")}
                </Link>
            </form>
        </>
    );
}
