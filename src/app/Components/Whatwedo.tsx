"use client";
import React, { useState, useEffect, useRef } from "react";

const services = [
  {
    id: 1,
    title: "Software Solutions",
    description: "Custom software development, licensing, and installation services tailored to meet your specific business requirements.",
    icon: "⚙️",
    features: ["Custom Development", "Licensing", "Installation", "Training"],
    gradient: "from-pink-500 to-sky-500",
    bgColor: "from-pink-50 to-sky-50",
    accentColor: "pink",
    stats: { projects: "150+", languages: "10+" }
  },
  {
    id: 2,
    title: "IT Solutions & Consulting",
    description: "Comprehensive IT infrastructure setup, network management, and strategic technology consulting to streamline your business operations.",
    icon: "🖥️",
    features: ["Network Setup", "System Integration", "IT Strategy", "24/7 Support"],
    gradient: "from-sky-500 to-cyan-500",
    bgColor: "from-sky-50 to-cyan-50",
    accentColor: "sky",
    stats: { clients: "500+", satisfaction: "98%" }
  },
  {
    id: 3,
    title: "Computer & Laptop Sales",
    description: "Latest computers and laptops from top brands. Custom builds available for specific business needs with competitive pricing.",
    icon: "💻",
    features: ["Custom Builds", "Brand Warranty", "Bulk Orders", "Free Setup"],
    gradient: "from-cyan-500 to-blue-500",
    bgColor: "from-cyan-50 to-blue-50",
    accentColor: "cyan",
    stats: { devices: "2000+", brands: "15+" }
  },
  {
    id: 4,
    title: "Printer Sales & Services",
    description: "Complete printer solutions including sales, installation, maintenance, and repair services for all major printer brands.",
    icon: "🖨️",
    features: ["All Brands", "Installation", "Maintenance", "Quick Repairs"],
    gradient: "from-blue-500 to-indigo-500",
    bgColor: "from-blue-50 to-indigo-50",
    accentColor: "blue",
    stats: { printers: "800+", response: "<2hrs" }
  },
  {
    id: 5,
    title: "Technical Support",
    description: "Round-the-clock technical support and maintenance services to keep your systems running smoothly and efficiently.",
    icon: "🔧",
    features: ["24/7 Support", "Remote Assistance", "On-site Service", "Preventive Care"],
    gradient: "from-indigo-500 to-purple-500",
    bgColor: "from-indigo-50 to-purple-50",
    accentColor: "indigo",
    stats: { uptime: "99.9%", tickets: "24hr" }
  },
  {
    id: 6,
    title: "Cloud Services",
    description: "Modern cloud solutions including data backup, storage, and migration services to secure and scale your business data.",
    icon: "☁️",
    features: ["Data Backup", "Cloud Storage", "Migration", "Security"],
    gradient: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50",
    accentColor: "purple",
    stats: { storage: "50TB+", security: "99.99%" }
  },
];

