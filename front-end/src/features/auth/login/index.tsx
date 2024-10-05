import * as Yup from 'yup';
import { useFormik } from "formik";
import AuthForm from "./components/form";
import { useLocation, useNavigate } from 'react-router-dom';
import { useInitCsrfMutation, useUserLoginMutation } from '@src/services/api/authApi';
import notification from '@src/services/notification';
import { useDispatch } from 'react-redux';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@src/app/store';
import { setAuthUser } from './userSlice';

export default function Login() {

    const [ userLogin, {isLoading}] = useUserLoginMutation();


    const [ initCsrf ] = useInitCsrfMutation();

    const dispatch: ThunkDispatch<RootState, unknown, Action<string>> = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    /**
     * Initial Values form login form   
     */     
    const formInitialValues = {
        email: "",
        password: "",
    }

    const loginForm = useFormik({
        initialValues: formInitialValues,
        validationSchema: Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        }),
        onSubmit: async (values) => {
            try {
                
                await initCsrf().unwrap();

                const response = await userLogin(values).unwrap();
                
                if (response?.success) {
                    dispatch(setAuthUser({
                        token   : response?.data?.token,
                        email   : response?.data?.email,
                        id      : response?.data?.id,
                        isUserLoggedIn: true
                    }))
                    notification.successNotification(response?.message) 
                    navigate(from, { replace: true });
                }
                
            } catch(error: any) {
                console.log(error);
                notification.errorNotification(error?.data?.message) 
            }
        }
    });

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
             
            <div
                className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className="row justify-content-center w-100">
                        <div className="col-md-8 col-lg-6 col-xxl-3">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <p className="text-center">Sign In</p>
                                    <AuthForm 
                                        loginForm={loginForm}
                                        isLoading={isLoading}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}