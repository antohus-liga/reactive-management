import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSignIn} from "@/features/auth/hooks.ts";
import type {SubmitEvent} from "react";

export function useSignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const signIn = useSignIn();

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        signIn.mutate({email, password}, {onSuccess: () => navigate("/dashboard")});
    }

    return {email, setEmail, password, setPassword, handleSubmit, isPending: signIn.isPending, error: signIn.error}
}