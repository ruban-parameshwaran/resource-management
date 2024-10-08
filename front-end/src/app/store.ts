import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@src/features/auth/login/userSlice';
import { authApi } from '@src/services/api/authApi';
import { categoryApi } from '@src/services/api/categoryApi';
import { customerApi } from '@src/services/api/customerApi';
import { deliveryApi } from '@src/services/api/deliveryApi';
import { orderApi } from '@src/services/api/orderApi';
import { productApi } from '@src/services/api/productApi';
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import formTypeSlice from '@src/features/slices/formTypeSlice';

const persistConfig ={
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        user: persistedReducer,
        formType: formTypeSlice,
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [customerApi.reducerPath]: customerApi.reducer,
        [deliveryApi.reducerPath]: deliveryApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(
            authApi.middleware,
            categoryApi.middleware,
            productApi.middleware,
            customerApi.middleware,
            deliveryApi.middleware,
            orderApi.middleware
        ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;