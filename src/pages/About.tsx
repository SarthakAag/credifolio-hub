
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Landmark, Shield, Users, Award, Lightbulb, Clock } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-banking-dark text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About CrediBanc</h1>
            <p className="text-xl mb-8">
              A modern banking institution dedicated to providing secure, innovative, and customer-focused financial services.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2010, CrediBanc was established with a vision to transform the banking experience by combining traditional banking principles with modern technology.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a small financial institution has grown into a trusted banking partner for thousands of customers nationwide. Our journey has been marked by a commitment to innovation, security, and exceptional customer service.
              </p>
              <p className="text-gray-600">
                Today, we continue to evolve our services to meet the changing needs of our customers while maintaining the core values that have defined us from the beginning.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Bank Building" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every service we provide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-banking-muted w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <Shield className="text-banking-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Security</h3>
              <p className="text-gray-600">
                We prioritize the security of your financial information and transactions above all else.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-banking-muted w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <Lightbulb className="text-banking-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously seek new ways to improve our services and enhance your banking experience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-banking-muted w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <Users className="text-banking-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
              <p className="text-gray-600">
                We design our services around your needs and are committed to your financial success.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Leadership Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the experienced professionals guiding our vision and strategy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-40 h-40 mx-auto">
                <img 
                  src="https://i.pravatar.cc/300?img=1" 
                  alt="CEO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Alexander Mitchell</h3>
              <p className="text-banking-primary">Chief Executive Officer</p>
              <p className="text-gray-600 mt-2">
                With over 20 years of experience in the financial industry, Alex leads our strategic vision.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-40 h-40 mx-auto">
                <img 
                  src="https://i.pravatar.cc/300?img=5" 
                  alt="CFO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Sophia Rodriguez</h3>
              <p className="text-banking-primary">Chief Financial Officer</p>
              <p className="text-gray-600 mt-2">
                Sophia brings her expertise in financial management to ensure our bank's stability and growth.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-40 h-40 mx-auto">
                <img 
                  src="https://i.pravatar.cc/300?img=3" 
                  alt="CTO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">James Wilson</h3>
              <p className="text-banking-primary">Chief Technology Officer</p>
              <p className="text-gray-600 mt-2">
                James oversees our technological innovations to provide secure and seamless banking experiences.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Milestones */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Milestones</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key achievements in our journey to becoming a leading financial institution.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0">
                  <div className="bg-banking-muted w-16 h-16 flex items-center justify-center rounded-full">
                    <Landmark className="text-banking-primary h-8 w-8" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">2010: Founding</h3>
                  <p className="text-gray-600">
                    CrediBanc was established with a mission to provide innovative banking solutions.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0">
                  <div className="bg-banking-muted w-16 h-16 flex items-center justify-center rounded-full">
                    <Award className="text-banking-primary h-8 w-8" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">2015: Excellence Award</h3>
                  <p className="text-gray-600">
                    Recognized for outstanding customer service and banking innovation.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0">
                  <div className="bg-banking-muted w-16 h-16 flex items-center justify-center rounded-full">
                    <Clock className="text-banking-primary h-8 w-8" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">2020: Digital Transformation</h3>
                  <p className="text-gray-600">
                    Completed a comprehensive digital transformation to enhance online and mobile banking services.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0">
                  <div className="bg-banking-muted w-16 h-16 flex items-center justify-center rounded-full">
                    <Users className="text-banking-primary h-8 w-8" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">2023: Expansion</h3>
                  <p className="text-gray-600">
                    Expanded services to reach more customers nationwide and introduced new credit products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-banking-primary text-white rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the CrediBanc Family</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Experience banking that's designed with your needs in mind. Open an account today and start your journey towards financial success.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-banking-primary hover:bg-white/90">
                Open an Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
