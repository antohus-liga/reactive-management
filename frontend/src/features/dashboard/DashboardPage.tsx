import {useCurrentUser, useLogout} from "@/features/auth/hooks.ts";
import {Link} from "react-router-dom";

export function DashboardPage() {
    return (
        <>
            <Topbar/>
            <div className={"flex"}>
                <Sidebar/>
                <div className={"ml-40 mt-20 flex flex-col gap-4"}>
                    <div className={"flex flex-col gap-4"}>
                        <h2 className={"text-6xl"}>Summaries</h2>
                        <div>
                            <h3 className={"text-4xl"}>Clients</h3>
                        </div>
                        <hr className={"w-auto"}/>
                        <div>
                            <h3 className={"text-4xl"}>Suppliers</h3>
                        </div>
                        <hr className={"w-auto"}/>
                        <div>
                            <h3 className={"text-4xl"}>Materials</h3>
                        </div>
                        <hr className={"w-auto"}/>
                        <div>
                            <h3 className={"text-4xl"}>Products</h3>
                        </div>
                        <hr className={"w-auto"}/>
                        <div>
                            <h3 className={"text-4xl"}>Orders</h3>
                        </div>
                        <hr className={"w-auto"}/>
                        <div>
                            <h3 className={"text-4xl"}>Production</h3>
                        </div>
                    </div>
                    <hr className={"w-auto h-1 bg-white"}/>
                    <div>
                        <h2 className={"text-6xl"}>Charts</h2>
                    </div>
                </div>
            </div>
        </>
    );
}

function Sidebar() {
    return (
        <>
            <aside
                className={"bg-gray-800 fixed top-20 left-0 w-40 bottom-0 border-r border-gray-500 z-50 flex flex-col items-center"}
            >
                <ul className={"flex flex-col gap-8 text-center mt-8 text-xl"}>
                    <Link to={"/companies"}><li className={"bg-sky-700 border-2 border-sky-700 p-3 rounded-2xl transform hover:translate-x-3 hover:scale-120 hover:bg-sky-500 transition duration-200"}>Companies</li></Link>
                    <Link to={"/products"}><li className={"bg-black border-2 border-black p-3 rounded-2xl transform hover:translate-x-3 hover:scale-120 hover:bg-gray-900 transition duration-200"}>Products</li></Link>
                    <Link to={"/materials"}><li className={"bg-amber-700 border-2 border-amber-700 p-3 rounded-2xl transform hover:translate-x-3 hover:scale-120 hover:bg-amber-500 transition duration-200"}>Materials</li></Link>
                    <Link to={"/categories"}><li className={"bg-green-800 border-2 border-green-800 p-3 rounded-2xl transform hover:translate-x-3 hover:scale-120 hover:bg-green-600 transition duration-200"}>Categories</li></Link>
                    <Link to={"/orders"}><li className={"bg-red-700 border-2 border-red-700 p-3 rounded-2xl transform hover:translate-x-3 hover:scale-120 hover:bg-red-500 transition duration-200"}>Orders</li></Link>
                    <Link to={"/movements"}><li className={"bg-orange-900 border-2 border-orange-900 p-3 rounded-2xl transform hover:translate-x-3 hover:scale-120 hover:bg-orange-700 transition duration-200"}>Production</li></Link>
                </ul>
            </aside>
        </>
    );
}

function Topbar() {
    const {data: user} = useCurrentUser()
    const logout = useLogout()

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 h-20 bg-gray-700 border-b border-gray-500 z-50 px-6 flex items-center">
                <div className={"mr-auto"}>
                    <h1 className={"text-4xl"}>Dashboard</h1>
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
