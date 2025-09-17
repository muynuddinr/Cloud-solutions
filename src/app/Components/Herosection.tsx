"use client";
import React, { useState, useEffect, useRef } from "react";

const LIGHT_BLUE = "#0553aa";
const CYAN = "#0553aa";

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
          0%, 100% { box-shadow: 0 0 20px rgba(5, 83, 170, 0.3); }
          50% { box-shadow: 0 0 40px rgba(5, 83, 170, 0.6); }
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
          box-shadow: 0 20px 40px rgba(5, 83, 170, 0.2);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #0553aa 0%, #0553aa 50%, #0553aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gradient-border {
          background: linear-gradient(135deg, #0553aa, #0553aa);
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
          <div 
            className="absolute top-20 left-10 w-32 h-32 rounded-full animate-rotate-slow"
            style={{ border: `1px solid #0553aa` }}
          ></div>
          <div 
            className="absolute bottom-32 right-20 w-24 h-24 rounded-lg rotate-45 animate-pulse-slow"
            style={{ border: `2px solid #0553aa` }}
          ></div>
          <div 
            className="absolute top-1/3 right-1/4 w-16 h-16 rounded-lg rotate-12 animate-bounce-slow"
            style={{ border: `1px solid #0553aa` }}
          ></div>
          
          {/* Enhanced dotted pattern */}
          <div className="absolute top-40 left-1/3 grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div 
                key={i} 
                className="w-2 h-2 rounded-full animate-pulse" 
                style={{ 
                  backgroundColor: '#0553aa',
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              ></div>
            ))}
          </div>
          
          {/* Additional floating elements */}
          <div 
            className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full animate-bounce opacity-30"
            style={{ background: `linear-gradient(to right, #0553aa, #0553aa)` }}
          ></div>
          <div 
            className="absolute bottom-1/4 right-1/4 w-6 h-6 rounded-lg rotate-45 animate-pulse opacity-40"
            style={{ background: `linear-gradient(to right, #0553aa, #0553aa)` }}
          ></div>
        </div>

        {/* Left: Enhanced Text Content */}
        <div className={`flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative animate-slide-in-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="text-gradient">
                Reliable IT Services
              </span>
              <br />
              <span className="relative text-gradient">
                You Can Trust
                <div 
                  className="absolute -bottom-2 left-0 w-full h-3 opacity-20 blur-sm rounded-full animate-pulse"
                  style={{ background: `linear-gradient(to right, #0553aa, #0553aa)` }}
                ></div>
              </span>
            </h1>
            
            {/* Enhanced floating elements */}
            <div 
              className="absolute -top-6 -left-6 w-4 h-4 rounded-full animate-bounce opacity-80 shadow-lg animate-glow"
              style={{ background: `linear-gradient(to right, #0553aa, #0553aa)` }}
            ></div>
            <div 
              className="absolute top-1/2 -right-8 w-3 h-3 rounded-full animate-pulse opacity-60 shadow-md"
              style={{ background: `linear-gradient(to right, #0553aa, #0553aa)` }}
            ></div>
            <div 
              className="absolute -bottom-8 left-1/4 w-5 h-5 rounded-full animate-bounce opacity-70 shadow-lg" 
              style={{ 
                background: `linear-gradient(to right, #0553aa, #0553aa)`,
                animationDelay: '1s' 
              }}
            ></div>
            <div 
              className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full animate-ping opacity-50"
              style={{ backgroundColor: '#0553aa' }}
            ></div>
          </div>
          
          <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-xl leading-relaxed font-normal animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Honesty, Transparency, and Trust – That's Our Promise.
            <br className="hidden md:inline" />
            <span 
              className="font-semibold text-gray-800 px-3 py-1 rounded-lg hover-lift inline-block mt-3"
              style={{ background: `linear-gradient(to right, rgba(5, 83, 170, 0.1), rgba(5, 83, 170, 0.1))` }}
            >
              Secure, scalable, and reliable cloud solutions.
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <a
              href="/Contact"
              className="group relative inline-flex items-center px-8 py-4 rounded-2xl font-bold text-white shadow-2xl transition-all duration-300 text-lg md:text-xl hover:scale-105 active:scale-95 overflow-hidden hover-lift animate-glow"
              style={{ 
                background: `linear-gradient(to right, #0553aa, #0553aa)`,
                border: `2px solid #0553aa`,
                boxShadow: `0 0 20px rgba(5, 83, 170, 0.25)`
              }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.background = `linear-gradient(to right, #0553aa, #0553aa)`}
              onMouseLeave={(e) => (e.target as HTMLElement).style.background = `linear-gradient(to right, #0553aa, #0553aa)`}
            >
              <span className="relative z-10">Get a Free Quote</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </a>
            
            <a
              href="tel:9944788878"
              className="inline-flex items-center px-6 py-3 rounded-2xl font-semibold text-gray-700 border-2 border-gray-300 transition-all duration-300 bg-white/80 glass-effect hover:bg-white hover-lift"
              style={{ 
                borderColor: '#0553aa',
                color: '#0553aa'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.borderColor = '#0553aa';
                (e.target as HTMLElement).style.color = '#0553aa';
              }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us: 9944788878
            </a>
          </div>

          {/* Enhanced Stats with animations */}
          <div className="flex gap-8 mt-12 text-center md:text-left animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <div className="hover-lift">
              <div className="text-2xl font-bold animate-pulse-slow" style={{ color: '#0553aa' }}>99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="hover-lift">
              <div className="text-2xl font-bold animate-pulse-slow" style={{ color: '#0553aa', animationDelay: '0.5s' }}>24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            <div className="hover-lift">
              <div className="text-2xl font-bold animate-pulse-slow" style={{ color: '#0553aa', animationDelay: '1s' }}>500+</div>
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
                <div 
                  className="absolute top-8 left-8 w-20 h-20 rounded-2xl rotate-12 animate-pulse"
                  style={{ border: `2px solid #0553aa` }}
                ></div>
                <div 
                  className="absolute bottom-8 right-8 w-16 h-16 rounded-full animate-bounce" 
                  style={{ 
                    border: `2px solid #0553aa`,
                    animationDelay: '0.5s' 
                  }}
                ></div>
                <div 
                  className="absolute top-1/2 left-8 w-12 h-12 rounded-xl -rotate-12 animate-pulse" 
                  style={{ 
                    border: `2px solid #0553aa`,
                    animationDelay: '1s' 
                  }}
                ></div>
                <div 
                  className="absolute top-16 right-16 w-8 h-8 rounded-lg rotate-45 animate-rotate-slow"
                  style={{ background: `linear-gradient(to right, #0553aa, #0553aa)` }}
                ></div>
                
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
                    aria-label="Cloud"
                    style={{
                      animation: isHovered ? 'float 2s ease-in-out infinite' : 'none'
                    }}
                  >
                    ☁️
                  </span>
                  {/* Enhanced glow behind cloud */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 rounded-full animate-pulse"
                    style={{ background: `linear-gradient(to right, rgba(5, 83, 170, 0.2), rgba(5, 83, 170, 0.2))` }}
                  ></div>
                </div>
              </div>
              
              {/* Enhanced floating elements */}
              <div 
                className="absolute top-6 right-6 w-8 h-8 rounded-full animate-ping opacity-40 shadow-lg"
                style={{ background: `linear-gradient(to right, #0553aa, #0553aa)` }}
              ></div>
              <div 
                className="absolute bottom-10 left-10 w-6 h-6 rounded-full animate-pulse opacity-60 shadow-md"
                style={{ background: `linear-gradient(to right, #0553aa, #0553aa)` }}
              ></div>
              
              {/* Enhanced hover effect overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                style={{ background: `linear-gradient(to top right, rgba(5, 83, 170, 0.05), rgba(5, 83, 170, 0.05))` }}
              ></div>
            </div>

            {/* Enhanced orbiting elements */}
            <div 
              className="absolute -top-6 -right-6 w-14 h-14 rounded-2xl shadow-xl animate-rotate-slow opacity-90 flex items-center justify-center text-white font-bold text-xl border-2 border-white hover-lift"
              style={{ background: `linear-gradient(to right, #0553aa, #0553aa)` }}
            >
              ⚡
            </div>
            
            <div 
              className="absolute -bottom-8 -left-8 w-18 h-18 rounded-3xl shadow-xl flex items-center justify-center text-white text-3xl animate-bounce border-2 border-white hover-lift" 
              style={{ 
                background: `linear-gradient(to right, #0553aa, #0553aa)`,
                animationDelay: '1s' 
              }}
            >
              🔒
            </div>
            
            {/* Additional decorative elements with enhanced animations */}
            <div 
              className="absolute top-1/4 -left-4 w-10 h-10 bg-white rounded-full shadow-lg animate-pulse opacity-80 hover-lift"
              style={{ border: `4px solid #0553aa` }}
            ></div>
            <div 
              className="absolute bottom-1/3 -right-3 w-8 h-8 bg-white rounded-lg rotate-45 shadow-md animate-bounce hover-lift" 
              style={{ 
                border: `3px solid #0553aa`,
                animationDelay: '1.5s' 
              }}
            ></div>
          </div>
        </div>

        {/* Enhanced Decorative Elements */}
        <div 
          className="absolute top-20 left-20 w-96 h-96 opacity-30 rounded-full blur-3xl animate-pulse z-0 parallax"
          style={{
            background: `linear-gradient(to right, rgba(5, 83, 170, 0.1), rgba(5, 83, 170, 0.1))`,
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute bottom-20 right-20 w-80 h-80 opacity-40 rounded-full blur-3xl animate-pulse z-0 parallax" 
          style={{ 
            background: `linear-gradient(to right, rgba(5, 83, 170, 0.1), rgba(5, 83, 170, 0.1))`,
            animationDelay: '2s',
            transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`
          }} 
        />
        
        {/* Additional subtle background shapes with enhanced animations */}
        <div 
          className="absolute top-1/3 left-10 w-2 h-32 opacity-30 rounded-full animate-pulse"
          style={{ background: `linear-gradient(to bottom, rgba(5, 83, 170, 0.2), transparent)` }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-16 w-32 h-2 opacity-30 rounded-full animate-pulse" 
          style={{ 
            background: `linear-gradient(to right, rgba(5, 83, 170, 0.2), transparent)`,
            animationDelay: '3s' 
          }} 
        />
        
        {/* New interactive elements */}
        <div 
          className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full animate-ping opacity-20"
          style={{ backgroundColor: '#0553aa' }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full animate-bounce opacity-30" 
          style={{ 
            backgroundColor: '#0553aa',
            animationDelay: '0.7s' 
          }}
        ></div>
      </section>
    </>
  );
}