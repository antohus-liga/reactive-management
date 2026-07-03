import {useCurrentUser, useLogout} from "@/features/auth/hooks.ts";
import {useMatches} from "react-router-dom";

export default function Topbar() {
    const {data: user} = useCurrentUser()
    const logout = useLogout()
    const matches = useMatches()
    const title =
        (matches.at(-1)?.handle as { title?: string } | undefined)?.title ?? "";

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 h-20 bg-gray-700 border-b border-gray-500 z-50 px-6 flex items-center">
                <div className={"mr-auto"}>
                    <h1 className={"text-4xl"}>{title}</h1>
                </div>
                <div className={"flex items-center gap-4"}>
                    <h2>{user?.companyName}</h2>
                    <div className={"w-px bg-white h-12"}/>
                    <h2>{user?.email}</h2>
                    <div className={"w-px bg-white h-12"}/>
                    <button
                        className={"bg-red-700 hover:bg-red-600 border-2 border-red-500 rounded-lg transition duration-200 p-3 text-xl"}
                        onClick={() => logout.mutate()}
                    >
                        Sign Out
                    </button>
                </div>
            </header>
        </>
    );
}
