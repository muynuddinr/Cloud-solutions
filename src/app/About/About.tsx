"use client";
import React, { useState, useEffect } from "react";

const LIGHT_BLUE = "#0553aa"; // Updated to match the requested color
const CYAN = "#0553aa"; // Updated to match the requested color

export default function AboutUsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeValue, setActiveValue] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-cycle through values
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const teamMembers = [
    {
      name: "Alex Rodriguez",
      role: "CEO & Founder",
      image: "👨‍💼",
      bio: "Former tech consultant with 8+ years experience. Passionate about making technology accessible to small businesses.",
      expertise: ["Business Strategy", "Client Relations", "IT Consulting"],
      color: "from-sky-500 to-cyan-500"
    },
    {
      name: "Sarah Chen",
      role: "CTO & Co-Founder",
      image: "👩‍💻",
      bio: "Hardware specialist and systems architect. Expert in designing scalable IT infrastructure for growing businesses.",
      expertise: ["System Architecture", "Hardware Solutions", "Technical Support"],
      color: "from-cyan-500 to-blue-500"
    },
    {
      name: "Michael Park",
      role: "Lead Technician",
      image: "👨‍🔧",
      bio: "Certified technician with expertise in repairs, maintenance, and installations. Our problem-solving specialist.",
      expertise: ["Hardware Repair", "System Installation", "Troubleshooting"],
      color: "from-blue-500 to-indigo-500"
    },
    {
      name: "Emily Johnson",
      role: "Customer Success Manager",
      image: "👩‍💼",
      bio: "Dedicated to ensuring every client gets the support they need. Your go-to person for all service inquiries.",
      expertise: ["Customer Support", "Training", "Account Management"],
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "We stay ahead of technology trends to provide cutting-edge solutions",
      icon: "💡",
      color: "from-sky-500 to-cyan-500"
    },
    {
      title: "Reliability",
      description: "Dependable service and support you can count on 24/7",
      icon: "🛡️",
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Transparency",
      description: "Honest pricing, clear communication, no hidden surprises",
      icon: "🔍",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Growth",
      description: "We grow with your business, scaling solutions as you expand",
      icon: "📈",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const milestones = [
    { year: "2023", event: "Company Founded", description: "Started with a vision to simplify IT for small businesses" },
    { year: "2023", event: "First 50 Clients", description: "Built trust through exceptional service and support" },
    { year: "2024", event: "Service Expansion", description: "Added comprehensive printer solutions and 24/7 support" },
    { year: "2024", event: "500+ Happy Clients", description: "Growing community of satisfied business partners" }
  ];

  const services = [
    {
      title: "Computer & Laptop Sales",
      description: "Latest models from top brands including Dell, HP, Lenovo, and Apple. We help you find the perfect machine for your needs and budget.",
      icon: "💻",
      features: ["Latest Models", "Competitive Pricing", "Warranty Support", "Custom Configurations"],
      color: "from-sky-500 to-cyan-500"
    },
    {
      title: "Printer Solutions",
      description: "From small office inkjets to industrial laser printers. Complete printing ecosystem with supplies and maintenance included.",
      icon: "🖨️",
      features: ["All Printer Types", "Supply Management", "Maintenance Plans", "Network Setup"],
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Technical Services",
      description: "Comprehensive repair, maintenance, and upgrade services. Our certified technicians handle everything from virus removal to hardware replacement.",
      icon: "🔧",
      features: ["Hardware Repair", "Software Support", "Virus Removal", "System Upgrades"],
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "IT Consulting",
      description: "Strategic IT planning and implementation. We assess your needs and design solutions that grow with your business.",
      icon: "📋",
      features: ["IT Strategy", "System Design", "Implementation", "Training & Support"],
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-16 w-40 h-40 border border-sky-400 rounded-3xl animate-spin" style={{ animationDuration: '25s' }}></div>
          <div className="absolute bottom-32 right-20 w-32 h-32 border-2 border-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 border border-blue-400 rounded-2xl rotate-12 animate-bounce"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative inline-block mb-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-gray-900 via-sky-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
                About TechFlow Solutions
              </h1>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-gradient-to-r from-sky-400 to-cyan-400 opacity-20 blur-sm rounded-full"></div>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              We&apos;re a team of passionate IT professionals dedicated to helping small businesses thrive in the digital age.
            </p>

            <div className="flex justify-center space-x-8 text-center">
              <div>
                <div className="text-3xl font-bold text-sky-600">2024</div>
                <div className="text-sm text-gray-600">Founded</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-600">500+</div>
                <div className="text-sm text-gray-600">Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-40 left-20 w-80 h-80 bg-gradient-to-r from-sky-100 to-cyan-100 opacity-20 rounded-full blur-3xl animate-pulse z-0" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-cyan-100 to-blue-100 opacity-25 rounded-full blur-3xl animate-pulse z-0" style={{ animationDelay: '2s' }} />
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-r from-sky-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Story</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  From Vision to Reality
                </h3>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    TechFlow Solutions was born out of frustration. As business consultants, our founders 
                    Alex and Sarah repeatedly saw small businesses struggling with outdated technology, 
                    unreliable IT support, and confusing tech solutions that didn&apos;t fit their needs.
                  </p>
                  <p>
                    In early 2023, we decided to change that. We started TechFlow Solutions with a simple 
                    mission: make technology work for businesses, not against them. We believe that every 
                    business, regardless of size, deserves access to reliable, modern technology and 
                    exceptional support.
                  </p>
                  <p>
                                Today, we&apos;re proud to serve over 500 businesses across the region, providing everything
            from cutting-edge hardware to 24/7 technical support. We&apos;re not just a vendor – we&apos;re 
                    your technology partner, committed to your success.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-sky-100 relative overflow-hidden">
                  <div className="text-center">
                    <div className="text-8xl mb-6">🚀</div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h4>
                    <p className="text-gray-600 leading-relaxed">
                      To empower businesses with reliable, modern technology solutions that drive 
                      growth, efficiency, and success in today&apos;s digital world.
                    </p>
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 border-4 border-sky-200 rounded-full opacity-30 animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-10 h-10 border-3 border-cyan-200 rounded-lg rotate-45 opacity-20 animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl p-8 shadow-lg border-2 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
                  activeValue === index ? 'border-sky-400 shadow-sky-500/25 scale-105' : 'border-gray-100 hover:border-sky-300'
                } overflow-hidden group`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-5 transition-all duration-300`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>

                <div className="absolute -top-3 -right-3 w-8 h-8 border-3 border-sky-200 rounded-full opacity-30 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-gradient-to-r from-sky-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate professionals behind TechFlow Solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border-2 border-sky-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-5 transition-all duration-300`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-sky-100 to-cyan-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 border-4 border-white shadow-lg">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sky-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                  
                  <div className="space-y-1">
                    {member.expertise.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex} 
                        className="inline-block bg-sky-100 text-sky-700 text-xs px-3 py-1 rounded-full mr-1 mb-1"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive IT solutions designed to power your business forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-sky-300 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
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

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-r from-sky-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our company&apos;s growth and success.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-sky-300 to-cyan-400 rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-sky-100 hover:shadow-xl transition-all duration-300">
                      <div className={`text-2xl font-bold text-transparent bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text mb-2`}>
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.event}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="w-6 h-6 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-3xl p-12 border-2 border-sky-100 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
              Ready to Transform Your IT Experience?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join hundreds of businesses that trust TechFlow Solutions for their technology needs.
              Let&apos;s discuss how we can help your business thrive.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#contact"
                className="group relative inline-flex items-center px-10 py-5 rounded-2xl font-bold text-white shadow-2xl border-2 border-cyan-400 transition-all duration-300 text-lg md:text-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-cyan-500 hover:to-sky-500 hover:scale-105 hover:shadow-cyan-500/25 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">Get Your Free Consultation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </a>
              
              <a
                href="tel:+1-555-0123"
                className="inline-flex items-center px-8 py-4 rounded-2xl font-semibold text-gray-700 border-2 border-gray-300 hover:border-sky-400 hover:text-sky-600 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}