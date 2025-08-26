"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DARK_BLUE = "#1e3a8a"; // Dark blue color
const ORANGE = "#f97316"; // Orange color for hover effects

// Updated navLinks structure
const navLinks = [
  { name: "About", href: "About", isHome: false },
  { name: "Shop", href: "Shop", isHome: false },
  { name: "Services", href: "Services", isHome: false },
  { name: "Gaming Studio", href: "GamingStudio", isHome: false },
  { name: "Training", href: "Training", isHome: false },
  { name: "Contact", href: "Contact", isHome: false },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    
    // Add loading animation
    setIsLoaded(true);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  // Handle navigation with smooth transitions
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    name: string
  ) => {
    e.preventDefault();
    
    // Add ripple effect with orange color
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(249, 115, 22, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    if (href.startsWith("#")) {
      // Smooth scroll for section links
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        });
        setActive(name);
        setOpen(false);
      }
    } else {
      // Navigate to other pages with fade transition
      setActive(name);
      setOpen(false);
      
      // Add page transition effect
      document.body.style.opacity = '0.8';
      document.body.style.transition = 'opacity 0.2s ease-in-out';
      
      setTimeout(() => {
        router.push(href);
        document.body.style.opacity = '1';
      }, 150);
    }
  };

  // Handle logo click with enhanced animation
  const handleLogoClick = () => {
    router.push("/");
    setActive("");
    setOpen(false);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes slideInFromTop {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-slide-in {
          animation: slideInFromTop 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(249, 115, 22, 0.15);
        }
      `}</style>
      
      <header className="relative z-50 w-full flex flex-col items-center">
        {/* Floating Card Navbar */}
        <nav
          className={`fixed z-50 flex items-center overflow-visible transition-all duration-500 ease-out
            ${scrolled 
              ? "top-4 max-w-7xl mx-auto rounded-3xl border-2 shadow-2xl bg-white px-4 md:px-10 h-20" 
              : "top-0 left-0 w-full rounded-none border-0 shadow-none bg-white px-2 md:px-6 h-24"
            }
            ${isMobile ? "w-[99vw] max-w-full px-2" : ""}
            ${isLoaded ? "animate-slide-in" : ""}
          `}
          style={{
            boxShadow: scrolled 
              ? `0 20px 60px rgba(249, 115, 22, 0.15), 0 8px 25px rgba(249, 115, 22, 0.1)` 
              : "none",
            borderColor: scrolled ? ORANGE : "transparent",
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          aria-label="Main navigation"
        >
          
          {/* Enhanced Logo */}
          <div className="flex items-center flex-shrink-0 mr-4 md:mr-8 relative z-10">
            <div 
              className="transition-all duration-500 ease-out rounded-full p-1 group cursor-pointer hover-lift"
              onClick={handleLogoClick}
            >
              <div className="h-12 w-12 bg-gradient-to-tr from-blue-800 via-blue-700 to-blue-900 rounded-full flex items-center justify-center shadow-lg border-4 border-blue-600/50 animate-float group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-orange-300/50 transition-all duration-500 ease-out">
                <Image 
                  src="/cloudlogo.png" 
                  alt="Logo" 
                  width={48} 
                  height={48} 
                  className="object-cover rounded-full transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
            </div>
            <span 
              className="ml-3 font-extrabold text-xl cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105" 
              style={{color: DARK_BLUE}}
              onClick={handleLogoClick}
            >
              Cloud IT Solution
            </span>
          </div>
          
          {/* Enhanced Centered Nav Links */}
          {!isMobile && (
            <div className="flex-1 flex justify-center items-center space-x-6 md:space-x-10 relative z-10">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={
                    link.name === "Contact"
                      ? "font-semibold px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl hover:scale-105 hover-lift transition-all duration-300 ease-out relative overflow-hidden hover:from-orange-600 hover:to-orange-700"
                      : "relative font-semibold px-4 py-3 transition-all duration-300 ease-out group hover:text-orange-500 hover:scale-105 hover-lift after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-0 after:bg-gradient-to-r after:from-orange-400 after:to-orange-600 after:rounded-full after:transition-all after:duration-500 after:ease-out hover:after:w-full"
                  }
                  onClick={e => handleNavClick(e, link.href, link.name)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    color: active === link.name ? DARK_BLUE : "#222",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <span className="transition-colors duration-300 relative z-10">{link.name}</span>
                </a>
              ))}
            </div>
          )}
          
          {/* Enhanced Hamburger Menu */}
          {isMobile && (
            <button
              className="focus:outline-none ml-auto relative z-10 p-2 rounded-full hover:bg-orange-50 transition-all duration-300 ease-out"
              style={{color: DARK_BLUE}}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <svg 
                className="h-8 w-8 transition-transform duration-300 ease-out hover:text-orange-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              >
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </nav>
        
        {/* Enhanced Mobile Menu Drawer */}
        {isMobile && (
          <div 
            className={`fixed top-24 left-1/2 -translate-x-1/2 w-[98vw] max-w-full bg-white shadow-2xl border-2 z-40 flex flex-col items-center py-6 space-y-3 rounded-3xl transition-all duration-500 ease-out ${
              open 
                ? "opacity-100 scale-100 translate-y-0" 
                : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
            }`}
            style={{
              borderColor: ORANGE, 
              boxShadow: `0 20px 60px rgba(249, 115, 22, 0.15), 0 8px 25px rgba(249, 115, 22, 0.1)`
            }}
          >
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={
                  link.name === "Contact"
                    ? "block w-11/12 text-center font-semibold px-6 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl hover:scale-105 hover-lift transition-all duration-300 ease-out relative overflow-hidden hover:from-orange-600 hover:to-orange-700"
                    : "block w-11/12 text-center font-semibold px-4 py-4 rounded-xl transition-all duration-300 ease-out hover:scale-105 hover:text-orange-500 hover-lift relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-2 after:h-1 after:w-0 after:bg-gradient-to-r after:from-orange-400 after:to-orange-600 after:rounded-full after:transition-all after:duration-500 after:ease-out hover:after:w-16"
                }
                style={{
                  animationDelay: `${index * 100}ms`,
                  color: active === link.name ? DARK_BLUE : "#0553aa",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onClick={e => { 
                  handleNavClick(e, link.href, link.name); 
                  setOpen(false); 
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
        
        {/* Spacer for content below navbar */}
        <div style={{height: scrolled ? "100px" : "96px"}}></div>
      </header>
    </>
  );
}