export default function WhatWeDo() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('what-we-do');
    if (section) observer.observe(section);

    return () => observer.disconnect();
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
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
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
          box-shadow: 0 25px 50px rgba(5, 83, 170, 0.2);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #0553aa 0%, #0553aa 50%, #033c7a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .service-card-active {
          transform: scale(1.05) translateY(-15px);
          box-shadow: 0 30px 60px rgba(5, 83, 170, 0.3);
        }
        
        .service-card-hover {
          transform: scale(1.02) translateY(-8px);
          box-shadow: 0 20px 40px rgba(5, 83, 170, 0.2);
        }
        
        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .icon-container {
          position: relative;
          overflow: hidden;
        }
        
        .icon-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: rotate 3s linear infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .icon-container:hover::before {
          opacity: 1;
        }

        .custom-blue-bg {
          background-color: rgba(5, 83, 170, 0.05);
        }
        
        .custom-blue-border {
          border-color: #0553aa;
        }
        
        .custom-blue-text {
          color: #0553aa;
        }
        
        .custom-blue-gradient {
          background: linear-gradient(135deg, #0553aa 0%, #0553aa 50%, #033c7a 100%);
        }
        
        .custom-blue-gradient-hover {
          background: linear-gradient(135deg, #033c7a 0%, #0553aa 50%, #0553aa 100%);
        }
      `}</style>
      
      <section 
        ref={sectionRef}
        id="what-we-do" 
        className="py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white custom-blue-bg relative overflow-hidden"
      >
        {/* Enhanced Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 border-2 custom-blue-border rounded-full animate-rotate-slow"></div>
          <div className="absolute bottom-32 right-20 w-32 h-32 border-2 custom-blue-border rounded-lg rotate-45 animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border custom-blue-border rounded-lg rotate-12 animate-bounce-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 custom-blue-gradient rounded-full animate-ping opacity-30"></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border-2 custom-blue-border rounded-xl rotate-45 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          
          {/* Additional floating elements */}
          <div className="absolute top-1/4 left-1/4 w-8 h-8 custom-blue-gradient rounded-full animate-bounce opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/4 w-6 h-6 custom-blue-gradient rounded-lg rotate-45 animate-pulse opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Enhanced Section Header */}
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-3 custom-blue-bg px-8 py-4 rounded-full mb-8 border custom-blue-border shadow-lg hover-lift animate-slide-in-bottom">
              <div className="w-3 h-3 custom-blue-gradient rounded-full animate-pulse"></div>
              <span className="text-2xl transition-all duration-300 hover:scale-110">💼</span>
              <span className="custom-blue-text font-bold text-lg">What We Do</span>
              <div className="w-3 h-3 custom-blue-gradient rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-gradient leading-tight animate-slide-in-bottom" style={{ animationDelay: '0.2s' }}>
              Complete IT Solutions
              <br />
              <span className="text-gradient relative">
                For Your Business
                <div className="absolute -bottom-2 left-0 w-full h-4 custom-blue-gradient opacity-20 blur-sm rounded-full animate-pulse"></div>
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 animate-slide-in-bottom" style={{ animationDelay: '0.4s' }}>
              From cutting-edge technology sales to comprehensive support services, 
              we&apos;re your one-stop solution for all IT needs.
            </p>

            {/* Enhanced Stats Section */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 animate-slide-in-bottom" style={{ animationDelay: '0.6s' }}>
              {[
                { value: "500+", label: "Happy Clients" },
                { value: "99.9%", label: "Uptime" },
                { value: "24/7", label: "Support" },
                { value: "10+", label: "Years Experience" }
              ].map((stat, index) => (
                <div key={index} className="text-center group hover-lift">
                  <div className={`text-3xl md:text-4xl font-bold text-gradient group-hover:scale-110 transition-all duration-300 animate-pulse-slow`} style={{ animationDelay: `${index * 0.2}s` }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium transition-all duration-300 group-hover:text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group relative bg-white rounded-3xl p-8 shadow-xl transition-all duration-700 border border-gray-100 overflow-hidden ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${
                  hoveredCard === service.id 
                    ? 'service-card-active custom-blue-border shadow-blue-500/25' 
                    : 'hover:border-blue-300'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  animationDelay: `${index * 0.1}s`
                }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Enhanced Background Gradient Overlay */}
                <div className={`absolute inset-0 custom-blue-bg opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl`}></div>
                
                {/* Floating Decorative Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 border-2 border-gray-200 rounded-lg rotate-45 opacity-0 group-hover:opacity-100 group-hover:rotate-90 transition-all duration-700"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700" style={{ transitionDelay: '200ms' }}></div>
                <div className="absolute top-1/2 right-6 w-4 h-4 custom-blue-gradient rounded-full opacity-0 group-hover:opacity-100 animate-ping" style={{ transitionDelay: '400ms' }}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Enhanced Icon */}
                  <div className="flex items-center justify-center w-20 h-20 mb-8 relative icon-container">
                    <div className={`absolute inset-0 custom-blue-gradient rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-sm`}></div>
                    <div className={`absolute inset-0 custom-blue-gradient rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    <span 
                      className="text-5xl relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        animation: hoveredCard === service.id ? 'float 2s ease-in-out infinite' : 'none'
                      }}
                    >
                      {service.icon}
                    </span>
                  </div>

                  {/* Enhanced Title */}
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Enhanced Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Enhanced Features */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-gray-700 transition-all duration-300"
                        style={{ animationDelay: `${featureIndex * 0.1}s` }}
                      >
                        <div className={`w-2 h-2 rounded-full custom-blue-gradient flex-shrink-0 group-hover:scale-125 transition-transform duration-300`}></div>
                        <span className="font-medium transition-all duration-300 group-hover:translate-x-1">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced Stats */}
                  <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-2xl group-hover:bg-white transition-colors duration-300">
                    {Object.entries(service.stats).map(([key, value]) => (
                      <div key={key} className="text-center hover-lift">
                        <div className={`text-lg font-bold text-gradient transition-all duration-300 group-hover:scale-110`}>
                          {value}
                        </div>
                        <div className="text-xs text-gray-500 capitalize transition-all duration-300 group-hover:text-gray-600">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced CTA Button */}
                  <button className={`w-full py-4 px-6 rounded-2xl font-bold text-white custom-blue-gradient hover:shadow-xl transition-all duration-500 group-hover:scale-105 active:scale-95 relative overflow-hidden animate-glow`} 
                    onMouseEnter={(e) => e.currentTarget.classList.add('custom-blue-gradient-hover')}
                    onMouseLeave={(e) => e.currentTarget.classList.remove('custom-blue-gradient-hover')}>
                    <span className="relative z-10">Learn More</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shimmer-effect"></div>
                    <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Bottom CTA Section */}
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '1s' }}>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 max-w-5xl mx-auto relative overflow-hidden hover-lift animate-scale-in">
              {/* Enhanced Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-8 left-8 w-16 h-16 border-2 custom-blue-border rounded-lg rotate-12 animate-pulse"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 border-2 custom-blue-border rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 right-1/4 w-8 h-8 custom-blue-gradient rounded-lg rotate-45 animate-rotate-slow"></div>
                <div className="absolute top-1/3 left-1/4 w-10 h-10 border custom-blue-border rounded-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gradient animate-slide-in-bottom">
                  Ready to Transform Your IT Infrastructure?
                </h3>
                <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-in-bottom" style={{ animationDelay: '0.2s' }}>
                  Get personalized solutions tailored to your business needs. 
                  Contact us for a free consultation and quote.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-in-bottom" style={{ animationDelay: '0.4s' }}>
                  <button className="group relative px-10 py-5 custom-blue-gradient text-white font-bold rounded-2xl hover:custom-blue-gradient-hover hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden animate-glow">
                    <span className="relative z-10">Get Free Quote</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shimmer-effect"></div>
                    <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </button>
                  <button className="group px-10 py-5 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:custom-blue-border hover:custom-blue-text transition-all duration-300 bg-white hover:bg-gray-50 hover:scale-105 shadow-lg hover-lift">
                    <span className="flex items-center gap-2">
                      <span>Call Us Now</span>
                      <span className="font-bold custom-blue-text">+91-XXXX-XXXX</span>
                    </span>
                  </button>
                </div>

                {/* Enhanced Additional Info */}
                <div className="flex flex-wrap justify-center gap-8 mt-10 pt-8 border-t border-gray-100 animate-slide-in-bottom" style={{ animationDelay: '0.6s' }}>
                  {[
                    { label: "Free Consultation" },
                    { label: "24/7 Support" },
                    { label: "Quick Response" }
                  ].map((info, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600 hover-lift">
                      <div className={`w-2 h-2 custom-blue-gradient rounded-full animate-pulse`} style={{ animationDelay: `${index * 0.5}s` }}></div>
                      <span className="text-sm font-medium transition-all duration-300 hover:text-gray-700">{info.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Background Decorative Elements */}
        <div 
          className="absolute top-32 right-20 w-64 h-64 custom-blue-bg opacity-30 rounded-full blur-3xl animate-pulse parallax"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
        <div 
          className="absolute bottom-32 left-20 w-80 h-80 custom-blue-bg opacity-20 rounded-full blur-3xl animate-pulse parallax" 
          style={{ 
            animationDelay: '3s',
            transform: `translate(${-mousePosition.x * 0.005}px, ${-mousePosition.y * 0.005}px)`
          }} 
        />
        <div 
          className="absolute top-1/2 left-10 w-48 h-48 custom-blue-bg opacity-15 rounded-full blur-3xl animate-pulse parallax" 
          style={{ 
            animationDelay: '1.5s',
            transform: `translate(${mousePosition.x * 0.008}px, ${-mousePosition.y * 0.008}px)`
          }} 
        />
        
        {/* New interactive elements */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 custom-blue-gradient rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 custom-blue-gradient rounded-full animate-bounce opacity-30" style={{ animationDelay: '0.7s' }}></div>
      </section>
    </>
  );
}