import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './scss/_custom.scss';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { RouterProvider } from 'react-router-dom';
import AppRoutes from './routes/App.routes.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={AppRoutes} />
    </StrictMode>,
)
