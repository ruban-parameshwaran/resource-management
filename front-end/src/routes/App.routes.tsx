import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../features/auth/login";

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
            }
        ]
    },
    {
        path:'*',
        element: <>Not found</>
    }
]);

export default AppRoutes;