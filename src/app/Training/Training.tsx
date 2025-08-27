"use client";
import React, { useState, useEffect } from "react";

const trainingPrograms = [
  {
    id: 1,
    title: "Cloud Infrastructure Training",
    description: "Master cloud computing fundamentals, AWS, Azure, and Google Cloud Platform. Learn to design, deploy, and manage scalable cloud solutions.",
    duration: "8 weeks",
    level: "Intermediate",
    icon: "☁️",
    features: [
      "Cloud Architecture Design",
      "AWS/Azure/GCP Certification",
      "Security Best Practices",
      "Cost Optimization",
      "Hands-on Projects",
      "24/7 Support"
    ],
    accentColor: "sky",
    category: "Cloud Computing"
  },
  {
    id: 2,
    title: "IT Support & Troubleshooting",
    description: "Comprehensive training in IT support, network troubleshooting, and system administration. Perfect for IT professionals and beginners.",
    duration: "6 weeks",
    level: "Beginner",
    icon: "🔧",
    features: [
      "Network Troubleshooting",
      "System Administration",
      "Hardware Maintenance",
      "Software Installation",
      "Customer Service Skills",
      "Certification Prep"
    ],
    accentColor: "cyan",
    category: "IT Support"
  },
  {
    id: 3,
    title: "Cybersecurity Fundamentals",
    description: "Learn essential cybersecurity concepts, threat detection, and security best practices. Protect your organization from cyber threats.",
    duration: "10 weeks",
    level: "Advanced",
    icon: "🛡️",
    features: [
      "Threat Detection",
      "Security Protocols",
      "Incident Response",
      "Compliance Standards",
      "Penetration Testing",
      "Security Auditing"
    ],
    accentColor: "blue",
    category: "Cybersecurity"
  },
  {
    id: 4,
    title: "Software Development",
    description: "Modern software development training covering full-stack development, DevOps, and agile methodologies.",
    duration: "12 weeks",
    level: "Intermediate",
    icon: "💻",
    features: [
      "Full-Stack Development",
      "DevOps Practices",
      "Agile Methodologies",
      "Version Control",
      "Testing Strategies",
      "Deployment Pipeline"
    ],
    accentColor: "indigo",
    category: "Software Development"
  },
  {
    id: 5,
    title: "Data Analytics & Business Intelligence",
    description: "Master data analysis, visualization, and business intelligence tools. Transform data into actionable insights.",
    duration: "8 weeks",
    level: "Intermediate",
    icon: "📊",
    features: [
      "Data Analysis",
      "Business Intelligence",
      "Data Visualization",
      "Statistical Analysis",
      "Machine Learning Basics",
      "Reporting Tools"
    ],
    accentColor: "purple",
    category: "Data Analytics"
  },
  {
    id: 6,
    title: "Digital Marketing & SEO",
    description: "Comprehensive digital marketing training including SEO, social media, content marketing, and analytics.",
    duration: "6 weeks",
    level: "Beginner",
    icon: "📈",
    features: [
      "SEO Optimization",
      "Social Media Marketing",
      "Content Strategy",
      "Google Analytics",
      "Email Marketing",
      "Conversion Optimization"
    ],
    accentColor: "pink",
    category: "Digital Marketing"
  }
];

const instructors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    position: "Senior Cloud Architect",
    expertise: "AWS, Azure, GCP",
    experience: "8+ years",
    image: "👩‍💼",
    rating: 4.9,
    students: "500+"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    position: "Cybersecurity Expert",
    expertise: "Security, Compliance, Penetration Testing",
    experience: "12+ years",
    image: "👨‍💻",
    rating: 4.8,
    students: "300+"
  },
  {
    id: 3,
    name: "Emily Johnson",
    position: "Full-Stack Developer",
    expertise: "React, Node.js, Python",
    experience: "6+ years",
    image: "👩‍🔬",
    rating: 4.9,
    students: "400+"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    position: "IT Manager",
    company: "TechCorp Solutions",
    text: "The cloud infrastructure training was exceptional! I learned practical skills that I use daily. The instructors are industry experts.",
    rating: 5,
    program: "Cloud Infrastructure Training"
  },
  {
    id: 2,
    name: "Maria Garcia",
    position: "Software Developer",
    company: "InnovateTech",
    text: "The software development course transformed my career. I went from a junior developer to a senior position within 6 months.",
    rating: 5,
    program: "Software Development"
  },
  {
    id: 3,
    name: "David Kim",
    position: "Security Analyst",
    company: "SecureNet Inc.",
    text: "Outstanding cybersecurity training! The hands-on labs and real-world scenarios prepared me perfectly for my current role.",
    rating: 5,
    program: "Cybersecurity Fundamentals"
  }
];

export default function Training() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const categories = ["All", "Cloud Computing", "IT Support", "Cybersecurity", "Software Development", "Data Analytics", "Digital Marketing"];

  const filteredPrograms = activeCategory === "All" 
    ? trainingPrograms 
    : trainingPrograms.filter(program => program.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-gray-900 leading-tight">
              Professional
              <br />
              <span className="text-blue-600">
                Training Programs
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your career with our industry-leading training programs. 
              <br className="hidden md:inline" />
              <span className="font-semibold text-gray-800 bg-blue-50 px-3 py-1 rounded-lg">
                Expert-led courses designed for real-world success.
              </span>
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Training Programs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2000+</div>
                <div className="text-sm text-gray-600">Graduates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  hoveredCard === program.id ? 'scale-102' : ''
                }`}
                onMouseEnter={() => setHoveredCard(program.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-6">
                    {program.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{program.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {program.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Duration: <span className="font-semibold text-gray-900">{program.duration}</span></span>
                      <span className="text-sm text-gray-500">Level: <span className="font-semibold text-gray-900">{program.level}</span></span>
                    </div>
                  </div>

                  {/* Additional Features */}
                  <div className="mt-6">
                    <ul className="space-y-2">
                      {program.features.slice(4, 6).map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Expert <span className="text-blue-600">Instructors</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn from industry professionals with years of experience and proven track records
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                    {instructor.image}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{instructor.position}</p>
                  <p className="text-gray-600 mb-4">{instructor.expertise}</p>
                  
                  <div className="flex justify-center items-center space-x-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{instructor.experience}</div>
                      <div className="text-sm text-gray-600">Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{instructor.rating}</div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{instructor.students}</div>
                      <div className="text-sm text-gray-600">Students</div>
                    </div>
                  </div>

                  <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="text-blue-600">Students Say</span>
            </h2>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-200 transition-all duration-500 ${
                    index === activeTestimonial ? 'scale-105 shadow-xl border-blue-300' : 'opacity-75'
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                      <p className="text-sm text-blue-600">{testimonial.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{testimonial.program}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-blue-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already taken the next step in their careers with our training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300">
              Browse All Courses
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}