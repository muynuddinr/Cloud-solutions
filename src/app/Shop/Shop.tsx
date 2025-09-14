"use client";
import React, { useState, useEffect } from "react";
// Define the primary color for consistency
const PRIMARY_BLUE = "#0553aa";
// Data for checkboxes to keep the JSX clean
const pcTypeOptions = [
  { id: "desktop", label: "Desktop PC" },
  { id: "laptop", label: "Laptop / Notebook" },
  { id: "gaming", label: "Gaming PC" },
  { id: "workstation", label: "Workstation PC" },
  { id: "allInOne", label: "All-in-One PC" },
  { id: "mini", label: "Mini PC" },
  { id: "server", label: "Server PC" },
];
const usageTypeOptions = [
  { id: "basic", label: "Basic Use (Internet, Email, MS Office, Video Calls)" },
  { id: "business", label: "Business & Office Work (Productivity, Accounting, Multi-monitor)" },
  { id: "education", label: "Education / Student (Online Learning, Projects, Coding)" },
  { id: "creative", label: "Design & Creative Work (Graphics, Video Editing, 3D Modeling)" },
  { id: "gamingCasual", label: "Gaming – Casual (Light titles)" },
  { id: "gamingMid", label: "Gaming – Mid-Range (AAA titles, medium settings)" },
  { id: "gamingHigh", label: "Gaming – High-End (eSports, VR, Streaming)" },
  { id: "professional", label: "Workstation / Professional (Software Dev, CAD, AI/ML, Data Analysis)" },
  { id: "serverEnterprise", label: "Server & Enterprise (File Storage, Hosting, ERP, Databases)" },
  { id: "travel", label: "Travel & Portability (Lightweight, Long Battery, 2-in-1 Devices)" },
];
export default function ShopPage() {
  const [isVisible, setIsVisible] = useState(false);
  
  // State for mandatory fields
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  // State for PC Type checkboxes, with all options initially false
  const [pcTypes, setPcTypes] = useState({
    desktop: false,
    laptop: false, // Changed from true to false
    gaming: false,
    workstation: false,
    allInOne: false,
    mini: false,
    server: false,
  });
  // State for Usage Type checkboxes, with all options initially false
  const [usageTypes, setUsageTypes] = useState({
    basic: false,
    business: false, // Changed from true to false
    education: false,
    creative: false,
    gamingCasual: false,
    gamingMid: false,
    gamingHigh: false,
    professional: false,
    serverEnterprise: false,
    travel: false,
  });
  
  // State to manage form submission status
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  useEffect(() => {
    setIsVisible(true);
  }, []);
  // Handlers for state changes
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };
  const handlePcTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPcTypes(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleUsageTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setUsageTypes(prev => ({ ...prev, [name]: checked }));
  };
  
  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    // Collect checked options
    const selectedPcTypes = Object.keys(pcTypes).filter(key => pcTypes[key as keyof typeof pcTypes]);
    const selectedUsageTypes = Object.keys(usageTypes).filter(key => usageTypes[key as keyof typeof usageTypes]);
    const quoteRequest = {
      ...contactInfo,
      pcTypes: selectedPcTypes,
      usageTypes: selectedUsageTypes,
    };
    console.log("Submitting Quote Request:", quoteRequest);
    // --- Backend API Call ---
    try {
      const response = await fetch('/api/shop-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteRequest),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit request');
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
      {/* Intro Section */}
      <section className="py-20 md:pt-32 md:pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
           <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-[#0553aa] to-[#0553aa] bg-clip-text text-transparent leading-tight mb-6">
              Find Your Perfect PC
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Looking for the right computer that fits your needs and budget? At Cloud IT Solution, we make it easy. Whether you need a basic desktop, a business laptop, a powerful gaming rig, or a professional workstation, we've got you covered.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mt-4">
              Simply fill out the form below. Our team will review your request and provide you with the best options, transparent pricing, and a customized quotation.
            </p>
          </div>
        </div>
      </section>
      {/* Form Section */}
      <section className="pb-20 md:pb-32">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <form 
            onSubmit={handleSubmit} 
            className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-3xl p-8 md:p-12 border-2 border-[#0553aa] shadow-xl transition-all duration-1000"
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            {submissionStatus === "success" ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
                <p className="text-lg text-gray-600">Your request has been submitted successfully. Our team will get back to you shortly with a customized quotation.</p>
              </div>
            ) : (
            <>
              {/* Mandatory Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Name <span className="text-red-500">*</span></label>
                  <input type="text" name="name" id="name" required value={contactInfo.name} onChange={handleContactChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0553aa]" placeholder="Your Full Name"/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email ID <span className="text-red-500">*</span></label>
                  <input type="email" name="email" id="email" required value={contactInfo.email} onChange={handleContactChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0553aa]" placeholder="your.email@example.com"/>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                  <input type="tel" name="phone" id="phone" required value={contactInfo.phone} onChange={handleContactChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0553aa]" placeholder="10-digit mobile number"/>
                </div>
              </div>
              {/* PC Type Selection */}
              <fieldset className="mb-10">
                <legend className="text-xl font-bold text-gray-900 mb-4">💻 PC Type <span className="text-sm font-normal text-gray-500">(Select One or More)</span></legend>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {pcTypeOptions.map(option => (
                    <label key={option.id} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${pcTypes[option.id as keyof typeof pcTypes] ? 'bg-blue-100 border-[#0553aa]' : 'bg-white border-gray-200 hover:border-gray-400'}`}>
                      <input type="checkbox" name={option.id} checked={pcTypes[option.id as keyof typeof pcTypes]} onChange={handlePcTypeChange} className="h-5 w-5 rounded border-gray-300 text-[#0553aa] focus:ring-[#0553aa]"/>
                      <span className="ml-3 text-sm font-medium text-gray-800">{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {/* Usage Type Selection */}
              <fieldset className="mb-12">
                <legend className="text-xl font-bold text-gray-900 mb-4">🚀 Usage Type <span className="text-sm font-normal text-gray-500">(Select One or More)</span></legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {usageTypeOptions.map(option => (
                    <label key={option.id} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${usageTypes[option.id as keyof typeof usageTypes] ? 'bg-blue-100 border-[#0553aa]' : 'bg-white border-gray-200 hover:border-gray-400'}`}>
                      <input type="checkbox" name={option.id} checked={usageTypes[option.id as keyof typeof usageTypes]} onChange={handleUsageTypeChange} className="h-5 w-5 rounded border-gray-300 text-[#0553aa] focus:ring-[#0553aa]"/>
                      <span className="ml-3 text-sm font-medium text-gray-800">{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {/* Tip and Submit Button */}
              <div className="bg-[rgba(5,83,170,0.1)] text-[#0553aa] p-4 rounded-lg text-center mb-8">
                💡 Not sure which option to choose? Don't worry – just tick the closest match, and our experts will guide you to the right solution.
              </div>
              
              <div className="text-center">
                <button 
                  type="submit"
                  disabled={submissionStatus === 'submitting'}
                  className="group relative inline-flex items-center justify-center px-10 py-5 rounded-2xl font-bold text-white shadow-2xl border-2 border-[#0553aa] transition-all duration-300 text-lg md:text-xl bg-gradient-to-r from-[#0553aa] to-[#0553aa] hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                >
                  {submissionStatus === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">✅ Submit Request</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                  )}
                </button>
                {submissionStatus === "error" && (
                    <p className="text-red-500 mt-4">Something went wrong. Please try again.</p>
                )}
              </div>
            </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}