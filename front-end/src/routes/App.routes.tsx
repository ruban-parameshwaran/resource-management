import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../features/auth/login";
import LoadingIndicator from "@src/components/loader/LoadingIndicator";

const ProductContainer = React.lazy(() => import('@src/features/products/container/ProductContainer'));
const CategoryContainer = React.lazy(() => import('@src/features/category/container/CategoryContainer'));
const CustomerContainer = React.lazy(() => import('@src/features/customers/container/CustomerContainer'));
const DeliveryContainer = React.lazy(() => import('@src/features/deliveries/container/DeliveryContainer'));
const OrderContainer = React.lazy(() => import('@src/features/orders/container/OrderContainer'));

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
                element: 
                <>
                    <Suspense fallback={<LoadingIndicator isLoading={true}><></></LoadingIndicator>}>
                        <CategoryContainer />
                    </Suspense>
                </>
            },
            {
                path: 'customers',
                element: 
                <>
                    <Suspense fallback={<LoadingIndicator isLoading={true}><></></LoadingIndicator>}>
                        <CustomerContainer />
                    </Suspense>
                </>
            },
            {
                path: 'deliveries',
                element: 
                <>
                    <Suspense fallback={<LoadingIndicator isLoading={true}><></></LoadingIndicator>}>
                        <DeliveryContainer />
                    </Suspense>
                </>
            },
            {
                path: 'orders',
                element: 
                <>
                    <Suspense fallback={<LoadingIndicator isLoading={true}><></></LoadingIndicator>}>
                        <OrderContainer />
                    </Suspense>
                </>
            }
        ]
    },
    {
        path:'*',
        element: <>Not found</>
    }
]);

export default AppRoutes;