import {Link} from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 gap-8 px-4 text-center">
            <div className="rounded-full relative w-40 h-40 flex items-center justify-center">
                <img
                    src="/favicon.png"
                    alt="logo"
                    className="absolute inset-0 w-full h-full object-contain opacity-35 dark:opacity-45 dark:invert"
                />
            </div>
            <div className="flex flex-col items-center gap-3">
                <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">404 — Page not found</h1>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">
                    The page you're looking for doesn't exist or may have been moved.
                </p>
            </div>
            <Link
                to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-medium rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
            >
                Go back home
            </Link>
        </div>
    )
}