"use client";
import React, { useEffect, useState } from "react";

type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  gradient: string;
  bgColor: string;
  stats: Record<string, string>;
};

const services: Service[] = [
  {
    id: 1,
    title: "Website Development",
    description:
      "Modern, responsive websites built for speed, SEO, and conversions using the latest web technologies.",
    icon: "🌐",
    features: ["Next.js/React", "SEO Optimized", "CMS Integration", "Analytics"],
    gradient: "from-sky-500 to-cyan-500",
    bgColor: "from-sky-50 to-cyan-50",
    stats: { projects: "120+", rating: "5★" },
  },
  {
    id: 2,
    title: "Mobile App",
    description:
      "High-performance iOS and Android apps with beautiful UI and robust, scalable backends.",
    icon: "📱",
    features: ["iOS & Android", "App Store Launch", "Push Notifications", "APIs"],
    gradient: "from-cyan-500 to-[#0553aa]",
    bgColor: "from-cyan-50 to-[#0553aa]",
    stats: { downloads: "250k+", uptime: "99.9%" },
  },
  {
    id: 3,
    title: "Laptop & Desktop Sales & Service",
    description:
      "Genuine hardware, custom builds, upgrades and repairs with quick turnaround and warranty support.",
    icon: "💻",
    features: ["New & Refurb", "Custom Builds", "Upgrades", "On-site Repair"],
    gradient: "from-[#0553aa] to-indigo-500",
    bgColor: "from-[#0553aa] to-indigo-50",
    stats: { devices: "2000+", response: "<2 hrs" },
  },
  {
    id: 4,
    title: "Server Support & Service",
    description:
      "End-to-end server installation, monitoring, backup, and maintenance for reliable operations.",
    icon: "🗄️",
    features: ["Setup & Hardening", "Monitoring", "Backups", "Disaster Recovery"],
    gradient: "from-indigo-500 to-purple-500",
    bgColor: "from-indigo-50 to-purple-50",
    stats: { uptime: "99.99%", incidents: "SLA" },
  },
  {
    id: 5,
    title: "Digital Marketing",
    description:
      "Performance-driven SEO, ads, and social media strategies to grow traffic and conversions.",
    icon: "📈",
    features: ["SEO/SEM", "Social Media", "Content", "Analytics"],
    gradient: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50",
    stats: { ROI: "3–7x", leads: "+120%" },
  },
  {
    id: 6,
    title: "Queue Management",
    description:
      "Smart queue solutions with tokens, dashboards, and notifications to streamline customer flow.",
    icon: "🎫",
    features: ["Token System", "Displays", "SMS/WhatsApp", "Reports"],
    gradient: "from-pink-500 to-rose-500",
    bgColor: "from-pink-50 to-rose-50",
    stats: { waitTime: "-45%", branches: "Multi" },
  },
];

export default function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    const el = document.getElementById("services");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      className="py-20 md:py-32 bg-gray-50 relative overflow-hidden"
    >
      {/* Background decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute top-16 left-10 w-36 h-36 border-2 border-sky-400 rounded-full animate-spin"
          style={{ animationDuration: "30s" }}
        />
        <div className="absolute bottom-24 right-20 w-28 h-28 border-2 border-cyan-400 rounded-2xl rotate-45 animate-pulse" />
        <div
          className="absolute top-1/2 left-1/4 w-20 h-20 border border-[#0553aa] rounded-xl -rotate-6 animate-bounce"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-3 bg-sky-100 px-6 py-3 rounded-full mb-6 border border-sky-200 shadow">
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-ping" />
            <span className="text-sky-700 font-bold">Our Services</span>
            <div
              className="w-2 h-2 bg-sky-500 rounded-full animate-ping"
              style={{ animationDelay: "0.5s" }}
            />
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold mb-5 text-gray-900 leading-tight">
            Solutions That Drive Results
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From development to support and marketing, we provide end-to-end technology services
            tailored to your business.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 md:mb-20">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-transparent overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 120}ms`,
                transform:
                  hoveredCard === service.id
                    ? "translateY(-10px) scale(1.02)"
                    : "translateY(0px) scale(1)",
              }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Hover overlay (solid) */}
              <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />

              {/* Floating bits */}
              <div className="absolute top-4 right-4 w-8 h-8 border-2 border-gray-200 rounded-lg rotate-45 opacity-0 group-hover:opacity-100 group-hover:rotate-90 transition-all duration-700" />
              <div
                className="absolute bottom-4 left-4 w-6 h-6 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700"
                style={{ transitionDelay: "200ms" }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="flex items-center justify-center w-20 h-20 mb-8 relative">
                  <div className="absolute inset-0 bg-sky-200 rounded-3xl opacity-30 group-hover:opacity-40 transition-opacity duration-500" />
                  <span className="text-5xl relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {service.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-sky-600 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-2xl group-hover:bg-white transition-colors duration-300">
                  {Object.entries(service.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold text-sky-700">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-[#0553aa] hover:bg-[#044a94] hover:shadow-xl transition-all duration-500 group-hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10">Learn More</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 max-w-5xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-8 left-8 w-16 h-16 border-2 border-sky-400 rounded-lg rotate-12 animate-pulse" />
              <div className="absolute bottom-8 right-8 w-12 h-12 border-2 border-cyan-400 rounded-full animate-bounce" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Need a custom solution?
              </h3>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Talk to our experts for a free consultation and tailored proposal for your business.
              </p>
              <a
                href="/Contact"
                className="group inline-flex items-center px-8 py-4 rounded-2xl font-bold text-white shadow-2xl border-2 border-cyan-400 transition-all duration-300 bg-[#0553aa] hover:bg-[#044a94] hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">Get Free Quote</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ambient blobs (solid) */}
      <div className="absolute top-28 right-16 w-64 h-64 bg-sky-100 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-28 left-16 w-80 h-80 bg-cyan-100 opacity-20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />
    </section>
  );
}
