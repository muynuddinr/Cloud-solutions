"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

// --- TYPE DEFINITIONS ---
interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
}

interface Differentiator {
  title: string;
  description: string;
}

// --- DATA ---
const PRIMARY_BLUE = "#0553aa";

const services: Service[] = [
  {
    title: "Laptop & PC Sales & Services",
    description: "Keep your systems running smoothly. From quick repairs and upgrades to annual maintenance contracts, we provide reliable support for all major brands.",
    icon: "💻",
    features: ["Quick Repairs", "System Upgrades", "New Device Sales", "All Major Brands"],
    color: "from-sky-500 to-cyan-500"
  },
  {
    title: "Printer Services",
    description: "From cartridge refilling to repairing dot-matrix, inkjet, and laser printers, our expert team ensures your printers are always business-ready.",
    icon: "🖨️",
    features: ["Cartridge Refilling", "Multi-Type Repair", "Expert Technicians", "Business-Ready"],
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "Custom Gaming PCs",
    description: "Why settle for average? We design and build high-performance gaming PCs tailored to your needs, with optimized speed and power for the ultimate experience.",
    icon: "🎮",
    features: ["High-Performance", "Tailored Builds", "Optimized Speed", "Premium Components"],
    color: "from-blue-500 to-indigo-500"
  },
  {
    title: "Annual Maintenance Contracts (AMC)",
    description: "Worry-free IT support with flexible AMC packages covering laptops, PCs, and printers – ensuring your business never faces downtime.",
    icon: "📄",
    features: ["Worry-Free Support", "Flexible Packages", "Preventive Care", "Minimize Downtime"],
    color: "from-indigo-500 to-purple-500"
  }
];

const differentiators: Differentiator[] = [
  {
    title: "Certified & Experienced Technicians",
    description: "Our team is professionally trained and has years of hands-on experience diagnosing and resolving all types of hardware issues."
  },
  {
    title: "Genuine Parts & Components",
    description: "We use only high-quality, authentic parts for all repairs and builds to ensure reliability and peak performance."
  },
  {
    title: "Fast Turnaround Time",
    description: "We understand the importance of your devices. Our efficient process ensures your hardware is back in your hands as quickly as possible."
  },
  {
    title: "On-Site & Remote Support",
    description: "We offer flexible support options, including on-site visits and remote assistance, to resolve your issues with minimal disruption."
  }
];

// --- REUSABLE ANIMATION COMPONENT ---
const AnimateOnScroll = ({ children, delay = 0 }: { children: ReactNode, delay?: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- SUB-COMPONENTS ---

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { setIsVisible(true); }, []);

  const stats = [
    { value: "Expert", label: "Technicians" },
    { value: "Quick", label: "Turnaround" },
    { value: "Major", label: "Brands" },
    { value: "AMC", label: "Support" },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl animate-pulse -z-10" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-[#0553aa] to-blue-800 bg-clip-text text-transparent">
            IT Hardware Services
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Reliable sales, service, and support for your essential business and personal technology.
          </p>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold" style={{ color: PRIMARY_BLUE }}>{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }: { service: Service }) => (
  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-[#0553aa] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
    <div className="flex items-center mb-5">
      <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-3xl text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
        {service.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 ml-4">{service.title}</h3>
    </div>
    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{service.description}</p>
    <div className="flex flex-wrap gap-2">
      {service.features.map((feature, idx) => (
        <span key={idx} className="bg-blue-50 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-full">
          {feature}
        </span>
      ))}
    </div>
  </div>
);

const DifferentiatorCard = ({ item }: { item: Differentiator }) => (
  <div className="bg-slate-50/70 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#0553aa]">
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 text-[#0553aa] flex items-center justify-center">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
      </div>
    </div>
  </div>
);

const CTASection = () => (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-2xl p-8 sm:p-12 border border-[#0553aa]/20 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Need a Repair or an Upgrade?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Whether it's an urgent repair, a performance upgrade, or a brand new custom PC, our experts are ready to help. Contact us for a free assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 text-base bg-[#0553aa] hover:bg-blue-700 hover:scale-105 active:scale-95"
            >
              Request a Service
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a
              href="tel:+919942733444"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-gray-700 border-2 border-gray-200 hover:border-[#0553aa] hover:text-[#0553aa] transition-all duration-300 bg-white/80 backdrop-blur-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call Us Directly
            </a>
          </div>
        </div>
      </div>
    </section>
  );

// --- MAIN PAGE COMPONENT ---
export default function HardwarePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">Our Hardware Expertise</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive solutions to keep your IT infrastructure running at peak performance.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <AnimateOnScroll key={index} delay={index * 100}>
                <ServiceCard service={service} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">The Advantage of Our Service</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We are committed to providing a transparent, efficient, and high-quality service experience.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiators.map((item, index) => (
              <AnimateOnScroll key={index} delay={index * 100}>
                <DifferentiatorCard item={item} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <AnimateOnScroll>
        <CTASection />
      </AnimateOnScroll>
    </div>
  );
}