import {useSignInForm} from "@/features/auth/useSignInForm.ts";
import {getErrorMessage} from "@/lib/getErrorMessage.ts";
import {Link} from "react-router-dom";

export function SignInPage() {
    const {email, setEmail, password, setPassword, handleSubmit, isPending, error} = useSignInForm()
    return (
        <div className={"h-screen flex flex-col items-center justify-center gap-16 bg-gray-900 text-white"}>
            <div className="rounded-full relative w-70 h-70 flex items-center justify-center">
                <img
                    src="/favicon.png"
                    alt="logo"
                    className="absolute inset-0 w-full h-full object-contain opacity-20"
                />
                <div className={"relative flex flex-col justify-center items-center gap-20"}>
                    <h1 className={"text-6xl font-mono"}>Sign in</h1>
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className={"bg-gray-700 drop-shadow-xl drop-shadow-emerald-200 rounded-lg p-8 gap-6 flex flex-col justify-center items-center text-2xl"}>
                <label className={"flex flex-col gap-2"}>
                    Email
                    <input name="email" type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className={"p-2 rounded-lg ring-1 text-shadow-sm text-shadow-emerald-100"}/>
                </label>
                <label className={"flex flex-col gap-2"}>
                    Password
                    <input name="password" type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className={"p-2 rounded-lg ring-1 text-shadow-sm text-shadow-emerald-100"}/>
                </label>
                <p className={`text-red-400 text-xl ${error ? "visible" : "invisible"}`}>
                    {error ? getErrorMessage(error) : "Placeholder"}
                </p>
                <button
                    disabled={isPending}
                    type={"submit"}
                    className={"mt-8 w-fit disabled:blur-xs bg-emerald-400 p-4 text-2xl font-bold border-2 border-emerald-500 rounded-xl hover:bg-emerald-600 transition duration-200"}
                >
                    Sign in
                </button>
                <Link className={"text-xl underline hover:-translate-y-1 transition-transform duration-400"} to={`/register`}>or create a new one</Link>
            </form>
        </div>
    );
}
