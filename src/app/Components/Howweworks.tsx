"use client";
import React, { useState, useEffect, useRef } from "react";

const LIGHT_BLUE = "#38bdf8";
const CYAN = "#0ea5e9";

export default function HowWeWork() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-advance through steps
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const steps = [
    {
      id: 1,
      title: "Consultation & Assessment",
      description: "We understand your tech needs through detailed consultation and assess your current IT infrastructure.",
      icon: "🔍",
      features: ["Free consultation", "Needs assessment", "Custom recommendations"],
      color: "from-sky-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Solution Design",
      description: "Our experts design tailored solutions matching your budget and requirements.",
      icon: "🎯",
      features: ["Custom solutions", "Budget planning", "Technical specifications"],
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 3,
      title: "Implementation",
      description: "Professional installation, setup, and configuration of your IT equipment and systems.",
      icon: "⚙️",
      features: ["Professional setup", "Data migration", "System integration"],
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: 4,
      title: "Ongoing Support",
      description: "24/7 support, maintenance, and upgrades to keep your systems running smoothly.",
      icon: "🛡️",
      features: ["24/7 support", "Regular maintenance", "System upgrades"],
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(1deg); }
          66% { transform: translateY(4px) rotate(-1deg); }
        }
        
        @keyframes slideInFromBottom {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInFromRight {
          from {
            transform: translateX(50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
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
        
        .animate-slide-in-bottom {
          animation: slideInFromBottom 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-slide-in-left {
          animation: slideInFromLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-slide-in-right {
          animation: slideInFromRight 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-scale-in {
          animation: scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
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
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(56, 189, 248, 0.2);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .progress-bar {
          background: linear-gradient(90deg, #38bdf8, #0ea5e9, #0284c7);
          background-size: 200% 100%;
          animation: shimmer 2s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .step-card-active {
          transform: scale(1.05) translateY(-10px);
          box-shadow: 0 25px 50px rgba(56, 189, 248, 0.3);
        }
        
        .step-card-hover {
          transform: scale(1.02) translateY(-5px);
          box-shadow: 0 15px 30px rgba(56, 189, 248, 0.2);
        }
      `}</style>
      
      <section 
        ref={sectionRef}
        id="how-we-work" 
        className="relative py-20 md:py-32 bg-white overflow-hidden"
      >
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-32 left-16 w-40 h-40 border border-sky-400 rounded-2xl animate-rotate-slow"></div>
          <div className="absolute bottom-40 right-24 w-32 h-32 border-2 border-cyan-400 rounded-full rotate-45 animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 border border-blue-400 rounded-xl rotate-12 animate-bounce-slow"></div>
          
          {/* Enhanced Circuit pattern */}
          <div className="absolute top-20 right-1/3 grid grid-cols-4 gap-1">
            {[...Array(16)].map((_, i) => (
              <div 
                key={i} 
                className="w-1 h-1 bg-sky-300 rounded-full animate-pulse" 
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '2s'
                }}
              ></div>
            ))}
          </div>
          
          {/* Additional floating elements */}
          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full animate-bounce opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg rotate-45 animate-pulse opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Enhanced Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative inline-block animate-slide-in-bottom">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-gradient">
                How We Work
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-3 bg-gradient-to-r from-sky-400 to-cyan-400 opacity-20 blur-sm rounded-full animate-pulse"></div>
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-slide-in-bottom" style={{ animationDelay: '0.2s' }}>
              From consultation to ongoing support, we ensure your IT infrastructure 
              <br className="hidden md:inline" />
              <span className="font-semibold text-gray-800 bg-gradient-to-r from-sky-100 to-cyan-100 px-3 py-1 rounded-lg hover-lift inline-block">
                works seamlessly for your business success.
              </span>
            </p>
          </div>

          {/* Enhanced Process Steps */}
          <div className="relative">
            {/* Enhanced Connection Line */}
            <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-2 bg-gradient-to-r from-sky-200 via-cyan-300 to-blue-200 rounded-full shadow-lg">
              <div 
                className="h-full progress-bar rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${((activeStep + 1) / 4) * 100}%` }}
              ></div>
              
              {/* Progress indicators */}
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                    index <= activeStep 
                      ? 'bg-gradient-to-r from-sky-500 to-cyan-500 border-white shadow-lg animate-glow' 
                      : 'bg-white border-gray-300'
                  }`}
                  style={{ left: `${(index / 3) * 100}%` }}
                ></div>
              ))}
            </div>

            {/* Enhanced Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`relative transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 0.2}s`,
                    animationDelay: `${index * 0.2}s`
                  }}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Enhanced Step Card */}
                  <div className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 transition-all duration-500 group overflow-hidden h-full hover-lift ${
                    activeStep === index 
                      ? 'step-card-active border-sky-400 shadow-sky-500/25' 
                      : hoveredStep === index 
                        ? 'step-card-hover border-sky-300' 
                        : 'border-gray-100 hover:border-sky-300'
                  }`}>
                    
                    {/* Enhanced Step Number */}
                    <div className={`absolute top-4 right-4 w-10 h-10 rounded-full transition-all duration-500 ${
                      activeStep === index 
                        ? 'bg-gradient-to-r from-sky-500 to-cyan-500 scale-110 animate-glow' 
                        : hoveredStep === index
                          ? 'bg-gradient-to-r from-sky-400 to-cyan-400 scale-105'
                          : 'bg-gray-200'
                    } flex items-center justify-center text-sm font-bold text-white`}>
                      {step.id}
                    </div>

                    {/* Enhanced Icon */}
                    <div className="relative mb-6">
                      <div className={`relative z-10 transition-all duration-500 ${
                        activeStep === index 
                          ? 'scale-125 rotate-6' 
                          : hoveredStep === index
                            ? 'scale-115 rotate-3'
                            : 'group-hover:scale-110 group-hover:rotate-3'
                      }`}>
                        <div className="relative">
                          <span 
                            className="text-6xl select-none filter drop-shadow-lg transition-all duration-300" 
                            role="img"
                            style={{
                              animation: activeStep === index ? 'float 2s ease-in-out infinite' : 'none'
                            }}
                          >
                            {step.icon}
                          </span>
                          {/* Enhanced Glow effect */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 transition-opacity duration-500 rounded-full ${
                            activeStep === index ? 'opacity-40 blur-2xl' : hoveredStep === index ? 'opacity-25 blur-xl' : 'group-hover:opacity-20 blur-lg'
                          }`}></div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Content */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight transition-all duration-300 group-hover:text-sky-700">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed transition-all duration-300 group-hover:text-gray-700">
                      {step.description}
                    </p>

                    {/* Enhanced Features */}
                    <ul className="space-y-3">
                      {step.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className="flex items-center text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-700"
                          style={{ animationDelay: `${featureIndex * 0.1}s` }}
                        >
                          <div className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${
                            activeStep === index 
                              ? 'bg-gradient-to-r from-sky-400 to-cyan-400 scale-125' 
                              : hoveredStep === index
                                ? 'bg-gradient-to-r from-sky-300 to-cyan-300 scale-110'
                                : 'bg-gray-300 group-hover:bg-sky-300'
                          }`}></div>
                          <span className="transition-all duration-300 group-hover:translate-x-1">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Enhanced Hover overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-tr ${step.color} opacity-0 transition-opacity duration-500 rounded-3xl ${
                      activeStep === index ? 'opacity-8' : hoveredStep === index ? 'opacity-6' : 'group-hover:opacity-5'
                    }`}></div>

                    {/* Enhanced Decorative elements */}
                    <div className="absolute -bottom-6 -right-6 w-12 h-12 border-4 border-sky-200 rounded-full opacity-30 group-hover:opacity-60 transition-all duration-300 animate-pulse"></div>
                    <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-cyan-200 rounded-lg rotate-45 opacity-20 group-hover:opacity-50 transition-all duration-300 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Services Highlight */}
          <div className={`mt-20 text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ animationDelay: '1s' }}>
            <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-3xl p-8 md:p-12 border-2 border-sky-100 shadow-lg hover-lift animate-scale-in">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-gradient">
                What We Offer
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: "💻", title: "Computer & Laptop Sales", desc: "Latest models from top brands with warranty and support" },
                  { icon: "🖨️", title: "Printer Solutions", desc: "Complete printing solutions for all business needs" },
                  { icon: "🔧", title: "Technical Services", desc: "Repair, maintenance, and upgrade services" }
                ].map((service, index) => (
                  <div 
                    key={index} 
                    className="text-center hover-lift transition-all duration-300 group"
                    style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                  >
                    <div className="text-4xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">{service.icon}</div>
                    <h4 className="font-semibold text-lg text-gray-800 mb-2 transition-all duration-300 group-hover:text-sky-700">{service.title}</h4>
                    <p className="text-gray-600 transition-all duration-300 group-hover:text-gray-700">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced CTA */}
          <div className={`text-center mt-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ animationDelay: '1.5s' }}>
            <a
              href="#contact"
              className="group relative inline-flex items-center px-10 py-5 rounded-2xl font-bold text-white shadow-2xl border-2 border-cyan-400 transition-all duration-300 text-lg md:text-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-cyan-500 hover:to-sky-500 hover:scale-105 hover:shadow-cyan-500/25 active:scale-95 overflow-hidden hover-lift animate-glow"
            >
              <span className="relative z-10">Start Your IT Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </a>
          </div>
        </div>

        {/* Enhanced Background Decorations */}
        <div 
          className="absolute top-40 left-10 w-80 h-80 bg-gradient-to-r from-sky-100 to-cyan-100 opacity-20 rounded-full blur-3xl animate-pulse z-0 parallax"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
        <div 
          className="absolute bottom-40 right-10 w-96 h-96 bg-gradient-to-r from-cyan-100 to-blue-100 opacity-25 rounded-full blur-3xl animate-pulse z-0 parallax" 
          style={{ 
            animationDelay: '2s',
            transform: `translate(${-mousePosition.x * 0.005}px, ${-mousePosition.y * 0.005}px)`
          }} 
        />
        
        {/* Enhanced decorative elements */}
        <div className="absolute top-1/4 right-20 w-3 h-40 bg-gradient-to-b from-sky-200 to-transparent opacity-30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-20 w-40 h-3 bg-gradient-to-r from-cyan-200 to-transparent opacity-30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* New interactive elements */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-sky-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '0.7s' }}></div>
      </section>
    </>
  );
}