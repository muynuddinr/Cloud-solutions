"use client";
import React, { useEffect, useState } from "react";

const ACCENT_FROM = "from-orange-500"; 
const ACCENT_TO = "to-red-500";   

type Capability = {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  points: string[];
};

const capabilities: Capability[] = [
  {
    id: 1,
    title: "Custom PC Builds",
    description:
      "Tailored systems designed for your specific needs. Gaming, workstations, and more.",
    icon: "🖥️",
    gradient: `from-orange-500 to-red-500`,
    points: ["Gaming PCs", "Workstations", "Silent Builds"],
  },
  {
    id: 2,
    title: "Hardware Upgrades",
    description:
      "Boost your system's performance with the latest components and optimizations.",
    icon: "🔧",
    gradient: `from-red-500 to-orange-400`,
    points: ["GPU/CPU", "RAM/Storage", "Cooling"],
  },
  {
    id: 3,
    title: "PC Repair & Support",
    description:
      "Diagnose and fix hardware issues. Full system diagnostics and troubleshooting.",
    icon: "🛠️",
    gradient: `from-orange-400 to-yellow-500`,
    points: ["Diagnostics", "Repairs", "Maintenance"],
  },
  {
    id: 4,
    title: "Liquid Cooling",
    description:
      "Advanced cooling solutions for maximum performance and aesthetics.",
    icon: "💧",
    gradient: `from-yellow-500 to-orange-500`,
    points: ["Custom Loops", "AIO Coolers", "Thermal Optimization"],
  },
];

type PortfolioItem = {
  id: number;
  name: string;
  category: string;
  emoji: string;
  gradient: string;
  description: string;
};

const portfolio: PortfolioItem[] = [
  { 
    id: 1, 
    name: "Titan Gaming", 
    category: "High-End Gaming", 
    emoji: "🎮", 
    gradient: "from-orange-400 to-red-500",
    description: "RTX 4090, i9-13900K, 64GB DDR5"
  },
  { 
    id: 2, 
    name: "Creator Pro", 
    category: "Workstation", 
    emoji: "🎨", 
    gradient: "from-red-500 to-orange-600",
    description: "Threadripper Pro, 128GB RAM, RTX A6000"
  },
  { 
    id: 3, 
    name: "Silent Beast", 
    category: "Quiet PC", 
    emoji: "🤫", 
    gradient: "from-orange-500 to-yellow-600",
    description: "Passive cooling, noise-optimized components"
  },
  { 
    id: 4, 
    name: "Compact Power", 
    category: "SFF Build", 
    emoji: "📦", 
    gradient: "from-yellow-500 to-orange-600",
    description: "ITX form factor with full-size performance"
  },
  { 
    id: 5, 
    name: "Liquid Cooled", 
    category: "Custom Loop", 
    emoji: "💧", 
    gradient: "from-orange-500 to-red-400",
    description: "Hardline tubing, RGB lighting, dual radiators"
  },
  { 
    id: 6, 
    name: "Budget King", 
    category: "Value Build", 
    emoji: "💰", 
    gradient: "from-orange-500 to-red-600",
    description: "Best performance per dollar, upgradeable"
  },
];

const techStack = [
  { name: "Intel", tag: "CPU", color: "text-orange-400" },
  { name: "AMD", tag: "CPU/GPU", color: "text-red-400" },
  { name: "NVIDIA", tag: "GPU", color: "text-orange-300" },
  { name: "ASUS", tag: "Motherboard", color: "text-yellow-400" },
  { name: "Corsair", tag: "RAM/PSU", color: "text-orange-400" },
  { name: "Samsung", tag: "Storage", color: "text-red-400" },
  { name: "EKWB", tag: "Cooling", color: "text-orange-300" },
  { name: "Lian Li", tag: "Case", color: "text-yellow-400" },
];

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "They built my dream gaming PC that handles everything I throw at it. Perfect cable management too!",
    name: "Alex Johnson",
    role: "Content Creator",
    avatar: "👨‍💼",
  },
  {
    id: 2,
    quote:
      "Our studio's workstations have never been more reliable. The custom cooling solution is genius.",
    name: "Sarah Williams",
    role: "Studio Manager",
    avatar: "👩‍💼",
  },
  {
    id: 3,
    quote:
      "Upgraded my old PC into a modern powerhouse. Their component selection was spot-on.",
    name: "Michael Chen",
    role: "Software Developer",
    avatar: "👨‍💻",
  },
];

