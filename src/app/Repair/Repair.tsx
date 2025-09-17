"use client";
import React, { useState, useEffect, ReactNode, ChangeEvent, FormEvent } from "react";
import { useInView } from 'react-intersection-observer';

// --- TYPE DEFINITIONS ---
type SubmissionStatus = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  deviceType: string;
  brandModel: string;
  serialNumber: string;
  otherIssue: string;
  preferredService: "bringToCenter" | "requestHomeService";
}

interface Issues {
  [key: string]: boolean;
}

// --- CONSTANTS ---
const PRIMARY_BLUE = "#0553aa";

const issueOptions = [
  { id: "power", label: "Power Issue (Not turning on / Auto shutdown)" },
  { id: "display", label: "Display Issue (Flickering / No display)" },
  { id: "keyboard", label: "Keyboard / Touchpad Issue" },
  { id: "battery", label: "Battery / Charging Issue" },
  { id: "software", label: "Software / OS Issue (Slowness / Errors)" },
  { id: "printer", label: "Printer Issue (Paper Jam / Not printing)" },
  { id: "others", label: "Others" },
];

// --- HELPER & REUSABLE COMPONENTS ---

const AnimateOnScroll = ({ children }: { children: ReactNode }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {children}
    </div>
  );
};

const FormField = ({ label, name, children, required = false, optional = false }: { label: string, name: string, children: ReactNode, required?: boolean, optional?: boolean }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-bold text-gray-700 mb-2">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
      {optional && <span className="text-gray-400 font-normal ml-1">(Optional)</span>}
    </label>
    {children}
  </div>
);

const SectionLegend = ({ children }: { children: ReactNode }) => (
  <legend className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
    <span className="text-blue-500 mr-3">●</span> {children}
  </legend>
);


// --- SECTIONAL COMPONENTS ---

