"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  company: [
    { name: "About Us", href: "/About" },
    { name: "Our Team", href: "#team" },
    { name: "Careers", href: "#careers" },
    { name: "News & Blog", href: "#blog" },
  ],
  services: [
    { name: "IT Solutions", href: "/Services" },
    { name: "Cloud Services", href: "/Services" },
    { name: "Technical Support", href: "/Services" },
    { name: "Software Solutions", href: "/Services" },
  ],
  products: [
    { name: "Computers & Laptops", href: "/Products" },
    { name: "Printers", href: "/Products" },
    { name: "Accessories", href: "/Shop" },
    { name: "Custom Builds", href: "/Products" },
  ],
  support: [
    { name: "Help Center", href: "#help" },
    { name: "Contact Support", href: "/Contact" },
    { name: "Documentation", href: "#docs" },
    { name: "Training", href: "/Training" },
  ],
};

const socialLinks = [
  { name: "Facebook", href: "#", icon: "📘" },
  { name: "Twitter", href: "#", icon: "🐦" },
  { name: "LinkedIn", href: "#", icon: "💼" },
  { name: "Instagram", href: "#", icon: "📷" },
];

export default function Footer() {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to subscribe' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to subscribe. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 border border-sky-400 rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>
        <div className="absolute bottom-32 right-20 w-32 h-32 border-2 border-cyan-400 rounded-lg rotate-45 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-blue-400 rounded-lg rotate-12 animate-bounce" style={{ animationDelay: '2s' }}></div>
        
        {/* Dotted pattern */}
        <div className="absolute top-40 left-1/3 grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-sky-300 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-gradient-to-tr from-sky-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg border-2 border-cyan-400 mr-4">
                <Image src="/cloudlogo.png" alt="Logo" width={48} height={48} className="h-8 w-8 object-cover rounded-full" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                  Cloud Solutions
                </h3>
                <p className="text-gray-400 text-sm">Made Simple</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Streamline your business with our comprehensive cloud infrastructure. 
              Secure, scalable, and reliable solutions for modern enterprises.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="group w-10 h-10 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full flex items-center justify-center text-white hover:from-cyan-500 hover:to-sky-500 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle Section - Contact & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 pt-8 border-t border-gray-700">
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-gray-400 text-sm">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300">info@cloudsolutions.com</p>
                  <p className="text-gray-400 text-sm">Business Inquiries</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300">123 Cloud Street, Tech City</p>
                  <p className="text-gray-400 text-sm">TC 12345, USA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Stay Updated</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates, tips, and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all duration-300"
                  disabled={isSubmitting}
                />
                <button 
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-sky-500 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {message && (
                <div className={`text-sm px-3 py-2 rounded-lg ${
                  message.type === 'success' 
                    ? 'bg-green-900/50 text-green-300 border border-green-700' 
                    : 'bg-red-900/50 text-red-300 border border-red-700'
                }`}>
                  {message.text}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Cloud Solutions. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="#privacy" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="#terms" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="#cookies" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 w-4 h-4 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-20 right-20 w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse opacity-40"></div>
      <div className="absolute bottom-32 right-1/4 w-5 h-5 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1s' }}></div>
    </footer>
  );
}
