import * as Yup from 'yup';
import { useEffect } from 'react';
import { useFormik } from "formik";
import AuthForm from "./components/form";
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@src/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from './authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



export default function Login() {

    const dispatch: ThunkDispatch<RootState, unknown, Action<string>> = useDispatch();
    const { isLoading, message, isError, isSuccess} = useSelector((state:RootState) => state.auth);

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
            dispatch(userLogin(values))
                .then((res) => {
                    if (res.payload.success) {
                        toast.success(message);                        
                        navigate(from, { replace: true });
                    }
                })
        }
    });

    

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message, isSuccess]);

    

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