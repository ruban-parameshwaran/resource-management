import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/form';
import Logo from '@src/assets/img/logo.svg';

const Login: React.FC = () => {
  return (
    <>
      <div className="h-screen bg-white flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
                <Link className="mb-5.5 inline-block" to="/">
                    <img className="" src={Logo} alt="Logo" />
                </Link>
            </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                    Sign In
                </h2>
                <LoginForm />
            </div>
        </div>
      </div>
    </>
  );
};

export default Login;
