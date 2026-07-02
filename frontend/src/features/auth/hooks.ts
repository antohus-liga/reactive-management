import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {authApi} from "@/features/auth/api.ts";
import {useNavigate} from "react-router-dom";

export function useSignIn() {
    return useMutation({
        mutationFn: authApi.signIn,
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: authApi.register,
    });
}

export function useCurrentUser() {
    return useQuery({
        queryKey: ["auth", "me"],
        queryFn: authApi.me,
        retry: false,
    });
}

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            queryClient.clear() // clear the cached data to avoid leaks across sessions
            navigate("/login")
        }
    });
}