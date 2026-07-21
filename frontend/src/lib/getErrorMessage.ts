import axios from "axios";
import type { TFunction } from "i18next";

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as {error?: string; params?: Record<string, string | number>} | undefined;
        if (data?.error) return data.error;
        return error.message;
    }
    if (error instanceof Error) return error.message;
    return "Something went wrong"
}

export function getErrorParams(error: unknown): Record<string, string | number> | undefined {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as {params?: Record<string, string | number>} | undefined;
        return data?.params;
    }
    return undefined;
}

export function translateError(t: TFunction, error: unknown): string {
    const key = getErrorMessage(error);
    const params = getErrorParams(error);
    return params ? t(key, params) : t(key);
}

export function getFieldErrors(error: unknown): Record<string, string> | undefined {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.errors;
    }
    return undefined;
}
