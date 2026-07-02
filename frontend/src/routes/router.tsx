import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "@/pages/WelcomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import {SignInPage} from "@/features/auth/SignInPage.tsx";
import {RegisterPage} from "@/features/auth/RegisterPage.tsx";

export const router = createBrowserRouter([
    { path: "/", element: <WelcomePage /> },
    { path: "/signin", element: <SignInPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "*", element: <NotFoundPage /> }, // catch-all for unmatched URLs
]);