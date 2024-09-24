import { createRoot } from 'react-dom/client'

import './scss/_custom.scss';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { RouterProvider } from 'react-router-dom';
import AppRoutes from './routes/App.routes.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
    <>
        <Toaster />
        <Provider store={store}>
            <RouterProvider router={AppRoutes} />
        </Provider>
    </>
)
