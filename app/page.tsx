'use client';
import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{isLogin ? 'Login' : 'Signup'}</h2>
          {isLogin ? <LoginForm /> : <SignupForm />}
          <div className="flex justify-between mt-4">
            <span>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </span>
            <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Signup' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
