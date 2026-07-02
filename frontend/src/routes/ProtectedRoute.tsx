import {useCurrentUser} from "@/features/auth/hooks.ts";
import {Navigate, Outlet} from "react-router-dom";

export default function ProtectedRoute() {
    const {data: user, isLoading, isError} = useCurrentUser();

    if (isLoading) return null;
    if (isError || !user) return <Navigate to={"/"} replace={true}/>

    return <Outlet/>;
}