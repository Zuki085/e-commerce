"use client";

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const FAQPage = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (itemId) => {
    setOpenItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const faqData = {
    general: [
      {
        id: 'general-1',
        question: 'Is my personal information secure on your site?',
        answer: 'Yes, we take your privacy and security seriously. We use industry-standard encryption and security measures to protect your personal information. Your data is never shared with third parties without your consent.',
        icon: '🔒'
      },
      {
        id: 'general-3',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through our encrypted payment gateway.',
        icon: '💳'
      },
      {
        id: 'general-4',
        question: 'How do I create an account?',
        answer: 'Creating an account is easy! Click on "Sign Up" in the top right corner, fill in your details, verify your email address, and you\'re all set. You can also sign up during checkout for a faster process.',
        icon: '👤'
      }
    ],
    shipping: [
      {
        id: 'shipping-1',
        question: 'What are your shipping options and delivery times?',
        answer: 'We offer free standard shipping (5-7 business days) on orders over $50, express shipping (2-3 business days) for $15, and overnight delivery (1 business day) for $25. International shipping is available to most countries with delivery times of 7-14 business days.',
        icon: '🚚'
      },
      {
        id: 'shipping-3',
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for all items in original condition with tags attached. Returns are free within the US. International returns are subject to shipping costs. Refunds are processed within 5-7 business days after we receive your return.',
        icon: '↩️'
      },
      {
        id: 'shipping-4',
        question: 'Do you ship internationally?',
        answer: 'Yes! We ship to over 50 countries worldwide. International shipping costs vary by destination and are calculated at checkout. Delivery times are typically 7-14 business days depending on the country.',
        icon: '🌍'
      }
    ],
    products: [
      {
        id: 'products-1',
        question: 'What sizes are available?',
        answer: 'We offer a wide range of sizes from XS to XXL for most items. Each product page shows available sizes, and we provide detailed size charts to help you find the perfect fit. If you\'re unsure, our customer service team is happy to help!',
        icon: '📏'
      },
      {
        id: 'products-2',
        question: 'Are your products authentic?',
        answer: 'Absolutely! We are an authorized retailer and only sell 100% authentic products. All items come with authenticity guarantees and original packaging. We work directly with brands and authorized distributors.',
        icon: '✅'
      },
      {
        id: 'products-3',
        question: 'How do I care for my items?',
        answer: 'Care instructions are provided on each product page and on the garment tags. Generally, we recommend gentle machine wash in cold water and air drying for best results. For delicate items, hand washing is recommended.',
        icon: '🧺'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-20'>
          <div
            className='w-full h-full'
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-xl opacity-20 animate-pulse'></div>
          <div className='absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full blur-xl opacity-20 animate-pulse delay-1000'></div>
          <div className='absolute bottom-10 left-1/4 w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full blur-xl opacity-20 animate-pulse delay-2000'></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
              FAQ
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 font-sans max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our products, shipping, returns, and more
          </p>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* General FAQ Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">General Questions</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid gap-6">
              {faqData.general.map((item, index) => (
                <div key={item.id} className="group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 overflow-hidden">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <span className="font-accent font-semibold text-gray-800 text-lg group-hover:text-amber-600 transition-colors duration-300">
                          {item.question}
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        <svg
                          className={`w-6 h-6 text-amber-500 transform transition-all duration-300 ${
                            openItems[item.id] ? 'rotate-45 scale-110' : 'group-hover:scale-110'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </button>
                    {openItems[item.id] && (
                      <div className="px-8 pb-6 animate-fadeIn">
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-gray-600 leading-relaxed font-sans text-base">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping and Returns FAQ Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">Shipping & Returns</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid gap-6">
              {faqData.shipping.map((item, index) => (
                <div key={item.id} className="group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 overflow-hidden">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <span className="font-accent font-semibold text-gray-800 text-lg group-hover:text-amber-600 transition-colors duration-300">
                          {item.question}
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        <svg
                          className={`w-6 h-6 text-amber-500 transform transition-all duration-300 ${
                            openItems[item.id] ? 'rotate-45 scale-110' : 'group-hover:scale-110'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </button>
                    {openItems[item.id] && (
                      <div className="px-8 pb-6 animate-fadeIn">
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-gray-600 leading-relaxed font-sans text-base">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products FAQ Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">Products & Care</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid gap-6">
              {faqData.products.map((item, index) => (
                <div key={item.id} className="group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 overflow-hidden">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <span className="font-accent font-semibold text-gray-800 text-lg group-hover:text-amber-600 transition-colors duration-300">
                          {item.question}
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        <svg
                          className={`w-6 h-6 text-amber-500 transform transition-all duration-300 ${
                            openItems[item.id] ? 'rotate-45 scale-110' : 'group-hover:scale-110'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </button>
                    {openItems[item.id] && (
                      <div className="px-8 pb-6 animate-fadeIn">
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-gray-600 leading-relaxed font-sans text-base">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support Section */}
          <div className="text-center bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-12 text-white">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-display font-bold mb-4">
                <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                  Still have questions?
                </span>
              </h3>
              <p className="text-xl text-gray-300 mb-8 font-sans">
                Our customer support team is here to help you 24/7
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-accent font-semibold rounded-xl hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Contact Support
                </a>
                <a 
                  href="mailto:support@crochet.com" 
                  className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-accent font-semibold rounded-xl hover:bg-yellow-400 hover:text-slate-900 transition-all duration-300 hover:scale-105"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;

