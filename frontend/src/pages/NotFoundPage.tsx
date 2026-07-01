import {Link} from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className={"h-screen flex flex-col justify-center items-center bg-gray-900 text-white gap-8"}>
            <Link to={"/"}>
                <div className="rounded-full relative w-160 h-160 flex items-center justify-center">
                    <img
                        src="/favicon.png"
                        alt="logo"
                        className="absolute inset-0 w-full h-full object-contain opacity-20"
                    />
                    <div className={"relative flex flex-col justify-center items-center gap-20"}>
                        <h1 className={"text-6xl"}>404 - Page not found</h1>
                        <h2 className={"text-3xl font-bold"}>Go back</h2>
                    </div>
                </div>
            </Link>
        </div>
    )
}