"use client";
import React, { useState, useEffect } from "react";

const LIGHT_BLUE = "#38bdf8"; // Tailwind sky-400
const CYAN = "#0ea5e9"; // Tailwind cyan-500

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO, Digital Marketing Agency",
      company: "CreativeFlow Solutions",
      image: "👩‍💼",
      rating: 5,
      text: "Outstanding service! They helped us upgrade our entire office setup with new laptops and a comprehensive printing solution. The team was professional, knowledgeable, and provided excellent ongoing support. Our productivity has increased significantly!",
      service: "Office Setup & Laptop Sales",
      color: "from-sky-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "IT Manager",
      company: "TechStart Inc.",
      image: "👨‍💻",
      rating: 5,
      text: "Incredible technical expertise! When our servers crashed, they responded within hours and had us back online the same day. Their 24/7 support is truly reliable. We&apos;ve been working with them for 2 years now and couldn&apos;t be happier.",
      service: "Technical Support & Maintenance",
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Operations Director",
      company: "Global Logistics Co.",
      image: "👩‍🔬",
      rating: 5,
      text: "Best investment we made! They provided a complete printing infrastructure for our warehouse operations. The industrial printers they recommended have been running flawlessly for 18 months. Their consultation process was thorough and professional.",
      service: "Printer Solutions & Setup",
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: 4,
      name: "David Park",
      position: "Small Business Owner",
      company: "Park's Consulting",
      image: "👨‍💼",
      rating: 5,
      text: "Amazing value for money! As a startup, budget was tight, but they worked with us to find the perfect computers and setup within our range. The after-sales service is exceptional - they even helped with software installation and training.",
      service: "Computer Sales & Training",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      position: "Finance Manager",
      company: "Thompson & Associates",
      image: "👩‍💼",
      rating: 5,
      text: "Professional from start to finish! They migrated our entire accounting system to new hardware without any data loss. The team explained everything clearly and provided comprehensive training. Highly recommend for any business upgrade!",
      service: "System Migration & Setup",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 6,
      name: "James Wilson",
      position: "Creative Director",
      company: "Wilson Design Studio",
      image: "👨‍🎨",
      rating: 5,
      text: "They understand creative workflows! Recommended perfect high-performance laptops for our design team and set up a color-accurate printing system. The technical knowledge combined with great customer service makes them our go-to IT partner.",
      service: "Creative Industry Solutions",
      color: "from-pink-500 to-rose-500"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const stats = [
    { number: "500+", label: "Happy Clients", icon: "😊" },
    { number: "99.9%", label: "Uptime Guarantee", icon: "⚡" },
    { number: "24/7", label: "Support Available", icon: "🛡️" },
    { number: "2000+", label: "Devices Serviced", icon: "💻" }
  ];

  const handleTestimonialChange = (index: number) => {
    setActiveTestimonial(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ⭐
      </span>
    ));
  };

  return (
    <section 
      id="testimonials" 
      className="relative py-20 md:py-32 bg-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-16 w-36 h-36 border border-sky-400 rounded-3xl animate-spin" style={{ animationDuration: '30s' }}></div>
        <div className="absolute bottom-32 right-20 w-28 h-28 border-2 border-cyan-400 rounded-full rotate-45 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 border border-blue-400 rounded-2xl rotate-12 animate-bounce" style={{ animationDelay: '2s' }}></div>
        
        {/* Quote pattern */}
        <div className="absolute top-40 left-1/3 text-8xl text-sky-200 opacity-30 animate-pulse">&quot;</div>
        <div className="absolute bottom-40 right-1/3 text-8xl text-cyan-200 opacity-30 rotate-180 animate-pulse" style={{ animationDelay: '1s' }}>&quot;</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-3 bg-gradient-to-r from-sky-400 to-cyan-400 opacity-20 blur-sm rounded-full"></div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied customers 
            <br className="hidden md:inline" />
            <span className="font-semibold text-gray-800 bg-gradient-to-r from-sky-100 to-cyan-100 px-3 py-1 rounded-lg">have to say about our services.</span>
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="relative max-w-4xl mx-auto">
            {/* Main Testimonial Card */}
            <div className={`relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-sky-100 transition-all duration-500 overflow-hidden group`}>
              
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonials[activeTestimonial].color} opacity-5 transition-all duration-500`}></div>
              
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 text-6xl text-sky-200 opacity-50">&quot;</div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {renderStars(testimonials[activeTestimonial].rating)}
                </div>
                
                {/* Testimonial Text */}
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed text-center mb-8 font-medium">
                  &quot;{testimonials[activeTestimonial].text}&quot;
                </blockquote>
                
                {/* Service Badge */}
                <div className="flex justify-center mb-8">
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${testimonials[activeTestimonial].color} shadow-lg`}>
                    {testimonials[activeTestimonial].service}
                  </span>
                </div>
                
                {/* Author Info */}
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-sky-100 to-cyan-100 rounded-full flex items-center justify-center text-3xl border-4 border-white shadow-lg">
                    {testimonials[activeTestimonial].image}
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-lg text-gray-900">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-gray-600 font-medium">{testimonials[activeTestimonial].position}</p>
                    <p className="text-sm text-sky-600 font-semibold">{testimonials[activeTestimonial].company}</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 border-4 border-sky-200 rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-10 h-10 border-3 border-cyan-200 rounded-lg rotate-45 opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={() => handleTestimonialChange(activeTestimonial === 0 ? testimonials.length - 1 : activeTestimonial - 1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white border-2 border-sky-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-sky-600 hover:border-sky-400 hover:scale-110 group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={() => handleTestimonialChange((activeTestimonial + 1) % testimonials.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white border-2 border-sky-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-sky-600 hover:border-sky-400 hover:scale-110 group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonial Dots */}
        <div className="flex justify-center space-x-3 mb-16">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleTestimonialChange(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === activeTestimonial 
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-500 scale-125 shadow-lg' 
                  : 'bg-gray-300 hover:bg-sky-300'
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-3xl p-8 md:p-12 border-2 border-sky-100 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
              Trusted by Businesses Everywhere
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mini Testimonials Grid */}
        <div className={`mt-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-sky-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer ${
                  activeTestimonial === index ? 'border-sky-400 shadow-sky-500/20' : ''
                }`}
                onClick={() => handleTestimonialChange(index)}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-sky-100 to-cyan-100 rounded-full flex items-center justify-center text-xl mr-3">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  &quot;{testimonial.text.slice(0, 100)}...&quot;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Ready to Join Our Satisfied Customers?
          </h3>
          <a
            href="#contact"
            className="group relative inline-flex items-center px-10 py-5 rounded-2xl font-bold text-white shadow-2xl border-2 border-cyan-400 transition-all duration-300 text-lg md:text-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-cyan-500 hover:to-sky-500 hover:scale-105 hover:shadow-cyan-500/25 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">Get Your Free Consultation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </a>
        </div>
      </div>

      {/* Subtle Background Decorations */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-sky-100 to-cyan-100 opacity-20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-cyan-100 to-blue-100 opacity-25 rounded-full blur-3xl animate-pulse z-0" style={{ animationDelay: '3s' }} />
      
      {/* Additional decorative elements */}
      <div className="absolute top-1/3 right-16 w-2 h-32 bg-gradient-to-b from-sky-200 to-transparent opacity-30 rounded-full animate-pulse" />
      <div className="absolute bottom-1/3 left-16 w-32 h-2 bg-gradient-to-r from-cyan-200 to-transparent opacity-30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
}