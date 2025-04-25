import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, ChevronRight, FileCheck, UserCheck, FileText } from 'lucide-react';

const Home = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-blue-600">Dental</span> Checkup System
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A simple and effective way to manage dental checkups. Connect with patients, 
            share results, and maintain dental records in one secure platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-blue-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md text-base font-medium transition-colors duration-200"
            >
              Register Now
            </Link>
            <Link 
              to="/login" 
              className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-6 py-3 rounded-md text-base font-medium transition-colors duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-12 md:py-16 bg-white rounded-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our dental checkup system streamlines the process for both patients and dentists.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center text-center transition-transform duration-200 hover:translate-y-[-5px]">
              <div className="bg-primary-100 p-3 rounded-full mb-4">
                <UserCheck size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Select a Dentist</h3>
              <p className="text-gray-600">
                Browse through available dentists and select the one that best suits your needs.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center text-center transition-transform duration-200 hover:translate-y-[-5px]">
              <div className="bg-primary-100 p-3 rounded-full mb-4">
                <Stethoscope size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Request Checkup</h3>
              <p className="text-gray-600">
                Submit a checkup request to your selected dentist and wait for results.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center text-center transition-transform duration-200 hover:translate-y-[-5px]">
              <div className="bg-primary-100 p-3 rounded-full mb-4">
                <FileText size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-gray-600">
                View your checkup results with detailed notes and download them as PDF.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-12 md:py-16">
        <div className="bg-blue-600 rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-12 md:p-12 text-center md:text-left md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Ready to get started?</h2>
              <p className="text-primary-100 mb-0 md:mb-0">
                Create an account and experience our dental checkup system today.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link 
                to="/register" 
                className="inline-flex items-center bg-white hover:bg-gray-50 text-blue-600 font-medium px-6 py-3 rounded-md transition-colors duration-200"
              >
                Register Now <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Dental Checkup System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;