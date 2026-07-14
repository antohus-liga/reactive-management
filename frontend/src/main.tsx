import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import "./i18n";
import {RouterProvider} from "react-router-dom";
import {router} from "@/routes/router.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <div className="bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen transition-colors duration-200">
                <RouterProvider router={router}/>
            </div>
        </QueryClientProvider>
    </StrictMode>,
)
