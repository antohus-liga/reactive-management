import {useCurrentUser} from "@/features/auth/hooks.ts";
import {Navigate, Outlet} from "react-router-dom";

export default function PublicOnlyRoute() {
    const {data: user, isLoading} = useCurrentUser();
    if (isLoading) return null;
    if (user) return <Navigate to={"/dashboard"} replace={true} />;
    return <Outlet/>;
}