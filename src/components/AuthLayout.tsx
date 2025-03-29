
import React from 'react';
import { Link } from 'react-router-dom';

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  isLogin?: boolean;
};

const AuthLayout = ({ children, title, subtitle, isLogin = false }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="text-banking-primary text-2xl font-bold">
              CrediBanc
            </Link>
            <h2 className="text-2xl font-bold mt-6 mb-2">{title}</h2>
            <p className="text-gray-600 mb-6">{subtitle}</p>
          </div>
          
          {children}
          
          <div className="mt-6 text-center">
            {isLogin ? (
              <p className="text-gray-600">
                Don't have an account? {" "}
                <Link to="/register" className="text-banking-primary font-semibold hover:underline">
                  Sign up
                </Link>
              </p>
            ) : (
              <p className="text-gray-600">
                Already have an account? {" "}
                <Link to="/login" className="text-banking-primary font-semibold hover:underline">
                  Login
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden md:flex flex-1 bg-banking-primary items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <h2 className="text-3xl font-bold mb-4">Banking made simple</h2>
          <p className="text-lg opacity-90 mb-8">
            Secure, reliable, and user-friendly banking services to help you manage your finances effectively.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Secure Transactions</h3>
              <p className="opacity-80 text-sm">
                All your transactions are encrypted and secure.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium mb-2">24/7 Access</h3>
              <p className="opacity-80 text-sm">
                Access your account anytime, anywhere.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Credit Services</h3>
              <p className="opacity-80 text-sm">
                Apply for credit and manage your credit accounts.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Financial Insights</h3>
              <p className="opacity-80 text-sm">
                Get insights into your spending and saving habits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
