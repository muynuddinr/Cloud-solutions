"use client";
import React, { useState, useEffect, useRef } from "react";

const LIGHT_BLUE = "#3b82f6";
const CYAN = "#06b6d4";

export default function Herosection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInFromRight {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
          40%, 43% { transform: translateY(-20px); }
          70% { transform: translateY(-10px); }
          90% { transform: translateY(-4px); }
        }
        
        .animate-slide-in-left {
          animation: slideInFromLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-slide-in-right {
          animation: slideInFromRight 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .animate-rotate-slow {
          animation: rotate 20s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
        
        .parallax {
          transform: translateZ(0);
          will-change: transform;
        }
        
        .glass-effect {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 50%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gradient-border {
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          padding: 2px;
          border-radius: 16px;
        }
        
        .gradient-border > div {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 14px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 1200px) {
          .hero-content {
            max-width: 90%;
          }
        }
        
        @media (max-width: 1024px) {
          .hero-heading {
            font-size: 3.5rem !important;
          }
          
          .hero-subtitle {
            font-size: 1.25rem !important;
          }
          
          .feature-card {
            padding: 1.25rem !important;
          }
          
          .feature-icon {
            width: 3rem !important;
            height: 3rem !important;
          }
          
          .cta-button {
            padding: 0.75rem 1.5rem !important;
            font-size: 0.9rem !important;
          }
          
          .stats-text {
            font-size: 1.75rem !important;
          }
        }
        
        @media (max-width: 768px) {
          .hero-section {
            min-height: 100vh;
            padding: 1rem 0;
          }
          
          .hero-content {
            max-width: 100%;
            padding: 0 1rem;
          }
          
          .hero-heading {
            font-size: 2.5rem !important;
            line-height: 1.2 !important;
          }
          
          .hero-subtitle {
            font-size: 1rem !important;
            line-height: 1.5 !important;
          }
          
          .feature-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          
          .feature-card {
            padding: 1rem !important;
            width: 100% !important;
          }
          
          .feature-icon {
            width: 2.5rem !important;
            height: 2.5rem !important;
            margin-bottom: 0.75rem !important;
          }
          
          .feature-title {
            font-size: 1.125rem !important;
            margin-bottom: 0.5rem !important;
          }
          
          .feature-text {
            font-size: 0.875rem !important;
          }
          
          .cta-container {
            flex-direction: column !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 1rem !important;
          }
          
          .cta-button {
            width: 100% !important;
            padding: 0.75rem 1rem !important;
            font-size: 0.875rem !important;
            margin-bottom: 0.75rem !important;
          }
          
          .stats-container {
            gap: 1.5rem !important;
            margin-top: 2rem !important;
          }
          
          .stats-text {
            font-size: 1.5rem !important;
          }
          
          .stats-label {
            font-size: 0.75rem !important;
          }
          
          .wave-svg {
            height: 3rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero-heading {
            font-size: 2rem !important;
          }
          
          .hero-subtitle {
            font-size: 0.875rem !important;
          }
          
          .feature-card {
            padding: 0.875rem !important;
          }
          
          .feature-icon {
            width: 2rem !important;
            height: 2rem !important;
          }
          
          .cta-button {
            padding: 0.625rem 1rem !important;
            font-size: 0.8125rem !important;
          }
          
          .stats-text {
            font-size: 1.25rem !important;
          }
        }
      `}</style>
      
      <section 
        ref={heroRef}
        id="home" 
        className="hero-section relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 z-0"></div>
        
        {/* Decorative Elements - Hidden on mobile */}
        <div 
          className="absolute top-20 left-20 w-96 h-96 opacity-30 rounded-full blur-3xl animate-pulse z-0 hidden lg:block"
          style={{
            background: `linear-gradient(to right, rgba(59, 130, 246, 0.4), rgba(6, 182, 212, 0.4))`,
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute bottom-20 right-20 w-80 h-80 opacity-40 rounded-full blur-3xl animate-pulse z-0 hidden lg:block" 
          style={{ 
            background: `linear-gradient(to right, rgba(59, 130, 246, 0.4), rgba(6, 182, 212, 0.4))`,
            animationDelay: '2s',
            transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`
          }} 
        />
        
        {/* Main Content */}
        <div className="hero-content relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 pt-12 md:pt-16 lg:pt-20">
          <div className="flex flex-col items-center text-center">
            {/* Main Heading */}
            <div className={`mb-6 md:mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="hero-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                <span className="text-gradient block">
                  Cloud IT Solutions
                </span>
                <span className="text-white block mt-1 md:mt-2">
                  For Modern Businesses
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto px-2">
                Empowering your business with secure, scalable, and reliable technology infrastructure
              </p>
            </div>
            
            {/* Feature Cards */}
            <div className={`feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Feature 1 */}
              <div className="feature-card bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 hover-lift animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="feature-icon w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="feature-title text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">Secure</h3>
                <p className="feature-text text-sm md:text-base text-gray-300">Enterprise-grade security to protect your valuable data</p>
              </div>
              
              {/* Feature 2 */}
              <div className="feature-card bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 hover-lift animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="feature-icon w-12 h-12 md:w-16 md:h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="feature-title text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">Fast</h3>
                <p className="feature-text text-sm md:text-base text-gray-300">Lightning-fast performance for optimal productivity</p>
              </div>
              
              {/* Feature 3 */}
              <div className="feature-card bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 hover-lift animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="feature-icon w-12 h-12 md:w-16 md:h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h3 className="feature-title text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">Scalable</h3>
                <p className="feature-text text-sm md:text-base text-gray-300">Grow your infrastructure as your business expands</p>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className={`cta-container flex flex-col sm:flex-row gap-3 md:gap-4 justify-center transition-all duration-1000 delay-500 w-full max-w-md px-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <a
                href="/Contact"
                className="cta-button group relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden hover-lift animate-glow"
                style={{ 
                  background: `linear-gradient(to right, #3b82f6, #06b6d4)`,
                  boxShadow: `0 0 20px rgba(59, 130, 246, 0.5)`
                }}
              >
                <span className="relative z-10 text-sm md:text-base">Get a Free Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </a>
              
              {/* <a
                href="tel:9952370971"
                className="cta-button inline-flex items-center justify-center px-4 py-2 md:px-6 md:py-3 rounded-xl font-semibold text-white border-2 border-white/30 transition-all duration-300 bg-white/10 glass-effect hover:bg-white/20 hover-lift"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm md:text-base">Call: 9952370971</span>
              </a> */}
            </div>

            {/* Stats */}
            <div className={`stats-container flex flex-wrap justify-center gap-6 md:gap-8 mt-8 md:mt-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="hover-lift">
                <div className="stats-text text-2xl md:text-3xl font-bold animate-pulse-slow text-white">99.9%</div>
                <div className="stats-label text-xs md:text-sm text-gray-300">Uptime Guarantee</div>
              </div>
              <div className="hover-lift">
                <div className="stats-text text-2xl md:text-3xl font-bold animate-pulse-slow text-white" style={{ animationDelay: '0.5s' }}>24/7</div>
                <div className="stats-label text-xs md:text-sm text-gray-300">Support Available</div>
              </div>
              <div className="hover-lift">
                <div className="stats-text text-2xl md:text-3xl font-bold animate-pulse-slow text-white" style={{ animationDelay: '1s' }}>500+</div>
                <div className="stats-label text-xs md:text-sm text-gray-300">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="wave-svg w-full h-16 md:h-24">
            <path fill="#000000" fillOpacity="1" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>
    </>
  );
}