import {Link, useLocation} from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();
    const path = location.pathname;

    return (
        <>
            <aside
                className={"bg-gray-800 fixed top-20 left-0 w-40 bottom-0 border-r border-gray-500 z-50 flex flex-col items-center"}
            >
                <ul className={"flex flex-col gap-8 text-center mt-8 text-xl"}>
                    <Link to={"/dashboard"}><li className={`${path === "/dashboard" ? "scale-110 translate-x-1.5" : ""} bg-slate-400 border-2 border-slate-400 p-3 rounded-2xl transform hover:translate-x-3 hover:scale-120 hover:bg-slate-300 transition duration-200`}>Dashboard</li></Link>
                    <Link to={"/companies"}><li className={`${path === "/companies" ? "scale-110 translate-x-1.5" : ""} bg-sky-700 border-2 border-sky-700 p-3 rounded-2xl transform hover:translate-x-3 hover:scale-120 hover:bg-sky-500 transition duration-200`}>Companies</li></Link>
                    <Link to={"/products"}><li className={`${path === "/products" ? "scale-110 translate-x-1.5" : ""} bg-black border-2 border-black p-3 rounded-2xl transform hover:translate-x-3 hover:scale-120 hover:bg-gray-900 transition duration-200`}>Products</li></Link>
                    <Link to={"/materials"}><li className={`${path === "/materials" ? "scale-110 translate-x-1.5" : ""} bg-amber-700 border-2 border-amber-700 p-3 rounded-2xl transform hover:translate-x-3 hover:scale-120 hover:bg-amber-500 transition duration-200`}>Materials</li></Link>
                    <Link to={"/categories"}><li className={`${path === "/categories" ? "scale-110 translate-x-1.5" : ""} bg-green-800 border-2 border-green-800 p-3 rounded-2xl transform hover:translate-x-3 hover:scale-120 hover:bg-green-600 transition duration-200`}>Categories</li></Link>
                    <Link to={"/orders"}><li className={"bg-red-700 border-2 border-red-700 p-3 rounded-2xl transform hover:translate-x-3 hover:scale-120 hover:bg-red-500 transition duration-200"}>Orders</li></Link>
                    <Link to={"/movements"}><li className={"bg-orange-900 border-2 border-orange-900 p-3 rounded-2xl transform hover:translate-x-3 hover:scale-120 hover:bg-orange-700 transition duration-200"}>Production</li></Link>
                </ul>
            </aside>
        </>
    );
}
