import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Footer from '../components/Footer';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through our encrypted payment system."
    },
    {
      question: "How long does shipping take?",
      answer: "Domestic shipping typically takes 2-3 business days. International shipping can take 7-14 business days depending on the destination. Express shipping options are available at checkout."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be in their original condition and packaging. Return shipping costs may apply unless the item is defective or was shipped incorrectly."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can calculate shipping costs at checkout by entering your delivery address."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or through the carrier's tracking system."
    },
    {
      question: "Are your products authentic?",
      answer: "Yes, all our products are 100% authentic and sourced directly from authorized manufacturers and distributors. We provide manufacturer warranty for all applicable products."
    },
    {
      question: "Do you offer warranty on products?",
      answer: "Yes, all our products come with the standard manufacturer warranty. Extended warranty options are available for select products at checkout."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team through multiple channels: email (support@techshop.com), phone (1-800-TECH), or through our live chat feature available on the website 24/7."
    },
    {
      question: "Do you price match?",
      answer: "Yes, we offer price matching on identical items sold by major authorized retailers. Contact our customer service team with the competitor's price and product link for verification."
    },
    {
      question: "What happens if I receive a defective product?",
      answer: "If you receive a defective product, contact us within 48 hours of delivery. We'll provide a prepaid return label and either replace the item or issue a full refund based on your preference."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* FAQ Hero Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our products, services, and policies.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <div
                className={`px-6 transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 py-4' : 'max-h-0'
                } overflow-hidden`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Please contact our friendly team.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FAQ;