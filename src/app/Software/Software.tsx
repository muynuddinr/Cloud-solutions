"use client";
import React, { useState, useEffect } from "react";

// Define the primary color for consistency
const PRIMARY_BLUE = "#0553aa";

export default function SoftwareDevelopmentPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation on component mount
    setIsVisible(true);
  }, []);

  // Data for the main services offered
  const services = [
    {
      title: "Custom Software Development",
      description: "Tailored software solutions designed to meet your unique business requirements and drive operational efficiency.",
      icon: "⚙️",
      features: ["Bespoke Solutions", "Scalable Architecture", "Integration Capabilities", "Ongoing Support"],
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Web Application Development",
      description: "Modern, responsive web applications that deliver exceptional user experiences across all devices and platforms.",
      icon: "🌐",
      features: ["Responsive Design", "Cross-Platform", "Performance Optimized", "Secure Architecture"],
      color: "from-sky-500 to-cyan-500"
    },
    {
      title: "Mobile Application Development",
      description: "Native and cross-platform mobile apps that engage users and provide seamless experiences on iOS and Android.",
      icon: "📱",
      features: ["iOS & Android", "Cross-Platform", "UI/UX Excellence", "App Store Optimization"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Enterprise Software Solutions",
      description: "Robust, scalable enterprise applications that streamline complex business processes and drive digital transformation.",
      icon: "🏢",
      features: ["Process Automation", "Data Integration", "Security Compliance", "Scalable Infrastructure"],
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Software Maintenance & Support",
      description: "Comprehensive maintenance and support services to ensure your software remains secure, updated, and performing optimally.",
      icon: "🔧",
      features: ["24/7 Support", "Regular Updates", "Performance Monitoring", "Security Audits"],
      color: "from-amber-500 to-orange-500"
    }
  ];

  // Data for the development process
  const processSteps = [
    {
      title: "Discovery & Planning",
      description: "We analyze your requirements, define objectives, and create a detailed project roadmap.",
      icon: "🔍",
    },
    {
      title: "Design & Architecture",
      description: "Our team designs intuitive interfaces and robust system architecture for optimal performance.",
      icon: "🎨",
    },
    {
      title: "Development & Testing",
      description: "We build your solution using modern technologies and conduct rigorous testing for quality assurance.",
      icon: "💻",
    },
    {
      title: "Deployment & Support",
      description: "We handle the deployment and provide ongoing support to ensure your software thrives.",
      icon: "🚀",
    }
  ];
  
  // Data for the "Why Choose Us" section
  const differentiators = [
    {
      title: "Expert Development Team",
      description: "Our developers have deep expertise across multiple technologies and industries, ensuring top-quality solutions."
    },
    {
      title: "Agile Development Process",
      description: "We use agile methodologies to deliver projects efficiently with flexibility and transparency throughout the process."
    },
    {
      title: "Focus on Scalability",
      description: "We build software that grows with your business, designed to handle increased users and functionality over time."
    },
    {
      title: "Security-First Approach",
      description: "Security is integrated into every phase of development to protect your data and ensure compliance."
    }
  ];

  // Data for technologies we use
  const technologies = [
    { name: "Frontend", items: ["React", "Angular", "Vue.js", "Next.js"] },
    { name: "Backend", items: ["Node.js", "Python", "Java", ".NET", "PHP"] },
    { name: "Mobile", items: ["React Native", "Flutter", "Swift", "Kotlin"] },
    { name: "Database", items: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"] },
    { name: "Cloud", items: ["AWS", "Azure", "Google Cloud", "DigitalOcean"] },
    { name: "DevOps", items: ["Docker", "Kubernetes", "CI/CD", "Jenkins"] }
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
                Software Development
              </h1>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-gradient-to-r from-[#0553aa] to-[#0553aa] opacity-20 blur-sm rounded-full"></div>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Custom Software Solutions Built to Drive Your Business Forward
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[#0553aa]">Custom</div>
                <div className="text-sm text-gray-600">Solutions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0553aa]">Scalable</div>
                <div className="text-sm text-gray-600">Architecture</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0553aa]">Modern</div>
                <div className="text-sm text-gray-600">Technologies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0553aa]">Agile</div>
                <div className="text-sm text-gray-600">Process</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0553aa]">Secure</div>
                <div className="text-sm text-gray-600">Development</div>
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
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Development Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive software development solutions tailored to your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Technologies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Technologies We Use</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We leverage cutting-edge technologies to build robust, scalable software solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#0553aa] hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{tech.name}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {tech.items.map((item, itemIndex) => (
                    <span key={itemIndex} className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 bg-gradient-to-r from-sky-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Development Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology to deliver high-quality software solutions on time and within budget.
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Why Partner With Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver more than just code; we provide comprehensive software solutions that drive business growth.
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
      <section className="py-20 bg-gradient-to-r from-sky-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 border-2 border-[#0553aa] shadow-lg">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
              Ready to Build Your Software Solution?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Let's discuss your project requirements and how we can help you achieve your business objectives. 
              Contact us today for a free, no-obligation consultation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="Contact"
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