"use client";
import React, { useState, useEffect, useRef } from "react";

const LIGHT_BLUE = "#38bdf8";
const CYAN = "#0ea5e9";

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
          0%, 100% { box-shadow: 0 0 20px rgba(56, 189, 248, 0.3); }
          50% { box-shadow: 0 0 40px rgba(56, 189, 248, 0.6); }
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
          box-shadow: 0 20px 40px rgba(56, 189, 248, 0.2);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gradient-border {
          background: linear-gradient(135deg, #38bdf8, #0ea5e9);
          padding: 2px;
          border-radius: 16px;
        }
        
        .gradient-border > div {
          background: white;
          border-radius: 14px;
        }
      `}</style>
      
      <section 
        ref={heroRef}
        id="home" 
        className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32 gap-12 md:gap-0 overflow-hidden bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {/* Geometric shapes with enhanced animations */}
          <div className="absolute top-20 left-10 w-32 h-32 border border-sky-400 rounded-full animate-rotate-slow"></div>
          <div className="absolute bottom-32 right-20 w-24 h-24 border-2 border-cyan-400 rounded-lg rotate-45 animate-pulse-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-blue-400 rounded-lg rotate-12 animate-bounce-slow"></div>
          
          {/* Enhanced dotted pattern */}
          <div className="absolute top-40 left-1/3 grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div 
                key={i} 
                className="w-2 h-2 bg-sky-300 rounded-full animate-pulse" 
                style={{ 
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              ></div>
            ))}
          </div>
          
          {/* Additional floating elements */}
          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full animate-bounce opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg rotate-45 animate-pulse opacity-40"></div>
        </div>

        {/* Left: Enhanced Text Content */}
        <div className={`flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative animate-slide-in-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="text-gradient">
                Cloud Solutions
              </span>
              <br />
              <span className="relative text-gradient">
                Made Simple
                <div className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-sky-400 to-cyan-400 opacity-20 blur-sm rounded-full animate-pulse"></div>
              </span>
            </h1>
            
            {/* Enhanced floating elements */}
            <div className="absolute -top-6 -left-6 w-4 h-4 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full animate-bounce opacity-80 shadow-lg animate-glow"></div>
            <div className="absolute top-1/2 -right-8 w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse opacity-60 shadow-md"></div>
            <div className="absolute -bottom-8 left-1/4 w-5 h-5 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full animate-bounce opacity-70 shadow-lg" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-50"></div>
          </div>
          
          <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-xl leading-relaxed font-normal animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Streamline your business with our comprehensive cloud infrastructure. 
            <br className="hidden md:inline" />
            <span className="font-semibold text-gray-800 bg-gradient-to-r from-sky-100 to-cyan-100 px-3 py-1 rounded-lg hover-lift inline-block">
              Secure, scalable, and reliable.
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <a
              href="#get-started"
              className="group relative inline-flex items-center px-8 py-4 rounded-2xl font-bold text-white shadow-2xl border-2 border-cyan-400 transition-all duration-300 text-lg md:text-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-cyan-500 hover:to-sky-500 hover:scale-105 hover:shadow-cyan-500/25 active:scale-95 overflow-hidden hover-lift animate-glow"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </a>
            
            <a
              href="#learn-more"
              className="inline-flex items-center px-6 py-3 rounded-2xl font-semibold text-gray-700 border-2 border-gray-300 hover:border-sky-400 hover:text-sky-600 transition-all duration-300 bg-white/80 glass-effect hover:bg-white hover-lift"
            >
              Learn More
              <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Enhanced Stats with animations */}
          <div className="flex gap-8 mt-12 text-center md:text-left animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <div className="hover-lift">
              <div className="text-2xl font-bold text-sky-600 animate-pulse-slow">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="hover-lift">
              <div className="text-2xl font-bold text-cyan-600 animate-pulse-slow" style={{ animationDelay: '0.5s' }}>24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            <div className="hover-lift">
              <div className="text-2xl font-bold text-blue-600 animate-pulse-slow" style={{ animationDelay: '1s' }}>500+</div>
              <div className="text-sm text-gray-600">Clients</div>
            </div>
          </div>
        </div>

        {/* Right: Enhanced Illustration with Interactive Effects */}
        <div className={`flex-1 flex items-center justify-center mb-10 md:mb-0 z-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <div className="relative animate-slide-in-right">
            {/* Main illustration container with enhanced effects */}
            <div 
              className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 hover-lift"
              style={{
                transform: isHovered ? `perspective(1000px) rotateX(${(mousePosition.y - 200) * 0.01}deg) rotateY(${(mousePosition.x - 200) * 0.01}deg)` : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                transition: 'transform 0.1s ease-out'
              }}
            >
              
              {/* Enhanced geometric background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-8 left-8 w-20 h-20 border-2 border-sky-400 rounded-2xl rotate-12 animate-pulse"></div>
                <div className="absolute bottom-8 right-8 w-16 h-16 border-2 border-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 left-8 w-12 h-12 border-2 border-blue-400 rounded-xl -rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-16 right-16 w-8 h-8 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-lg rotate-45 animate-rotate-slow"></div>
                
                {/* Enhanced grid pattern */}
                <div className="absolute inset-4 border border-gray-200 rounded-2xl"></div>
                <div className="absolute inset-8 border border-gray-100 rounded-xl"></div>
              </div>
              
              {/* Main icon with enhanced styling and animations */}
              <div className="relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 animate-scale-in">
                <div className="relative">
                  <span 
                    className="text-[8rem] md:text-[10rem] select-none filter drop-shadow-xl transition-all duration-300 group-hover:scale-110" 
                    role="img" 
                    aria-label="Rocket"
                    style={{
                      animation: isHovered ? 'float 2s ease-in-out infinite' : 'none'
                    }}
                  >
                    🚀
                  </span>
                  {/* Enhanced glow behind rocket */}
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-200 to-cyan-200 opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Enhanced floating elements */}
              <div className="absolute top-6 right-6 w-8 h-8 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full animate-ping opacity-40 shadow-lg"></div>
              <div className="absolute bottom-10 left-10 w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse opacity-60 shadow-md"></div>
              
              {/* Enhanced hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            </div>

            {/* Enhanced orbiting elements */}
            <div className="absolute -top-6 -right-6 w-14 h-14 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-2xl shadow-xl animate-rotate-slow opacity-90 flex items-center justify-center text-white font-bold text-xl border-2 border-white hover-lift">
              ⚡
            </div>
            
            <div className="absolute -bottom-8 -left-8 w-18 h-18 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl shadow-xl flex items-center justify-center text-white text-3xl animate-bounce border-2 border-white hover-lift" style={{ animationDelay: '1s' }}>
              ☁️
            </div>
            
            {/* Additional decorative elements with enhanced animations */}
            <div className="absolute top-1/4 -left-4 w-10 h-10 bg-white border-4 border-sky-300 rounded-full shadow-lg animate-pulse opacity-80 hover-lift"></div>
            <div className="absolute bottom-1/3 -right-3 w-8 h-8 bg-white border-3 border-cyan-400 rounded-lg rotate-45 shadow-md animate-bounce hover-lift" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>

        {/* Enhanced Decorative Elements */}
        <div 
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-sky-100 to-cyan-100 opacity-30 rounded-full blur-3xl animate-pulse z-0 parallax"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-cyan-100 to-blue-100 opacity-40 rounded-full blur-3xl animate-pulse z-0 parallax" 
          style={{ 
            animationDelay: '2s',
            transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`
          }} 
        />
        
        {/* Additional subtle background shapes with enhanced animations */}
        <div className="absolute top-1/3 left-10 w-2 h-32 bg-gradient-to-b from-sky-200 to-transparent opacity-30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-16 w-32 h-2 bg-gradient-to-r from-cyan-200 to-transparent opacity-30 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* New interactive elements */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-sky-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '0.7s' }}></div>
      </section>
    </>
  );
}