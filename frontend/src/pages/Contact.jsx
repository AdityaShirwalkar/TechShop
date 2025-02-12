import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Footer from '../components/Footer';
import Popup from '../components/Popup';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsPopupOpen(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Contact Hero */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600">
            We're here to help! Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg text-center">
            <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg text-center">
            <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">support@techshop.com</p>
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg text-center">
            <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600">123 Tech Street, NY 10001</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message="Thank you for your message! We'll get back to you soon."
      />
    </div>
  );
}

export default Contact;