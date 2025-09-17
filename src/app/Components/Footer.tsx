"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  company: [
    { name: "About Us", href: "/About" },
    { name: "Our Team", href: "/About#team" },
    { name: "Contact Us", href: "/Contact" },
  ],
  services: [
    { name: "Digital Solutions", href: "/Digital" },
    { name: "It Hardware", href: "/It" },
    { name: "Security solutions", href: "/Security" },
    { name: "Software Solutions", href: "/Software" },
  ],
  products: [
    { name: "Computers & Laptops", href: "/Shop" },
    { name: "Printers", href: "/Shop" },
    { name: "Accessories", href: "/Shop" },
    { name: "Custom Builds", href: "/GamingStudio" },
  ],
  support: [
    { name: "Help Center", href: "/Contact#faq" },
    { name: "Contact Support", href: "/Contact" },
    { name: "Documentation", href: "/Services#docs" },
    { name: "Training", href: "/Training" },
  ],
};



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
    <footer className="relative bg-slate-950 text-white/90 border-t border-white/10">
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-14">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              {/* <div className="h-12 w-12 bg-gradient-to-tr from-sky-500 to-cyan-400 rounded-full flex items-center justify-center shadow-sm border border-cyan-400/40 mr-4">
                <Image src="/cloudlogo.png" alt="Cloud Solutions logo" width={48} height={48} className="h-8 w-8 object-cover rounded-full" />
              </div> */}
              <div>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                  Cloud IT Solution
                </h3>
                <p className="text-gray-400 text-sm">Made Simple</p>
              </div>
            </div>
            <p className="text-gray-300/90 mb-6 leading-relaxed">
              Streamline your business with our comprehensive cloud infrastructure. 
              Secure, scalable, and reliable solutions for modern enterprises.
            </p>

          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-sky-300 transition-colors duration-200 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-sky-300 transition-colors duration-200 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-sky-300 transition-colors duration-200 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle Section - Contact & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 pt-8 border-t border-white/10">
          {/* Contact Info */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300">+91 9944788878</p>
                  <p className="text-gray-400 text-sm">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300">contact@clouditsolution.in</p>
                  <p className="text-gray-400 text-sm">Business Inquiries</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300">Shop No: 183/1, Opp Aryabhavan Sweets, Sakthi Childrens Hospital, Hosur -635 126</p>
                  <p className="text-gray-400 text-sm"></p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Stay Updated</h4>
            <p className="text-gray-300/90 mb-4">
              Subscribe to our newsletter for the latest updates, tips, and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-colors duration-200"
                  disabled={isSubmitting}
                />
                <button 
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {message && (
                <div className={`text-sm px-3 py-2 rounded-lg ${
                  message.type === 'success' 
                    ? 'bg-green-900/40 text-green-300 border border-green-700/40' 
                    : 'bg-red-900/40 text-red-300 border border-red-700/40'
                }`}>
                  {message.text}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Cloud Solutions. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
