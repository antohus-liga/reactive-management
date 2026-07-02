import axios from "axios";

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as {error?: string} | undefined;
        if (data?.error) return data.error;
        return error.message;
    }
    if (error instanceof Error) return error.message;
    return "Something went wrong"
}

export function getFieldErrors(error: unknown): Record<string, string> | undefined {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.errors;
    }
    return undefined;
}