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