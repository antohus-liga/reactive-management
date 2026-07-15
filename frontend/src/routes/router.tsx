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
import ProductsPage from "@/features/products/ProductsPage.tsx";
import OrdersPage from "@/features/orders/OrdersPage.tsx";
import ProductionOrdersPage from "@/features/productionOrders/ProductionOrdersPage.tsx";

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
                    { path: "/dashboard", element: <DashboardPage/>, handle: { title: "dashboard" } },
                    { path: "/companies", element: <CompaniesPage/>, handle: { title: "companies" } },
                    { path: "/categories", element: <CategoriesPage/>, handle: { title: "categories" } },
                    { path: "/materials", element: <MaterialsPage/>, handle: { title: "materials" } },
                    { path: "/products", element: <ProductsPage/>, handle: { title: "products" } },
                    { path: "/orders", element: <OrdersPage/>, handle: { title: "orders" } },
                    { path: "/production-orders", element: <ProductionOrdersPage/>, handle: { title: "production" } },
                ]
            },
        ]
    },

    { path: "*", element: <NotFoundPage /> }, // catch-all for unmatched URLs
]);