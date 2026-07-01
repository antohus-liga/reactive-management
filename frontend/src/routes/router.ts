import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "@/pages/WelcomePage";
import NotFoundPage from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
    { path: "/", element: WelcomePage() },
    { path: "*", element: NotFoundPage() }, // catch-all for unmatched URLs
]);