
import { useDispatch } from 'react-redux';
import { RootState } from '@src/app/store';
import userImg from '../../assets/img/user.jpg';
import notification from '@src/services/notification';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserLogoutMutation } from '@src/services/api/authApi';
import { clearAuthUser } from '@src/features/auth/login/userSlice';
import { useEffect } from 'react';
import DefaultButton from '../button/DefaultButton';

export default function Header() {

    const dispatch: ThunkDispatch<RootState, unknown, Action<string>> = useDispatch();
    const [userLogout, {isSuccess, isLoading}] = useUserLogoutMutation();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/login";

    const onLogoutHandler = async () => {
       try {
            await userLogout().unwrap();
            dispatch(clearAuthUser());
            navigate(from, { replace: true });
       } catch(error: any) {
           notification.errorNotification(error?.message || 'Network Failed');
       }
    }

    useEffect(() => {
        if (isSuccess) {
            notification.successNotification('User Logged out successfully!')
        }
    }, [isSuccess]);
    
    return (
        <header className="app-header">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
                    <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">

                        <li className="nav-item dropdown">
                            <a className="nav-link nav-icon-hover" onClick={(e) => e.preventDefault} id="drop2" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <img src={userImg} className="rounded-circle" width="35" height="35" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                                <div className="message-body">
                                    <a href="#" onClick={(e) => e.preventDefault} className="d-flex align-items-center gap-2 dropdown-item">
                                        <i className="ti ti-user fs-6"></i>
                                        <p className="mb-0 fs-3">My Profile</p>
                                    </a>
                                    <a href="#" onClick={(e) => e.preventDefault} className="d-flex align-items-center gap-2 dropdown-item">
                                        <i className="ti ti-mail fs-6"></i>
                                        <p className="mb-0 fs-3">My Account</p>
                                    </a>
                                    <a href="#" onClick={(e) => e.preventDefault} className="d-flex align-items-center gap-2 dropdown-item">
                                        <i className="ti ti-list-check fs-6"></i>
                                        <p className="mb-0 fs-3">My Task</p>
                                    </a>
                                    <DefaultButton 
                                        fn={onLogoutHandler}
                                        isLoading={isLoading}
                                        disabled={isLoading}
                                        message='Logout'/>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}