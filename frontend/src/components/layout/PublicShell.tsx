import {Outlet} from "react-router-dom";

export default function PublicShell() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <Outlet/>
        </div>
    );
}
