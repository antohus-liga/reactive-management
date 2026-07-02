import {useState} from "react";
import type {CompanyType} from "@/types/CompanyType.ts";
import {useNavigate} from "react-router-dom";
import {useRegister} from "@/features/auth/hooks.ts";
import type {SubmitEvent} from "react";
import {useQueryClient} from "@tanstack/react-query";

export function useRegisterForm() {
    const [companyName, setCompanyName] = useState("");
    const [companyType, setCompanyType] = useState<CompanyType | "">("");
    const [taxId, setTaxId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const register = useRegister();

    const queryClient = useQueryClient();

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        register.mutate({
            companyName,
            companyType,
            taxId,
            phoneNumber,
            email,
            country,
            address,
            password
        }, {
            onSuccess: () => {
                queryClient.clear()
                navigate("/signin");
            }
        });
    }

    return {
        companyName,
        setCompanyName,
        companyType,
        setCompanyType,
        taxId,
        setTaxId,
        phoneNumber,
        setPhoneNumber,
        email,
        setEmail,
        country,
        setCountry,
        address,
        setAddress,
        password,
        setPassword,
        handleSubmit,
        isPending: register.isPending,
        error: register.error,
    };
}