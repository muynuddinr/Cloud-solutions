"use client";

import React, { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const nextErrors: Partial<FormState> = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email";
    if (!form.message.trim()) nextErrors.message = "Please enter your message";
    if (form.phone && !/^[+\d][\d\s()-]{6,}$/.test(form.phone)) nextErrors.phone = "Enter a valid phone";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitted(true);
      setForm(initialFormState);
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ 
        message: error instanceof Error ? error.message : 'Failed to submit form. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50 relative overflow-hidden">
      {/* Background decorative elements aligned with site theme */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-sky-200 to-cyan-200 blur-2xl" />
        <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-gradient-to-tr from-cyan-200 to-sky-200 blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-100 to-cyan-100 px-5 py-2.5 rounded-full mb-5 border border-sky-200 shadow-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500" />
            <span className="text-sky-700 font-semibold tracking-wide">Get in touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 via-sky-700 to-cyan-700 bg-clip-text text-transparent">
            We would love to hear from you
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Questions, ideas, or a custom quote? Send a message and our team will respond shortly.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {/* Info + Map */}
          <div className="space-y-8">
            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <a
                href="tel:+919952370971"
                className="relative bg-white/80 hover:bg-white/90 transition-colors backdrop-blur-xl rounded-3xl border-2 border-sky-200 hover:border-cyan-300 shadow-xl p-6 group"
              >
                <div className="mb-2 text-3xl">📞</div>
                <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Phone</div>
                <div className="text-lg font-bold text-gray-900 group-hover:text-sky-700">99523 70971</div>
                <span className="mt-1 inline-block text-xs text-sky-600">Tap to call</span>
              </a>
              {/* Email */}
              <a
                href="mailto:cloudsolutions1@gmail.com"
                className="relative bg-white/80 hover:bg-white/90 transition-colors backdrop-blur-xl rounded-3xl border-2 border-sky-200 hover:border-cyan-300 shadow-xl p-6 group"
              >
                <div className="mb-2 text-3xl">✉️</div>
                <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Email</div>
                <div className="text-lg font-bold text-gray-900 break-all group-hover:text-sky-700">cloudsolutions1@gmail.com</div>
                <span className="mt-1 inline-block text-xs text-sky-600">Tap to email</span>
              </a>
              {/* Hours */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-sky-200 shadow-xl p-6">
                <div className="mb-2 text-3xl">⏰</div>
                <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Hours</div>
                <div className="text-lg font-bold text-gray-900">Mon–Fri: 9:00–18:00</div>
                <div className="text-sm text-gray-500">Sat: 10:00–16:00</div>
              </div>
              {/* Address */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Shop%20No%3A%20183%2F1%2C%20Opp%20Aryabhavan%20Sweets%2C%20Sakthi%20Childrens%20Hospital%2C%20Hosur%20-635%20126"
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-white/80 hover:bg-white/90 transition-colors backdrop-blur-xl rounded-3xl border-2 border-sky-200 hover:border-cyan-300 shadow-xl p-6 group"
              >
                <div className="mb-2 text-3xl">📍</div>
                <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Address</div>
                <div className="text-lg font-bold text-gray-900 group-hover:text-sky-700">Shop No: 183/1, Opp Aryabhavan Sweets, Sakthi Childrens Hospital, Hosur -635 126</div>
                <span className="mt-1 inline-block text-xs text-sky-600">Open in Google Maps</span>
              </a>
            </div>

            {/* Map */}
            <div className="relative overflow-hidden rounded-3xl border-2 border-sky-200 shadow-xl bg-white/80 backdrop-blur-xl">
              <div className="relative h-72 w-full">
                <iframe
                  title="Cloud IT Solution Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353159049!3d-37.81627974202137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ5JzAwLjYiUyAxNDTCsDU3JzE0LjQiRQ!5e0!3m2!1sen!2s!4v1700000000000"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-sky-200 shadow-xl p-6 sm:p-8 md:p-10">
            {/* Gradient sheen */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: "linear-gradient(120deg,rgba(255,255,255,0.45) 60%,rgba(255,255,255,0.25) 100%)" }} />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2 bg-gradient-to-r from-gray-900 to-sky-700 bg-clip-text text-transparent">
                Send us a message
              </h2>
              <p className="text-gray-600 mb-6">Fill out the form and we’ll get back to you within 1–2 business days.</p>

              {submitted && (
                <div className="mb-6 rounded-2xl border-2 border-green-300 bg-green-50 text-green-700 px-4 py-3">
                  Thank you! Your message has been sent. We’ll be in touch soon.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-2xl border-2 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 transition-all duration-300 ${errors.name ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:border-sky-400 focus:ring-sky-100"}`}
                      placeholder="Your full name"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && <p id="name-error" className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-2xl border-2 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 transition-all duration-300 ${errors.email ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:border-sky-400 focus:ring-sky-100"}`}
                      placeholder="cloudsolutions1@gmail.com"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && <p id="email-error" className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">Phone (optional)</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-2xl border-2 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 transition-all duration-300 ${errors.phone ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:border-sky-400 focus:ring-sky-100"}`}
                      placeholder="99523 70971"
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 transition-all duration-300"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-2xl border-2 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 transition-all duration-300 ${errors.message ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:border-sky-400 focus:ring-sky-100"}`}
                    placeholder="Tell us a bit about your project or question..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && <p id="message-error" className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="text-xs text-gray-500">By submitting, you agree to our terms.</div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-sky-500 to-cyan-500 border-2 border-cyan-400 transition-all duration-300 hover:from-cyan-500 hover:to-sky-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 active:scale-95 ${isSubmitting ? "opacity-80 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

