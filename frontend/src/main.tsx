import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import {router} from "@/routes/router.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <div className={"bg-gray-900 text-white bg-[repeating-linear-gradient(45deg,#151318,#182138_20px,transparent_0,transparent_50%)] bg-size-[60px_60px] bg-fixed p-4"}>
                <RouterProvider router={router}/>
            </div>
        </QueryClientProvider>
    </StrictMode>,
)
