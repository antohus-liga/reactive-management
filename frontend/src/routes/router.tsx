import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "@/pages/WelcomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import SignInPage from "@/features/auth/SignInPage.tsx";
import RegisterPage from "@/features/auth/RegisterPage.tsx";
import PublicOnlyRoute from "@/routes/PublicOnlyRoute.tsx";
import PublicShell from "@/components/layout/PublicShell.tsx";
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";
import AppShell from "@/components/layout/AppShell.tsx";
import DashboardPage from "@/features/dashboard/DashboardPage.tsx";
import CompaniesPage from "@/features/companies/CompaniesPage.tsx";
import CategoriesPage from "@/features/categories/CategoriesPage.tsx";
import MaterialsPage from "@/features/materials/MaterialsPage.tsx";

export const router = createBrowserRouter([
    {
        element: <PublicOnlyRoute/>,
        children: [
            {
                element: <PublicShell/>,
                children: [
                    { path: "/", element: <WelcomePage /> },
                    { path: "/signin", element: <SignInPage /> },
                    { path: "/register", element: <RegisterPage /> },
                ]
            }
        ]
    },

    {
        element: <ProtectedRoute/>,
        children: [
            {
                element: <AppShell/>,
                children: [
                    { path: "/dashboard", element: <DashboardPage/>, handle: { title: "Dashboard" } },
                    { path: "/companies", element: <CompaniesPage/>, handle: { title: "Companies" } },
                    { path: "/categories", element: <CategoriesPage/>, handle: { title: "Categories" } },
                    { path: "/materials", element: <MaterialsPage/>, handle: { title: "Materials" } },
                ]
            },
        ]
    },

    { path: "*", element: <NotFoundPage /> }, // catch-all for unmatched URLs
]);