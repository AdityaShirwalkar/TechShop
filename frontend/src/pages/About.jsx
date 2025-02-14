import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { Users, Award, Globe, Target, MessageSquare, HelpCircle } from 'lucide-react';

function About() {
  const stats = [
    { icon: <Users className="w-6 h-6" />, number: "50K+", label: "Happy Customers" },
    { icon: <Award className="w-6 h-6" />, number: "10K+", label: "Working Employees" },
    { icon: <Globe className="w-6 h-6" />, number: "100+", label: "Countries Served" },
    { icon: <Target className="w-6 h-6" />, number: "24/7", label: "Customer Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About TechShop</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your trusted destination for quality tech products since 2024
          </p>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Contact Us
            </Link>
            <Link
              to="/faq"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20"
            >
              <HelpCircle className="w-5 h-5 mr-2" />
              View FAQ
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center text-blue-600 mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-6 text-gray-600">
              <p>
                Founded in 2024, TechShop began with a simple mission: to provide high-quality tech products 
                at competitive prices while delivering exceptional customer service.
              </p>
              <p>
                What started as a small online store has grown into a global technology retailer, 
                serving customers across the world with a carefully curated selection of products 
                from the most trusted brands in tech.
              </p>
              <p>
                Our team of experts works tirelessly to test and select only the best products, 
                ensuring that our customers always get the quality they deserve. We believe in 
                building long-term relationships with our customers through transparency, 
                reliability, and outstanding service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality First</h3>
            <p className="text-gray-600">
              We never compromise on quality. Every product in our store is carefully selected 
              and tested to ensure it meets our high standards.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Focus</h3>
            <p className="text-gray-600">
              Our customers are at the heart of everything we do. We're committed to providing 
              the best possible shopping experience.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
            <p className="text-gray-600">
              We stay ahead of the curve by continuously updating our product selection with 
              the latest technology innovations.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
            <p className="text-gray-600 mb-8">
              At TechShop, we're committed to providing you with:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Expert Support</h3>
                <p className="text-gray-600">
                  Our dedicated team of tech experts is available 24/7 to assist you with any questions or concerns.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quality Guarantee</h3>
                <p className="text-gray-600">
                  All products come with our satisfaction guarantee and authentic product warranty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience TechShop?</h2>
            <p className="text-blue-100 mb-8">
              Join thousands of satisfied customers who trust us for their tech needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg"
              >
                Browse Products
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-400 transition-all duration-300 shadow-lg"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Support Links */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link 
            to="/faq"
            className="group bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <HelpCircle className="w-8 h-8 text-blue-600 group-hover:text-blue-500 transition-colors" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Frequently Asked Questions</h3>
                <p className="text-gray-600">Find quick answers to common questions about our products and services.</p>
              </div>
            </div>
          </Link>
          <Link 
            to="/contact"
            className="group bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <MessageSquare className="w-8 h-8 text-indigo-600 group-hover:text-indigo-500 transition-colors" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">Contact Support</h3>
                <p className="text-gray-600">Need help? Our support team is ready to assist you.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;