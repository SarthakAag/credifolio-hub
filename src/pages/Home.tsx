
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ShieldCheck, Wallet, CreditCard, BarChart4 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-banking-primary to-banking-secondary text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Banking that works for you
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Secure, reliable, and user-friendly banking services to help you manage your finances effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-white text-banking-primary hover:bg-white/90">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="bg-white text-banking-primary hover:bg-white/90">
                        Open an Account
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Banking App" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose CrediBanc</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide a range of banking services designed to meet your financial needs with security and convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-banking-muted w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <ShieldCheck className="text-banking-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Banking</h3>
              <p className="text-gray-600">
                State-of-the-art security measures to protect your financial data and transactions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-banking-muted w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Wallet className="text-banking-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Transactions</h3>
              <p className="text-gray-600">
                Send money, pay bills, and manage your finances with just a few clicks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-banking-muted w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <CreditCard className="text-banking-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Credit Services</h3>
              <p className="text-gray-600">
                Access personal loans, auto loans, and credit lines with competitive rates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-banking-muted w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <BarChart4 className="text-banking-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Financial Insights</h3>
              <p className="text-gray-600">
                Track your spending, analyze your habits, and make informed financial decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-banking-muted rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-gray-600 mb-6">
                  Join thousands of satisfied customers who trust CrediBanc with their financial needs. Open an account in minutes and experience banking the way it should be.
                </p>
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <Button className="group">
                    {isAuthenticated ? "Go to Dashboard" : "Open an Account"} 
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Mobile Banking" 
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say about their experience with CrediBanc.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The credit services at CrediBanc helped me finance my new car with an amazing rate. The application process was quick and the customer service was excellent."
              </p>
              <div>
                <p className="font-semibold">Michael Johnson</p>
                <p className="text-sm text-gray-500">Auto Loan Customer</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "I love the dashboard feature that gives me a clear overview of all my transactions. It's so easy to track my spending and manage my finances."
              </p>
              <div>
                <p className="font-semibold">Sarah Williams</p>
                <p className="text-sm text-gray-500">Checking Account Customer</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The personal loan I got from CrediBanc helped me consolidate my debt and save a lot on interest. The whole process was smooth and professional."
              </p>
              <div>
                <p className="font-semibold">David Chen</p>
                <p className="text-sm text-gray-500">Personal Loan Customer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
