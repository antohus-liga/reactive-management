import {Outlet} from "react-router-dom";

export default function PublicShell() {
    return (
        <div className="min-h-screen max-h-full flex flex-col items-center justify-center gap-8">
            <Outlet/>
        </div>
    );
}
