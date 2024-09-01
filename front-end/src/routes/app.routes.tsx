import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";

const Login = React.lazy(() => import('@src/components/Authentication/Login/screen'))

/** main routes **/
const AppRoutes = createBrowserRouter([
    // Public Routes
    {
        path: "/login",
        element: 
        <>
            <Suspense fallback={<></>}>
                <Login />
            </Suspense>
        </>
    },
    // Private Routes
    {
        path: '/*',
        element: <App />,
        children: [
            {
                path: 'dashboard',
                element:  
                <Suspense fallback={<></>}>
                    <>Dashboard</>
                </Suspense>
            },
            {
                path: 'products',
                children: [
                    {
                        path: '',
                        element:  
                        <Suspense fallback={<></>}>
                            <>Product Lists</>
                        </Suspense>,
                    },
                    {
                        path: 'add-product',
                        element:  
                        <Suspense fallback={<></>}>
                            <>Add Product</>
                        </Suspense>,
                    }
                ]
            },
            {
                path: 'suppliers',
                children: [
                    {
                        path: '',
                        element:  
                        <Suspense fallback={<></>}>
                            <>suppliers Lists</>
                        </Suspense>,
                    },
                    {
                        path: 'add-suppliers',
                        element:  
                        <Suspense fallback={<></>}>
                            <>suppliers Product</>
                        </Suspense>,
                    }
                ]
            }
        ]
    }
]);

export default AppRoutes;