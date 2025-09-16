"use client";
import React, { useState, useEffect } from "react";

// Define the primary color for consistency
const PRIMARY_BLUE = "#0553aa";

export default function DigitalPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation on component mount
    setIsVisible(true);
  }, []);

  // Data for the main services offered
  const services = [
    {
      title: "SEO (Search Engine Optimization)",
      description: "Improve your organic search rankings and attract qualified traffic. Our SEO services include technical optimization, content strategy, and link building.",
      icon: "🔍",
      features: ["Technical SEO", "Content Optimization", "Link Building", "Local SEO"],
      color: "from-green-500 to-teal-500"
    },
    {
      title: "SEM (Search Engine Marketing)",
      description: "Boost your online visibility with targeted paid advertising campaigns. We create and manage SEM strategies that drive traffic, leads, and sales.",
      icon: "📈",
      features: ["PPC Campaigns", "Keyword Research", "Ad Copy Creation", "Performance Analytics"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "SMM (Social Media Marketing)",
      description: "Engage your audience and build brand loyalty with strategic social media campaigns. We manage your presence across all major platforms.",
      icon: "📱",
      features: ["Content Creation", "Community Management", "Paid Social Ads", "Analytics & Reporting"],
      color: "from-pink-500 to-rose-500"
    }
  ];

  // Data for the development process
  const processSteps = [
    {
      title: "Discovery & Strategy",
      description: "We start by understanding your vision, goals, and target audience to create a strategic plan.",
      icon: "🔍",
    },
    {
      title: "Campaign Planning",
      description: "Our team designs tailored campaigns with compelling messaging and targeting strategies.",
      icon: "📋",
    },
    {
      title: "Execution & Optimization",
      description: "We implement campaigns across channels and continuously optimize for maximum performance.",
      icon: "⚙️",
    },
    {
      title: "Reporting & Analysis",
      description: "We provide detailed reports and insights to measure success and guide future strategies.",
      icon: "📊",
    }
  ];
  
    // Data for the "Why Choose Us" section
  const differentiators = [
    {
      title: "Data-Driven Strategies",
      description: "We base all our marketing decisions on comprehensive data analysis and industry insights."
    },
    {
      title: "Custom-Tailored Campaigns",
      description: "We don't use one-size-fits-all approaches. Every campaign is uniquely crafted to meet your specific business goals."
    },
    {
      title: "Multi-Channel Expertise",
      description: "Our team has deep expertise across all digital marketing channels to create integrated strategies."
    },
    {
      title: "Transparent Reporting",
      description: "You'll always know how your campaigns are performing with our detailed, easy-to-understand reports."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-16 w-40 h-40 border border-[#0553aa] rounded-3xl animate-spin" style={{ animationDuration: '25s' }}></div>
          <div className="absolute bottom-32 right-20 w-32 h-32 border-2 border-[#0553aa] rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 border border-[#0553aa] rounded-2xl rotate-12 animate-bounce"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative inline-block mb-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-gray-900 via-[#0553aa] to-[#0553aa] bg-clip-text text-transparent leading-tight">
                Digital Marketing Solutions
              </h1>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-gradient-to-r from-[#0553aa] to-[#0553aa] opacity-20 blur-sm rounded-full"></div>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Strategic SEO, SEM & SMM Services That Drive Growth and Maximize ROI
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[#0553aa]">SEO</div>
                <div className="text-sm text-gray-600">Optimization</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0553aa]">SEM</div>
                <div className="text-sm text-gray-600">Campaigns</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0553aa]">SMM</div>
                <div className="text-sm text-gray-600">Strategies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0553aa]">Data</div>
                <div className="text-sm text-gray-600">Driven</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0553aa]">Results</div>
                <div className="text-sm text-gray-600">Focused</div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Gradient Blurs */}
        <div className="absolute top-40 left-20 w-80 h-80 bg-gradient-to-r from-[#0553aa] to-[#0553aa] opacity-20 rounded-full blur-3xl animate-pulse z-0" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-[#0553aa] to-[#0553aa] opacity-25 rounded-full blur-3xl animate-pulse z-0" style={{ animationDelay: '2s' }} />
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-gradient-to-r from-sky-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Marketing Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital marketing solutions designed to elevate your brand and drive business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#0553aa] hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mr-2`}></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Marketing Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology to deliver measurable results for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-[#0553aa] overflow-hidden group"
              >
                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 border-3 border-[#0553aa] rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-r from-sky-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Why Partner With Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver more than just services; we provide measurable growth for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {differentiators.map((item, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#0553aa] hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">✅</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-3xl p-12 border-2 border-[#0553aa] shadow-lg">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Let's discuss how our digital marketing strategies can help you achieve your business objectives. 
              Contact us today for a free, no-obligation consultation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/Contact"
                className="group relative inline-flex items-center px-10 py-5 rounded-2xl font-bold text-white shadow-2xl border-2 border-[#0553aa] transition-all duration-300 text-lg md:text-xl bg-gradient-to-r from-[#0553aa] to-[#0553aa] hover:from-[#0553aa] hover:to-[#0553aa] hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">Get a Free Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </a>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}