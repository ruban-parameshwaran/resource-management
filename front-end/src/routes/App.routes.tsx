import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../features/auth/login";
import CategoryContainer from "@src/features/category/container/CategoryContainer";
import CustomerContainer from "@src/features/customers/container/CustomerContainer";
import LoadingIndicator from "@src/components/loader/LoadingIndicator";

const ProductContainer = React.lazy(() => import('@src/features/products/container/ProductContainer'))

const AppRoutes = createBrowserRouter([
    // public routes
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/*',
        element: <App />,
        children: [
            {
                path: 'dashboard',
                element: <>Dashboard</>
            },
            {
                path: 'products',
                element: <>
                    <Suspense fallback={<LoadingIndicator isLoading={true}><></></LoadingIndicator>}>
                        <ProductContainer />
                    </Suspense>
                </>
            },
            {
                path: 'category',
                element: <CategoryContainer />
            },
            {
                path: 'customers',
                element: <CustomerContainer />
            }
        ]
    },
    {
        path:'*',
        element: <>Not found</>
    }
]);

export default AppRoutes;