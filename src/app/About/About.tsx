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
      name: "Suganiya N",
      role: "CEO & Co-Founder",
      image: "👑",
      bio: "20+ years of experience in IT leadership and business strategy. Visionary leader driving company growth and innovation.",
      expertise: ["Business Strategy", "Leadership", "IT Consulting"],
      color: "from-[#0553aa] to-[#0553aa]"
    },
    {
      name: "Bhuvaneswari N",
      role: "CTO & Co-Founder",
      image: "👩‍💻",
      bio: "Technology expert with extensive experience in cloud infrastructure and system architecture.",
      expertise: ["Cloud Computing", "System Architecture", "Technical Innovation"],
      color: "from-[#0553aa] to-[#0553aa]"
    },
    {
      name: "Sudha GM",
      role: "CIO & Co-Founder",
      image: "👩‍💼",
      bio: "Information management specialist with expertise in digital transformation and IT governance.",
      expertise: ["IT Management", "Digital Transformation", "Governance"],
      color: "from-[#0553aa] to-[#0553aa]"
    },
    {
      name: "Selvaraj T",
      role: "VP Sales & Service",
      image: "👨‍💼",
      bio: "Sales and service expert with a proven track record in building client relationships and driving revenue growth.",
      expertise: ["Sales Strategy", "Client Relations", "Service Management"],
      color: "from-[#0553aa] to-[#0553aa]"
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
    { year: "2012", event: "Company Founded", description: "Started with a vision to simplify IT for businesses through cloud solutions" },
    { year: "2015", event: "First 50 Clients", description: "Built trust through exceptional service and support" },
    { year: "2018", event: "Service Expansion", description: "Added comprehensive cloud solutions and 24/7 support" },
    { year: "2020", event: "Global Pandemic Response", description: "Helped businesses adapt to remote work with our cloud solutions" },
    { year: "2022", event: "10 Year Anniversary", description: "Celebrated a decade of serving businesses with IT solutions" },
    { year: "2024", event: "500+ Happy Clients", description: "Growing community of satisfied business partners" }
  ];

  const services = [
    {
      title: "Cloud Services & IT Infrastructure",
      description: "Cloud Migration & Infrastructure Setup: Transition businesses to secure, scalable cloud environments with minimal downtime. Managed IT Services: Comprehensive IT support, maintenance, and monitoring tailored to your business needs.",
      icon: "☁️",
      features: ["Cloud Migration", "Managed IT Services", "Cybersecurity Solutions", "Server Solutions"],
      color: "from-sky-500 to-cyan-500"
    },
    {
      title: "Technology Products",
      description: "Business-Class Laptops & PCs: Provisioning of reliable and secure computing devices. Custom Gaming PCs: High-performance, custom-built systems for gaming enthusiasts and power users.",
      icon: "💻",
      features: ["Business Laptops & PCs", "Custom Gaming PCs", "Enterprise Servers", "Hardware Solutions"],
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Business Applications",
      description: "We develop and deliver intelligent, purpose-built software applications to streamline operations and improve decision-making.",
      icon: "📱",
      features: ["Educational Management", "Service Management", "Medical Management", "Queue Management"],
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "IT Consulting & Support",
      description: "Strategic IT planning and implementation. We assess your needs and design solutions that grow with your business.",
      icon: "🔧",
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
          <div className="absolute top-20 left-16 w-40 h-40 border border-[#0553aa] rounded-3xl animate-spin" style={{ animationDuration: '25s' }}></div>
          <div className="absolute bottom-32 right-20 w-32 h-32 border-2 border-[#0553aa] rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 border border-[#0553aa] rounded-2xl rotate-12 animate-bounce"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative inline-block mb-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-gray-900 via-[#0553aa] to-[#0553aa] bg-clip-text text-transparent leading-tight">
                About Cloud IT solution
              </h1>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-gradient-to-r from-[#0553aa] to-[#0553aa] opacity-20 blur-sm rounded-full"></div>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Empowering Businesses Through Innovation Since 2012
            </p>

            <div className="flex justify-center space-x-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[#0553aa]">2012</div>
                <div className="text-sm text-gray-600">Founded</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0553aa]">500+</div>
                <div className="text-sm text-gray-600">Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0553aa]">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0553aa]">10+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-40 left-20 w-80 h-80 bg-gradient-to-r from-[#0553aa] to-[#0553aa] opacity-20 rounded-full blur-3xl animate-pulse z-0" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-[#0553aa] to-[#0553aa] opacity-25 rounded-full blur-3xl animate-pulse z-0" style={{ animationDelay: '2s' }} />
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-r from-sky-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Story</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#0553aa] to-[#0553aa] mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  From Vision to Reality
                </h3>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    Cloud IT Solution is a trusted provider of cloud-based IT services, business applications, 
                    and technology infrastructure solutions. Since our inception in 2012, we have been dedicated 
                    to helping businesses embrace digital transformation by delivering scalable, secure, and 
                    customized technology solutions.
                  </p>
                  <p>
                    Over the past decade, we have evolved from a forward-thinking startup into a full-service 
                    IT partner for organizations across sectors such as education, healthcare, retail, 
                    manufacturing, and public services. Our focus has always remained on quality, innovation, 
                    and client success.
                  </p>
                  <p>
                    Today, we're proud to serve over 500 businesses across the region, providing everything
                    from cutting-edge cloud solutions to 24/7 technical support. We're not just a vendor – 
                    we're your technology partner, committed to your success.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#0553aa] relative overflow-hidden">
                  <div className="text-center">
                    <div className="text-8xl mb-6">🚀</div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h4>
                    <p className="text-gray-600 leading-relaxed">
                      To simplify and strengthen businesses through modern IT infrastructure, cloud computing, 
                      and intelligent software solutions that optimize performance and create long-term value.
                    </p>
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 border-4 border-[#0553aa] rounded-full opacity-30 animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-10 h-10 border-3 border-[#0553aa] rounded-lg rotate-45 opacity-20 animate-bounce"></div>
                </div>
                
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#0553aa] relative overflow-hidden mt-8">
                  <div className="text-center">
                    <div className="text-8xl mb-6">🌎</div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h4>
                    <p className="text-gray-600 leading-relaxed">
                      To be a globally recognized leader in IT services and cloud solutions, enabling organizations 
                      to innovate, transform, and excel in the digital age.
                    </p>
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 border-4 border-[#0553aa] rounded-full opacity-30 animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-10 h-10 border-3 border-[#0553aa] rounded-lg rotate-45 opacity-20 animate-bounce"></div>
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
                  activeValue === index ? 'border-[#0553aa] scale-105' : 'border-gray-100 hover:border-[#0553aa]'
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

                <div className="absolute -top-3 -right-3 w-8 h-8 border-3 border-[#0553aa] rounded-full opacity-30 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-r from-sky-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Why Choose Cloud IT Solution?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We stand out from the competition with our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#0553aa] hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">✅</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Over a Decade of Experience</h3>
                  <p className="text-gray-600">Serving businesses with dependable IT expertise since 2012.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#0553aa] hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">✅</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Client-Centered Solutions</h3>
                  <p className="text-gray-600">We customize our approach to align with your goals and challenges.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#0553aa] hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">✅</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Skilled & Certified Team</h3>
                  <p className="text-gray-600">A team of experienced engineers, developers, and IT consultants.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#0553aa] hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">✅</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Products & Services</h3>
                  <p className="text-gray-600">End-to-end hardware, software, and support from a single trusted partner.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#0553aa] hover:shadow-xl transition-all duration-300 md:col-span-2">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">✅</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
                  <p className="text-gray-600">Dedicated technical assistance to ensure business continuity and reliability.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
<section id="team" className="py-20 bg-white"> {/* Added id="team" here */}
  <div className="max-w-7xl mx-auto px-4 md:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Meet Our Team</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        The passionate professionals behind Cloud IT Solution
      </p>
    </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#0553aa] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-5 transition-all duration-300`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#0553aa] to-[#0553aa] rounded-full flex items-center justify-center text-4xl mx-auto mb-4 border-4 border-white shadow-lg">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-[#0553aa] font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                  
                  <div className="space-y-1">
                    {member.expertise.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex} 
                        className="inline-block bg-[rgba(5,83,170,0.1)] text-[#0553aa] text-xs px-3 py-1 rounded-full mr-1 mb-1"
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
      <section className="py-20 bg-gradient-to-r from-sky-50 to-cyan-50">
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
                className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#0553aa] hover:shadow-xl transition-all duration-300 group"
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

      {/* Business Applications Detail Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Business Applications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Intelligent, purpose-built software solutions for various industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-3xl p-8 border-2 border-[#0553aa]">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Educational Management System (EMS)</h3>
              <p className="text-gray-600 mb-4">
                A comprehensive platform for managing admissions, attendance, grading, communication, 
                and administration in schools, colleges, and universities.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[rgba(5,83,170,0.1)] text-[#0553aa] text-xs px-3 py-1 rounded-full">Admissions</span>
                <span className="bg-[rgba(5,83,170,0.1)] text-[#0553aa] text-xs px-3 py-1 rounded-full">Attendance</span>
                <span className="bg-[rgba(5,83,170,0.1)] text-[#0553aa] text-xs px-3 py-1 rounded-full">Grading</span>
                <span className="bg-[rgba(5,83,170,0.1)] text-[#0553aa] text-xs px-3 py-1 rounded-full">Communication</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-3xl p-8 border-2 border-[#0553aa]">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Service Management Application (SMA)</h3>
              <p className="text-gray-600 mb-4">
                A powerful tool for managing service requests, ticketing, customer support, 
                and workflow automation across various industries.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[rgba(5,83,170,0.1)] text-[#0553aa] text-xs px-3 py-1 rounded-full">Service Requests</span>
                <span className="bg-[rgba(5,83,170,0.1)] text-[#0553aa] text-xs px-3 py-1 rounded-full">Ticketing</span>
                <span className="bg-[rgba(5,83,170,0.1)] text-[#0553aa] text-xs px-3 py-1 rounded-full">Customer Support</span>
                <span className="bg-[rgba(5,83,170,0.1)] text-[#0553aa] text-xs px-3 py-1 rounded-full">Workflow Automation</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-3xl p-8 border-2 border-[#0553aa]">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Medical Management Application (MMA)</h3>
              <p className="text-gray-600 mb-4">
                Designed for clinics and hospitals, this application handles patient records, 
                appointments, billing, inventory, and compliance efficiently.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[rgba(5,83,170,0.1)] text-[#0553aa] text-xs px-3 py-1 rounded-full">Patient Records</span>
                <span className="bg-[rgba(5,83,170,0.1)] text-[#0553aa] text-xs px-3 py-1 rounded-full">Appointments</span>
                <span className="bg-[rgba(5,83,170,0.1)] text-[#0553aa] text-xs px-3 py-1 rounded-full">Billing</span>
                <span className="bg-[rgba(5,83,170,0.1)] text-[#0553aa] text-xs px-3 py-1 rounded-full">Inventory</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-3xl p-8 border-2 border-[#0553aa]">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Queue Management System (QMS)</h3>
              <p className="text-gray-600 mb-4">
                An advanced digital solution to organize, monitor, and optimize customer flow 
                in service areas, improving waiting times and customer experience.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[rgba(5,83,170,0.1)] text-[#0553aa] text-xs px-3 py-1 rounded-full">Customer Flow</span>
                <span className="bg-[rgba(5,83,170,0.1)] text-[#0553aa] text-xs px-3 py-1 rounded-full">Monitoring</span>
                <span className="bg-[rgba(5,83,170,0.1)] text-[#0553aa] text-xs px-3 py-1 rounded-full">Optimization</span>
                <span className="bg-[rgba(5,83,170,0.1)] text-[#0553aa] text-xs px-3 py-1 rounded-full">Digital Solution</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-r from-sky-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our company's growth and success since 2012.
            </p>
          </div>

          {/* Horizontal timeline on desktop, stacked cards on mobile */}
          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#0553aa] to-[#0553aa] rounded-full"></div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  {/* Dot & year (desktop) */}
                  <div className="hidden md:block absolute -top-5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0553aa] rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="hidden md:block absolute -top-14 left-1/2 -translate-x-1/2 text-sm font-bold text-[#0553aa]">
                    {milestone.year}
                  </div>

                  {/* Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#0553aa] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    {/* Mobile year label */}
                    <div className="md:hidden text-[#0553aa] font-bold mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.event}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-3xl p-12 border-2 border-[#0553aa] shadow-lg">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
              Ready to Transform Your IT Experience?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Since 2012, Cloud IT Solution has empowered hundreds of organizations to build smarter infrastructures, 
              operate more efficiently, and serve their customers better. Let's build the future together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="Contact"
                className="group relative inline-flex items-center px-10 py-5 rounded-2xl font-bold text-white shadow-2xl border-2 border-[#0553aa] transition-all duration-300 text-lg md:text-xl bg-gradient-to-r from-[#0553aa] to-[#0553aa] hover:from-[#0553aa] hover:to-[#0553aa] hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">Get Your Free Consultation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </a>
              
              <a
                href="tel:+1-555-0123"
                className="inline-flex items-center px-8 py-4 rounded-2xl font-semibold text-gray-700 border-2 border-gray-300 hover:border-[#0553aa] hover:text-[#0553aa] transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white"
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