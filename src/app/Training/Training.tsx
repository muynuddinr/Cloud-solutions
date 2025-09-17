"use client";
import React, { useState, useEffect } from "react";
// --- Data Structures for the New Training Page ---
const trainingPrograms = [
  {
    id: "laptop",
    icon: "💻",
    title: "Laptop Training",
    levels: [
      { 
        title: "Beginner Level", 
        topics: [
          "Laptop basics: setup, drivers, and updates",
          "Common troubleshooting: boot, OS crashes, overheating",
          "Essential software & antivirus installation",
        ] 
      },
      { 
        title: "Intermediate Level", 
        topics: [
          "Hardware replacement: RAM, SSD, battery, keyboards",
          "Formatting, OS installation, dual-boot systems",
          "Data backup & recovery methods",
        ] 
      },
      { 
        title: "Advanced Level", 
        topics: [
          "Motherboard-level diagnosis",
          "BIOS configuration & updates",
          "Advanced data recovery & system optimization",
        ] 
      },
    ]
  },
  {
    id: "pc",
    icon: "🖥️",
    title: "PC / Desktop Training",
    levels: [
      { 
        title: "Beginner Level", 
        topics: [
          "PC assembly & configuration basics",
          "Installing OS & drivers",
          "Basic troubleshooting & preventive maintenance",
        ] 
      },
      { 
        title: "Intermediate Level", 
        topics: [
          "Upgrading CPUs, GPUs, and storage devices",
          "Multi-monitor setups for business use",
          "Windows & Linux environment management",
        ] 
      },
      { 
        title: "Advanced Level", 
        topics: [
          "Custom PC building (gaming, workstations)",
          "Overclocking & performance tuning",
          "Networking basics & server integration",
        ] 
      },
    ]
  },
  {
    id: "printer",
    icon: "🖨️",
    title: "Printer Training",
    levels: [
      { 
        title: "Beginner Level", 
        topics: [
          "Printer setup: Inkjet, Laser, Dot-Matrix",
          "Common issues: paper jams, connectivity, cartridge refills",
          "Wi-Fi & network printing",
        ] 
      },
      { 
        title: "Intermediate Level", 
        topics: [
          "Troubleshooting error codes",
          "Printer driver management",
          "Printer sharing & cloud printing setup",
        ] 
      },
      { 
        title: "Advanced Level", 
        topics: [
          "Complete printer overhauls",
          "Network printing for businesses",
          "Maintenance contracts & AMC support",
        ] 
      },
    ]
  },
  {
    id: "gadget",
    icon: "📱",
    title: "Gadget Training (Smart Devices & IoT)",
    levels: [
      { 
        title: "Beginner Level", 
        topics: [
          "Smartphone & tablet basics",
          "Gadget connectivity: Wi-Fi, Bluetooth, apps",
          "Backup & restore",
        ] 
      },
      { 
        title: "Intermediate Level", 
        topics: [
          "IoT device setup (CCTV apps, smart alarms, routers)",
          "Security & privacy configurations",
          "Troubleshooting charging/battery issues",
        ] 
      },
      { 
        title: "Advanced Level", 
        topics: [
          "Advanced IoT integration for home & office",
          "Smart surveillance solutions",
          "Data security in IoT devices",
        ] 
      },
    ]
  },
];
const whyTrainWithUs = [
  { icon: "✨", text: "Hands-on Practical Sessions" },
  { icon: "🎓", text: "Certified IT Professionals as Trainers" },
  { icon: "📈", text: "Beginner to Advanced Curriculum" },
  { icon: "💰", text: "Affordable & Flexible Batches" },
  { icon: "🌙", text: "Weekend & Evening Classes Available" },
  { icon: "📜", text: "Certificate of Completion Provided" },
];
// --- Main Component ---
export default function TrainingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("laptop");
  const [customerType, setCustomerType] = useState("new");
  
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", address: "", notes: ""
  });
  
  const [trainingSelection, setTrainingSelection] = useState({
    laptop: false, pc: false, printer: false, gadget: false, corporate: false
  });
  
  const [preferredFormat, setPreferredFormat] = useState("inPerson");
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  useEffect(() => { setIsVisible(true); }, []);
  
  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Special handling for phone field to allow only 10 digits
    if (name === 'phone') {
      // Remove all non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      // Limit to 10 digits
      const truncatedValue = digitsOnly.slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: truncatedValue }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrainingSelection(prev => ({ ...prev, [e.target.name]: e.target.checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    // Collect selected training programs
    const selectedPrograms = Object.keys(trainingSelection).filter(key => trainingSelection[key as keyof typeof trainingSelection]);
    const enquiryData = {
      ...formData,
      trainingPrograms: selectedPrograms,
      preferredFormat,
    };
    console.log("Submitting Training Enquiry:", enquiryData);
    // --- Backend API Call ---
    try {
      const response = await fetch('/api/training-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enquiryData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit enquiry');
      }
      const result = await response.json();
      console.log("Submission successful:", result);
      setSubmissionStatus("success");
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmissionStatus("error");
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-sky-50 to-cyan-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-gray-900 via-[#0553aa] to-[#0553aa] bg-clip-text text-transparent leading-tight">
              Learn. Practice. Master IT Skills.
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At Cloud IT Solution, we believe that knowledge is power. Our hands-on training programs are designed to give you the confidence and skills to manage, repair, and optimize laptops, desktops, printers, and gadgets.
            </p>
          </div>
        </div>
      </section>

      {/* Enquiry Form Section - MOVED TO TOP */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-cyan-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-[#0553aa] shadow-xl">
            {submissionStatus === 'success' ? (
                 <div className="text-center py-12">
                  <div className="text-6xl mb-4">👍</div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Enquiry Sent!</h2>
                  <p className="text-lg text-gray-600">Thank you for your interest. We've received your enquiry and our team will get back to you soon!</p>
                </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <h2 className="text-3xl font-bold text-center text-gray-900">Request a Training Enquiry</h2>
              {/* Customer Details */}
              <fieldset>
                <legend className="text-xl font-semibold text-gray-800 mb-4">🔹 Customer Details</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                    <input type="text" name="name" required onChange={handleFormInputChange} className="mt-1 w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-[#0553aa]"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone/WhatsApp <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone} 
                      onChange={handleFormInputChange}
                      maxLength={10}
                      pattern="\d{10}"
                      title="Please enter exactly 10 digits"
                      className="mt-1 w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-[#0553aa]"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter 10-digit phone number</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                    <input type="email" name="email" required onChange={handleFormInputChange} className="mt-1 w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-[#0553aa]"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input type="text" name="address" onChange={handleFormInputChange} className="mt-1 w-full p-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-[#0553aa]"/>
                  </div>
                </div>
              </fieldset>
              {/* Program Selection */}
              <fieldset>
                <legend className="text-xl font-semibold text-gray-800 mb-4">🔹 Select Training Program(s)</legend>
                <div className="grid grid-cols-2 gap-4">
                  {trainingPrograms.map(p => (
                    <label key={p.id} className="flex items-center p-3 rounded-lg border-2 bg-white cursor-pointer has-[:checked]:border-[#0553aa] has-[:checked]:bg-blue-50">
                      <input type="checkbox" name={p.id} onChange={handleCheckboxChange} className="h-5 w-5 rounded border-gray-300 text-[#0553aa] focus:ring-[#0553aa]"/>
                      <span className="ml-3 font-medium text-gray-700">{p.title}</span>
                    </label>
                  ))}
                  <label className="flex items-center p-3 rounded-lg border-2 bg-white cursor-pointer has-[:checked]:border-[#0553aa] has-[:checked]:bg-blue-50">
                      <input type="checkbox" name="corporate" onChange={handleCheckboxChange} className="h-5 w-5 rounded border-gray-300 text-[#0553aa] focus:ring-[#0553aa]"/>
                      <span className="ml-3 font-medium text-gray-700">Corporate / Custom Training</span>
                  </label>
                </div>
              </fieldset>
              {/* Preferred Format */}
              <fieldset>
                <legend className="text-xl font-semibold text-gray-800 mb-4">🔹 Preferred Training Format</legend>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex-1 p-4 text-center rounded-lg border-2 bg-white cursor-pointer has-[:checked]:border-[#0553aa] has-[:checked]:bg-blue-50">
                    <input type="radio" name="format" value="inPerson" checked={preferredFormat === 'inPerson'} onChange={(e) => setPreferredFormat(e.target.value)} className="sr-only"/>
                    <span className="font-bold">In-Person (@Center)</span>
                  </label>
                   <label className="flex-1 p-4 text-center rounded-lg border-2 bg-white cursor-pointer has-[:checked]:border-[#0553aa] has-[:checked]:bg-blue-50">
                    <input type="radio" name="format" value="online" checked={preferredFormat === 'online'} onChange={(e) => setPreferredFormat(e.target.value)} className="sr-only"/>
                    <span className="font-bold">Online (Live Class)</span>
                  </label>
                   <label className="flex-1 p-4 text-center rounded-lg border-2 bg-white cursor-pointer has-[:checked]:border-[#0553aa] has-[:checked]:bg-blue-50">
                    <input type="radio" name="format" value="onSite" checked={preferredFormat === 'onSite'} onChange={(e) => setPreferredFormat(e.target.value)} className="sr-only"/>
                    <span className="font-bold">On-Site (Business/Institute)</span>
                  </label>
                </div>
              </fieldset>
              
              <div>
                <button type="submit" disabled={submissionStatus === 'submitting'} className="w-full mt-4 p-4 rounded-xl font-bold text-white text-lg bg-[#0553aa] hover:bg-blue-800 transition-colors disabled:opacity-60">
                  {submissionStatus === 'submitting' ? 'Submitting...' : '📩 Submit Training Enquiry'}
                </button>
              </div>
            </form>
            )}
          </div>
        </div>
      </section>

      {/* Why Train With Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Train with Us?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {whyTrainWithUs.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-[#0553aa] hover:shadow-lg transition-all text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="text-lg font-semibold text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Training Programs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Training Programs</h2>
          <div className="space-y-4">
            {trainingPrograms.map((program) => (
              <div key={program.id} className="border-2 rounded-2xl overflow-hidden bg-white transition-all duration-300">
                <button
                  onClick={() => setOpenAccordion(openAccordion === program.id ? null : program.id)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{program.icon}</span>
                    <span className="text-2xl font-bold text-gray-800">{program.title}</span>
                  </div>
                  <svg className={`w-6 h-6 transform transition-transform duration-300 ${openAccordion === program.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`transition-all duration-500 ease-in-out grid ${openAccordion === program.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="p-6 bg-gray-50 grid grid-cols-1 md:grid-cols-3 gap-6">
                      {program.levels.map((level) => (
                        <div key={level.title} className="bg-white p-6 rounded-xl border">
                          <h4 className="text-xl font-bold text-[#0553aa] mb-4">{level.title}</h4>
                          <ul className="space-y-2">
                            {level.topics.map((topic, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-green-500 mr-2 mt-1">✔</span>
                                <span className="text-gray-600">{topic}</span>
                              </li>
                            ))}
                          </ul>
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
    </div>
  );
}