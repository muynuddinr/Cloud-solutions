"use client";
import React, { useState, useEffect } from "react";

// Define the primary color for consistency
const PRIMARY_BLUE = "#0553aa";

// Data for product listings and checkboxes
const products = [
  { 
    id: "ems", 
    icon: "🎓", 
    title: "Educational Management System (EMS)", 
    description: "Manage admissions, attendance, grading, communication, and administration with one integrated platform for schools, colleges, and universities." 
  },
  { 
    id: "sma", 
    icon: "🛠️", 
    title: "Service Management Application (SMA)", 
    description: "Simplify service operations with a powerful tool for ticketing, customer support, and workflow automation across industries." 
  },
  { 
    id: "mma", 
    icon: "🏥", 
    title: "Medical Management Application (MMA)", 
    description: "A robust solution for clinics and hospitals to handle patient records, appointments, billing, inventory, and compliance." 
  },
  { 
    id: "qms", 
    icon: "⏳", 
    title: "Queue Management System (QMS)", 
    description: "Enhance customer experience with digital queue management – organize, monitor, and optimize service flow efficiently." 
  },
];

export default function SoftwarePage() {
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    location: "",
    requestType: "productDemo",
    notes: "",
  });

  const [productInterest, setProductInterest] = useState({
    ems: false,
    sma: false,
    mma: false,
    qms: false,
  });
  
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    const { name, checked } = e.target;
    setProductInterest(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("submitting");

    const selectedProducts = Object.entries(productInterest)
      .filter(([_, interested]) => interested)
      .map(([key, _]) => key.toUpperCase());

    const requestData = {
      customerType: "new", // Always set to "new" since we removed the customer type selection
      contactDetails: { ...formData },
      interestedIn: selectedProducts,
      requestType: formData.requestType,
      notes: formData.notes,
    };

    console.log("Submitting Demo/Enquiry Request:", requestData);
    
    // --- Backend API Call ---
    try {
      const response = await fetch('/api/product-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit request');
      }

      const result = await response.json();
      console.log("Submission successful:", result);
      setSubmissionStatus("success");
    } catch (error) {
      console.error("Submission Failed:", error);
      setSubmissionStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Left Column: Information */}
          <div className="space-y-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-[#0553aa] to-[#0553aa] bg-clip-text text-transparent leading-tight">
                Smart Software Solutions for Modern Businesses
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                At Cloud IT Solution, we design and deliver intelligent, purpose-built applications that help businesses streamline operations, improve decision-making, and stay ahead of the competition.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Our software products are user-friendly, scalable, and tailored to meet the unique needs of industries such as education, services, healthcare, and retail.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Software Products</h2>
              <div className="space-y-6">
                {products.map(product => (
                  <div key={product.id} className="flex items-start space-x-4">
                    <div className="text-3xl flex-shrink-0 mt-1">{product.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{product.title}</h3>
                      <p className="text-gray-600">{product.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-200">
            {submissionStatus === 'success' ? (
              <div className="text-center flex flex-col justify-center items-center h-full">
                <div className="text-6xl mb-4">👍</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Request Received!</h2>
                <p className="text-lg text-gray-600">Thank you for your interest. Our team will contact you shortly with product details and a personalized walkthrough.</p>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 text-center">Request a Demo / Enquiry</h2>
              
              {/* Customer Details */}
              <fieldset>
                <legend className="text-lg font-semibold text-gray-800 mb-3 flex items-center"><span className="text-[#0553aa] mr-2">🔹</span> Customer Details</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div>
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                      <input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0553aa]"/>
                   </div>
                   <div>
                      <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone/WhatsApp <span className="text-red-500">*</span></label>
                      <input 
                        type="tel" 
                        name="phone" 
                        id="phone" 
                        required 
                        value={formData.phone} 
                        onChange={handleInputChange}
                        maxLength={10}
                        pattern="\d{10}"
                        title="Please enter exactly 10 digits"
                        className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0553aa]"
                      />
                      <p className="text-xs text-gray-500 mt-1">Enter 10-digit phone number</p>
                   </div>
                   <div>
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                      <input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0553aa]"/>
                   </div>
                   <div>
                      <label htmlFor="company" className="text-sm font-medium text-gray-700">Company / Institute <span className="text-gray-400 font-normal">(Optional)</span></label>
                      <input type="text" name="company" id="company" value={formData.company} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0553aa]"/>
                   </div>
                   <div className="sm:col-span-2">
                       <label htmlFor="location" className="text-sm font-medium text-gray-700">Location <span className="text-gray-400 font-normal">(Optional)</span></label>
                       <input type="text" name="location" id="location" value={formData.location} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0553aa]"/>
                   </div>
                </div>
              </fieldset>

              {/* Product Interest */}
              <fieldset>
                 <legend className="text-lg font-semibold text-gray-800 mb-3 flex items-center"><span className="text-[#0553aa] mr-2">🔹</span> Product Interest <span className="text-sm font-normal text-gray-500 ml-2">(Select One or More)</span></legend>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {products.map(product => (
                      <label key={product.id} className={`flex items-center p-2.5 rounded-md border-2 cursor-pointer transition-all ${productInterest[product.id as keyof typeof productInterest] ? 'bg-blue-50 border-[#0553aa]' : 'bg-white border-gray-200 hover:border-gray-400'}`}>
                        <input type="checkbox" name={product.id} checked={productInterest[product.id as keyof typeof productInterest]} onChange={handleCheckboxChange} className="h-4 w-4 rounded border-gray-300 text-[#0553aa] focus:ring-[#0553aa]"/>
                        <span className="ml-2 text-sm font-medium text-gray-800">{product.title}</span>
                      </label>
                    ))}
                 </div>
              </fieldset>
              
              {/* Request Type */}
              <fieldset>
                 <legend className="text-lg font-semibold text-gray-800 mb-3 flex items-center"><span className="text-[#0553aa] mr-2">🔹</span> Request Type</legend>
                 <div className="flex items-center space-x-4">
                   <label className="flex items-center">
                     <input type="radio" name="requestType" value="productDemo" checked={formData.requestType === 'productDemo'} onChange={handleInputChange} className="h-4 w-4 text-[#0553aa] focus:ring-[#0553aa] border-gray-300"/>
                     <span className="ml-2 text-gray-700">Product Demo</span>
                   </label>
                   <label className="flex items-center">
                     <input type="radio" name="requestType" value="enquiryPricing" checked={formData.requestType === 'enquiryPricing'} onChange={handleInputChange} className="h-4 w-4 text-[#0553aa] focus:ring-[#0553aa] border-gray-300"/>
                     <span className="ml-2 text-gray-700">Enquiry / Pricing</span>
                   </label>
                 </div>
              </fieldset>
              
              {/* Additional Notes */}
              <fieldset>
                 <legend className="text-lg font-semibold text-gray-800 mb-3 flex items-center"><span className="text-[#0553aa] mr-2">🔹</span> Additional Notes / Requirements</legend>
                 <textarea name="notes" rows={3} value={formData.notes} onChange={handleInputChange} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0553aa]" placeholder="Tell us more about your specific needs..."></textarea>
              </fieldset>
              
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={submissionStatus === 'submitting'}
                  className="w-full mt-2 group relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-white shadow-lg border-2 border-[#0553aa] transition-all duration-300 text-lg bg-gradient-to-r from-[#0553aa] to-[#0553aa] hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submissionStatus === 'submitting' ? 'Submitting...' : '📩 Request Demo / Enquiry'}
                </button>
                {submissionStatus === 'error' && <p className="text-red-500 text-sm text-center mt-2">Submission failed. Please try again.</p>}
              </div>
            </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}