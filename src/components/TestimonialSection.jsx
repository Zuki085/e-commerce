"use client";

import React, { useState, useEffect } from 'react';
import { getAllTestimonials } from '../cms/firebase/testimonials';
import Image from 'next/image';
import user1 from '../../public/images/user1.png';
import user2 from '../../public/images/User5.svg';
import user3 from '../../public/images/User6.svg';
const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const allTestimonials = await getAllTestimonials();
        setTestimonials(allTestimonials);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  // Sample testimonials if none from CMS
  const sampleTestimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      content: "Absolutely love the quality and style of the crochet pieces I ordered! The attention to detail is incredible and the shipping was super fast. Definitely my go-to for unique fashion finds!",
      rating: 5,
      image: user1
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Style Enthusiast",
      content: "The craftsmanship is outstanding! Each piece feels like a work of art. The customer service was excellent and they helped me find the perfect size. Highly recommend!",
      rating: 5,
      image: user2
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Fashion Designer",
      content: "As a designer myself, I'm very particular about quality. These pieces exceeded my expectations. The materials are premium and the designs are timeless. Will definitely order again!",
      rating: 5,
      image: user3
    },
    {
      id: 4,
      name: "David Park",
      role: "Lifestyle Influencer",
      content: "The crochet collection is simply amazing! I've received so many compliments on the pieces I've worn. The brand really understands modern fashion while maintaining traditional craftsmanship.",
      rating: 5,
      image: "bg-gradient-to-br from-yellow-400 to-orange-500"
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : sampleTestimonials;

  if (loading) {
    return (
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-8 max-w-md mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-6"></div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display text-gray-900 mb-6">
            What Our <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Customers</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our amazing community of fashion lovers
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayTestimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 ${
                index === currentIndex ? 'scale-105 shadow-2xl' : ''
              }`}
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-yellow-400 opacity-20">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 9.017-9.61V2.5L14.017 2.5v7.391c0 5.704-3.731 9.57-9.017 9.61V21h9.017z"/>
                </svg>
              </div>

              {/* Rating */}
              <div className="flex mb-6">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-8 leading-relaxed font-sans">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full mr-4 flex-shrink-0 overflow-hidden">
                  {testimonial.image && typeof testimonial.image === 'string' && testimonial.image.startsWith('/') ? (
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : testimonial.image && typeof testimonial.image === 'string' && testimonial.image.startsWith('bg-') ? (
                    <div className={`w-full h-full ${testimonial.image} rounded-full`}></div>
                  ) : testimonial.image && typeof testimonial.image !== 'string' ? (
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-accent font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-amber-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        {displayTestimonials.length > 3 && (
          <div className="flex justify-center space-x-3">
            {displayTestimonials.slice(0, 3).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8 font-accent">Trusted by thousands of satisfied customers</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded"></div>
              <span className="text-gray-800 font-accent font-medium">Artistry</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded"></div>
              <span className="text-gray-600 font-accent font-medium">Dexign</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded"></div>
              <span className="text-gray-600 font-accent font-medium">Emblem</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-500 rounded"></div>
              <span className="text-gray-600 font-accent font-medium">Grapherz</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