export default function PCBuildingCompany() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => setIsVisible(true), []);

  return (
    <section
      id="pc-building"
      className="relative bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden min-h-screen"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-24 left-10 w-32 h-32 border-2 border-orange-400 rounded-full animate-spin" style={{ animationDuration: "20s" }}></div>
        <div className="absolute bottom-32 right-20 w-28 h-28 border-2 border-red-400 rounded-lg rotate-45 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-yellow-400 rounded-lg rotate-12 animate-bounce" style={{ animationDelay: "1.6s" }}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 border-2 border-orange-500 rounded-full animate-ping" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 relative z-10">
        {/* Hero Section */}
        <div className={`relative mb-24 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-900/50 to-red-900/50 px-6 py-3 rounded-full border border-orange-400/30 backdrop-blur-sm">
            <span className="text-2xl">⚡</span>
            <span className="text-orange-300 font-bold">PC Building Experts</span>
          </div>
          <div className="mt-6 relative">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 bg-clip-text text-transparent leading-tight">
              We build powerful
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                custom computers
              </span>
            </h1>
            <div className="absolute -bottom-2 left-0 w-56 h-4 bg-gradient-to-r from-orange-400 to-red-400 opacity-30 blur-sm rounded-full"></div>
          </div>
          <div className="mt-8 flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1">
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                From gaming rigs to professional workstations, we craft high-performance PCs tailored to your specific needs.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className={`group inline-flex items-center px-8 py-4 rounded-2xl font-bold text-white shadow-2xl border-2 border-orange-400 transition-all duration-300 bg-gradient-to-r ${ACCENT_FROM} ${ACCENT_TO} hover:scale-105 hover:shadow-orange-500/25 hover:shadow-2xl`}
                >
                  <span>Configure Your PC</span>
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                </a>
                <a
                  href="#portfolio"
                  className="inline-flex items-center px-6 py-4 rounded-2xl font-semibold text-gray-600 border-2 border-gray-300 hover:border-orange-400 hover:text-orange-600 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                >
                  View Our Builds
                </a>
              </div>
            </div>
            
            {/* Hero Video */}
            <div className="flex-1 max-w-md lg:max-w-lg">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-900/50 to-red-900/50 border border-orange-400/30 backdrop-blur-sm shadow-2xl">
                <video
                  className="w-full h-64 md:h-80 object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/your-gaming-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, index) => (
              <div
                key={cap.id}
                className="group relative bg-white/80 rounded-3xl p-8 border border-gray-200 hover:border-orange-400/50 transition-all duration-500 overflow-hidden backdrop-blur-sm shadow-lg"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cap.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`}></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-400/30 flex items-center justify-center text-4xl backdrop-blur-sm">
                    {cap.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cap.title}</h3>
                  <p className="text-gray-600 mb-4">{cap.description}</p>
                  <ul className="space-y-2">
                    {cap.points.map((p) => (
                      <li key={p} className="flex items-center text-sm text-gray-500">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${cap.gradient} mr-3`}></div>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        <div id="portfolio" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Featured Builds</h2>
            <p className="text-gray-600 text-lg">A showcase of our custom PC creations.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((item) => (
              <div key={item.id} className="group relative rounded-3xl overflow-hidden bg-white/80 border border-gray-200 hover:border-orange-400/50 transition-all duration-300 backdrop-blur-sm shadow-lg">
                <div className={`h-48 flex items-center justify-center text-7xl bg-gradient-to-br ${item.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  <span className="relative z-10">{item.emoji}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">{item.name}</h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-orange-900/50 text-orange-300 border border-orange-400/30">{item.category}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Component Partners</h2>
            <p className="text-gray-600 text-lg">Premium brands we trust and use.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {techStack.map((t) => (
              <div key={t.name} className="flex items-center justify-between px-5 py-4 rounded-2xl bg-white/80 border border-gray-200 hover:border-orange-400/50 transition-all backdrop-blur-sm shadow-lg">
                <span className={`font-semibold ${t.color}`}>{t.name}</span>
                <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1 border border-gray-200">{t.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        {/* <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Client Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="relative bg-white/80 rounded-3xl p-8 border border-gray-200 backdrop-blur-sm shadow-lg">
                <div className="text-4xl mb-4 text-orange-400">"</div>
                <p className="text-gray-600 leading-relaxed mb-6">{t.quote}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-xl">
                    {t.avatar}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-white/90 to-gray-50/90 rounded-3xl p-8 md:p-12 border border-orange-400/30 max-w-4xl mx-auto relative overflow-hidden backdrop-blur-sm shadow-xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-8 left-8 w-16 h-16 border-2 border-orange-400 rounded-lg rotate-12 animate-pulse"></div>
              <div className="absolute bottom-8 right-8 w-12 h-12 border-2 border-red-400 rounded-full animate-bounce"></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent">
                Ready to build your dream PC?
              </h3>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Let's discuss your requirements and create the perfect system for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="Contact"
                  className={`group px-8 py-4 bg-gradient-to-r ${ACCENT_FROM} ${ACCENT_TO} text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl hover:shadow-orange-500/25`}
                >
                  Configure Your PC
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background blobs */}
      <div className="absolute top-24 -left-10 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-24 -right-10 w-96 h-96 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl" />
    </section>
  );
}