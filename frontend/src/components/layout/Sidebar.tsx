import {Link} from "react-router-dom";

export default function Sidebar() {
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
