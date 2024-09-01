import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './css/style.css';
import './css/satoshi.css';
import AppRoutes from './routes/app.routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={AppRoutes} />
    </React.StrictMode>,
);