const IntroSection = () => (
  <section className="py-20 md:pt-32 md:pb-16 bg-white">
    <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
      <AnimateOnScroll>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-800 to-[#0553aa] bg-clip-text text-transparent leading-tight mb-6">
          Quick & Hassle-Free Repairs
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We make device repair simple and transparent. Fill in your details below, and our experts will get back to you with a solution.
        </p>
      </AnimateOnScroll>
    </div>
  </section>
);

const SuccessMessage = () => (
    <div className="text-center py-12 px-4">
        <div className="text-6xl mb-4 animate-bounce">✅</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
        <p className="text-lg text-gray-600">
            Thank you for trusting us. Our team has received your repair request and will contact you shortly to confirm the details.
        </p>
    </div>
);


const RepairForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "", phone: "", email: "", address: "", deviceType: "",
    brandModel: "", serialNumber: "", otherIssue: "", preferredService: "bringToCenter",
  });
  const [issues, setIssues] = useState<Issues>(issueOptions.reduce((acc, opt) => ({ ...acc, [opt.id]: false }), {}));
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate phone field
    if (name === 'phone') {
      // Remove any non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      // Limit to 10 digits
      const truncatedValue = digitsOnly.slice(0, 10);
      
      setFormData(prev => ({ ...prev, phone: truncatedValue }));
      
      // Validate if exactly 10 digits
      if (truncatedValue.length > 0 && truncatedValue.length < 10) {
        setPhoneError("Phone number must be exactly 10 digits");
      } else {
        setPhoneError(null);
      }
    }
  };
  
  const handleIssueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setIssues(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate phone before submission
    if (formData.phone.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }
    
    setSubmissionStatus("submitting");

    const selectedIssues = Object.entries(issues)
      .filter(([_, checked]) => checked)
      .map(([key]) => issueOptions.find(opt => opt.id === key)?.label || '')
      .filter(Boolean);

    const repairRequest = {
      customerType: "new", // Always set to "new" since we removed the customer type selection
      customerDetails: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        address: formData.address || undefined,
      },
      deviceDetails: {
        deviceType: formData.deviceType,
        brandModel: formData.brandModel || undefined, // Handle optional field
        serialNumber: formData.serialNumber || undefined,
      },
      issues: selectedIssues,
      otherIssue: issues.others ? formData.otherIssue : undefined,
      preferredService: formData.preferredService,
    };
    
    console.log("Submitting Repair Request:", repairRequest);

    try {
      const response = await fetch('/api/admin/repair', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(repairRequest),
      });

      const result = await response.json();

      if (result.success) {
        setSubmissionStatus("success");
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmissionStatus("error");
    }
  };

  if (submissionStatus === 'success') {
    return <SuccessMessage />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* Customer Details */}
      <fieldset>
        <SectionLegend>Customer Details</SectionLegend>
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Name" name="name" required>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#0553aa] focus:border-[#0553aa] transition"/>
              </FormField>
              <FormField label="Phone / WhatsApp" name="phone" required>
                  <input 
                    type="tel" 
                    name="phone" 
                    id="phone" 
                    required 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    className={`w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#0553aa] focus:border-[#0553aa] transition ${phoneError ? 'border-red-500' : ''}`}
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                  />
                  {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
              </FormField>
              <FormField label="Email ID" name="email" optional>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#0553aa] focus:border-[#0553aa] transition"/>
              </FormField>
              <FormField label="Address" name="address" optional>
                  <input type="text" name="address" id="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#0553aa] focus:border-[#0553aa] transition"/>
              </FormField>
            </div>
        </div>
      </fieldset>

      {/* Device Details */}
      <fieldset>
        <SectionLegend>Device Details</SectionLegend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Device Type" name="deviceType" required>
            <select name="deviceType" id="deviceType" required value={formData.deviceType} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#0553aa] focus:border-[#0553aa] transition bg-white">
              <option value="" disabled>Select a device</option>
              <option>Laptop</option><option>PC / Desktop</option><option>Printer</option><option>Others</option>
            </select>
          </FormField>
          <FormField label="Brand & Model" name="brandModel" optional>
            <input type="text" name="brandModel" id="brandModel" value={formData.brandModel} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#0553aa] focus:border-[#0553aa] transition"/>
          </FormField>
          <div className="md:col-span-2">
            <FormField label="Serial Number" name="serialNumber" optional>
                <input type="text" name="serialNumber" id="serialNumber" value={formData.serialNumber} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#0553aa] focus:border-[#0553aa] transition"/>
            </FormField>
          </div>
        </div>
      </fieldset>
      
      {/* Issue Description */}
      <fieldset>
        <SectionLegend>Issue Description</SectionLegend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {issueOptions.map(({ id, label }) => (
            <label key={id} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${issues[id] ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200 hover:border-gray-400'}`}>
              <input type="checkbox" name={id} checked={issues[id]} onChange={handleIssueChange} className="h-5 w-5 rounded border-gray-300 text-[#0553aa] focus:ring-[#0553aa]"/>
              <span className="ml-3 text-sm font-medium text-gray-800">{label}</span>
            </label>
          ))}
        </div>
        {issues.others && (
          <div className="mt-4">
            <FormField label="Please describe the issue in detail:" name="otherIssue">
                <textarea name="otherIssue" id="otherIssue" rows={3} value={formData.otherIssue} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-[#0553aa] focus:border-[#0553aa] transition"></textarea>
            </FormField>
          </div>
        )}
      </fieldset>
      
      {/* Preferred Service */}
      <fieldset>
        <SectionLegend>Preferred Service</SectionLegend>
        <div className="flex flex-col md:flex-row gap-4">
            <label className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.preferredService === 'bringToCenter' ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200' : 'bg-white border-gray-200 hover:border-gray-400'}`}>
                <input type="radio" name="preferredService" value="bringToCenter" checked={formData.preferredService === 'bringToCenter'} onChange={handleInputChange} className="sr-only"/>
                <span className="text-lg font-bold text-gray-800">Bring to Service Center</span>
                <p className="text-sm text-gray-600 mt-1">Visit our location for in-person support.</p>
            </label>
            <label className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.preferredService === 'requestHomeService' ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200' : 'bg-white border-gray-200 hover:border-gray-400'}`}>
                <input type="radio" name="preferredService" value="requestHomeService" checked={formData.preferredService === 'requestHomeService'} onChange={handleInputChange} className="sr-only"/>
                <span className="text-lg font-bold text-gray-800">Request Home Service</span>
                <p className="text-sm text-gray-600 mt-1">Our technician will visit you (charges may apply).</p>
            </label>
        </div>
      </fieldset>
      
      <div className="mt-12 text-center">
        <button
          type="submit"
          disabled={submissionStatus === 'submitting' || !!phoneError}
          className="w-full md:w-auto inline-flex items-center justify-center px-12 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 text-lg bg-[#0553aa] hover:bg-blue-700 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit Repair Request'}
        </button>
        {submissionStatus === "error" && (
          <p className="text-red-600 mt-4">Submission failed. Please check your details and try again.</p>
        )}
      </div>
    </form>
  );
};


// --- MAIN PAGE COMPONENT ---
export default function RepairPage() {
  return (
    <div className="min-h-screen bg-white">
      <IntroSection />
      
      <section className="pb-20 md:pb-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-2xl p-6 sm:p-8 md:p-12 border border-blue-200/50 shadow-xl">
              <RepairForm />
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}