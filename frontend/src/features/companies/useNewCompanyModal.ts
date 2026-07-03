import {useState} from "react";
import type {CompanyType} from "@/types/CompanyType.ts";

export default function useNewCompanyModal() {
    const [showModal, setShowModal] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [companyType, setCompanyType] = useState<CompanyType | "">("");
    const [taxId, setTaxId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");

    return {
        showModal,
        setShowModal,
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
    }
}