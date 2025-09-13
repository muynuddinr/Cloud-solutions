"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { useInView } from "react-intersection-observer";

// --- TYPE DEFINITIONS (for better code quality) ---
interface Application {
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
}

interface Benefit {
  title: string;
  description: string;
}

// --- DATA (moved for clarity) ---
const PRIMARY_BLUE = "#0553aa";

const applications: Application[] = [
  // ... (Your applications data remains the same)
  {
      title: "Educational Management System (EMS)",
      description: "Simplify school and college operations with a single platform for admissions, attendance, grading, communication, and administration.",
      icon: "🎓",
      features: ["Admissions & Enrollment", "Attendance Tracking", "Grading & Reports", "Parent-Teacher Communication"],
      color: "from-sky-500 to-cyan-500"
    },
    {
      title: "Service Management Application (SMA)",
      description: "Streamline IT & business operations with ticketing, service request tracking, and workflow automation. Perfect for service-driven industries.",
      icon: "🔧",
      features: ["Help Desk & Ticketing", "Service Request Portal", "Workflow Automation", "Asset Management"],
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Medical Management Application (MMA)",
      description: "Manage clinics and hospitals with ease – from patient records and appointments to billing, inventory, and compliance.",
      icon: "🏥",
      features: ["Patient Records (EHR)", "Appointment Scheduling", "Medical Billing", "Inventory & Pharmacy"],
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Queue Management System (QMS)",
      description: "Say goodbye to long waiting lines. Our digital queue system optimizes customer flow, reduces wait times, and improves overall experience.",
      icon: "👥",
      features: ["Digital Check-in", "Real-time Wait Info", "Customer Flow Analytics", "Service Prioritization"],
      color: "from-indigo-500 to-purple-500"
    }
];

const coreBenefits: Benefit[] = [
    // ... (Your coreBenefits data remains the same)
    {
      title: "Increase Operational Efficiency",
      description: "Automate manual tasks, reduce paperwork, and streamline complex workflows to save time and resources."
    },
    {
      title: "Enhance User Experience",
      description: "Provide students, patients, customers, and staff with intuitive, easy-to-use digital tools that simplify their interactions."
    },
    {
      title: "Gain Data-Driven Insights",
      description: "Leverage powerful analytics and reporting to make informed decisions and continuously improve your services."
    },
    {
      title: "Ensure Scalability & Security",
      description: "Our applications are built on a robust architecture that grows with your organization and keeps your data secure."
    }
];


// --- REUSABLE ANIMATION COMPONENT ---
const AnimateOnScroll = ({ children, delay = 0 }: { children: ReactNode, delay?: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animate only once
    threshold: 0.1,    // Trigger when 10% of the element is visible
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


// --- SUB-COMPONENTS (for a cleaner structure) ---

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { setIsVisible(true); }, []);

  const stats = [
    { label: "Specific", value: "Industry" },
    { label: "Integrated", value: "Fully" },
    { label: "Compliant", value: "Secure" },
    { label: "Solutions", value: "Scalable" },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="absolute top-40 left-20 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl animate-pulse -z-10" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-[#0553aa] to-blue-800 bg-clip-text text-transparent">
            Business Applications
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Intelligent, purpose-built software solutions to streamline your industry-specific operations.
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

const ApplicationCard = ({ app }: { app: Application }) => (
  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-[#0553aa] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
    <div className="flex items-center mb-5">
      <div className={`w-14 h-14 bg-gradient-to-br ${app.color} rounded-xl flex items-center justify-center text-3xl text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
        {app.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 ml-4">{app.title}</h3>
    </div>
    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{app.description}</p>
    <div className="flex flex-wrap gap-2">
      {app.features.map((feature, idx) => (
        <span key={idx} className="bg-blue-50 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-full">
          {feature}
        </span>
      ))}
    </div>
  </div>
);

const BenefitCard = ({ item }: { item: Benefit }) => (
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
      <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-2xl p-8 sm:p-12 border border-[#0553aa]/20 shadow-lg relative overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Ready to Modernize Your Operations?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Discover how our business applications can be customized to fit your exact needs. Schedule a personalized demo today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 text-base bg-[#0553aa] hover:bg-blue-700 hover:scale-105 active:scale-95"
          >
            Schedule a Free Demo
            <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <a
            href="tel:+1-555-0123"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-gray-700 border-2 border-gray-200 hover:border-[#0553aa] hover:text-[#0553aa] transition-all duration-300 bg-white/80 backdrop-blur-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            Speak to an Expert
          </a>
        </div>
      </div>
    </div>
  </section>
);


// --- MAIN PAGE COMPONENT ---
export default function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">Our Suite of Applications</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Tailored software designed to solve the unique challenges of your industry.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <AnimateOnScroll key={index} delay={index * 100}>
                <ApplicationCard app={app} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">Transform Your Organization</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our applications deliver tangible benefits that drive growth and improve performance.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreBenefits.map((item, index) => (
              <AnimateOnScroll key={index} delay={index * 100}>
                <BenefitCard item={item} />
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