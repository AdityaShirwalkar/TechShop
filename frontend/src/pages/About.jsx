import React from 'react';
import Footer from '../components/Footer';
import { Users, Award, Globe, Target } from 'lucide-react';

function About() {
  const stats = [
    { icon: <Users className="w-6 h-6" />, number: "50K+", label: "Happy Customers" },
    { icon: <Award className="w-6 h-6" />, number: "10+", label: "Years Experience" },
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
            Your trusted destination for quality tech products since 2014
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-lg">
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
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality First</h3>
            <p className="text-gray-600">
              We never compromise on quality. Every product in our store is carefully selected 
              and tested to ensure it meets our high standards.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Focus</h3>
            <p className="text-gray-600">
              Our customers are at the heart of everything we do. We're committed to providing 
              the best possible shopping experience.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
            <p className="text-gray-600">
              We stay ahead of the curve by continuously updating our product selection with 
              the latest technology innovations.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;