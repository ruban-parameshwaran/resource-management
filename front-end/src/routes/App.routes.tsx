import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../features/auth/login";
import CategoryContainer from "@src/features/category/container/CategoryContainer";


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
                element: <>Products</>
            },
            {
                path: 'category',
                element: <CategoryContainer />
            }
        ]
    },
    {
        path:'*',
        element: <>Not found</>
    }
]);

export default AppRoutes;